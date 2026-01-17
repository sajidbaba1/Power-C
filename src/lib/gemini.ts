import { GoogleGenerativeAI } from "@google/generative-ai";
import { getPrisma } from "./db";

export async function getGeminiModel() {
    let allKeys: string[] = [];

    // 1. Collect from Env keys
    const envKeys = process.env.GEMINI_API_KEYS?.split(",") || [];
    allKeys = [...allKeys, ...envKeys.map(k => k.trim()).filter(Boolean)];

    // 2. Collect from DB (with fallback/timeout)
    const dbUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
    const isLocalProxy = dbUrl?.startsWith("prisma+postgres://");
    const hasDb = !!dbUrl && !isLocalProxy;

    if (hasDb) {
        try {
            console.log("Fetching additional keys from DB...");
            const prisma = getPrisma();
            const timeout = new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error("DB Timeout")), 3000)
            );

            const dbKeys = await Promise.race([
                prisma.apiKey.findMany({
                    where: { status: "active" },
                }),
                timeout
            ]) as any[];

            if (dbKeys && Array.isArray(dbKeys)) {
                allKeys = [...allKeys, ...dbKeys.map(k => k.key)];
            }
        } catch (e: any) {
            console.warn(`DB Keys fetch failed: ${e.message}`);
        }
    }

    // 3. Selection Logic
    // REMOVED HARDCODED KEY (it was flagged as leaked). Use Vercel ENV instead.

    let apiKey = "";
    if (allKeys.length > 0) {
        // Simple rotation based on time
        const index = Math.floor(Date.now() / 1000) % allKeys.length;
        apiKey = allKeys[index];
    }

    if (!apiKey) {
        console.error("CRITICAL: No Gemini API keys found in ENV or DB.");
        throw new Error("No API keys configured");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Standard stable model
    return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

export async function translateAndAnalyze(text: string, sourceLang: string, targetLang: string) {
    try {
        console.log(`Starting translation: "${text}" from ${sourceLang} to ${targetLang}`);
        const model = await getGeminiModel();

        const isHindiTarget = targetLang.toLowerCase() === "hindi";
        const prompt = `
      You are a language learning assistant for the "Power Couple" app, a bridge between an Indian and an Indonesian user.
      
      Original Text: "${text}"
      Source Language: ${sourceLang}
      Target Language: ${targetLang}
      
      Task:
      1. Translate the text to ${targetLang}.
      ${isHindiTarget ? 'IMPORTANT: For Hindi, use Romanized Hindi (English Script). Example: "Aap kaise hain?" instead of "आप कैसे हैं?".' : ''}
      ${isHindiTarget ? '' : '2. Provide a Hindi translation as well (as a bridge language).'}
      3. Provide a detailed word-by-word breakdown. For each word in the original text, provide:
         - "word": the original word
         - "${targetLang.toLowerCase()}": its translation in ${targetLang} (Use Romanized script for Hindi)
         - "meaning": a concise English explanation
      
      Return ONLY a strict JSON object:
      {
        "translation": "The ${targetLang} translation",
        ${isHindiTarget ? '' : '"hindiTranslation": "The Hindi translation",'}
        "wordBreakdown": [
          { "word": "...", "${targetLang.toLowerCase()}": "...", "meaning": "..." }
        ]
      }
    `;

        console.log("Sending prompt to Gemini...");
        const result = await model.generateContent(prompt);
        const response = await result.response;

        let jsonText = "";
        try {
            jsonText = response.text().trim();
        } catch (e) {
            console.error("Gemini response.text() failed (may be safety blocked):", e);
            throw new Error("AI Safety filters blocked the response. Try again with different wording.");
        }

        // Robust JSON extraction
        const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            jsonText = jsonMatch[0];
        }

        try {
            const parsed = JSON.parse(jsonText);
            const langKey = targetLang.toLowerCase();

            // Normalize the breakdown keys
            if (parsed.wordBreakdown && Array.isArray(parsed.wordBreakdown)) {
                parsed.wordBreakdown = parsed.wordBreakdown.map((item: any) => ({
                    ...item,
                    [langKey]: item[langKey] || item.translation || item[targetLang] || "N/A"
                }));
            }
            return parsed;
        } catch (e) {
            console.error("Failed to parse Gemini response as JSON:", jsonText);
            return {
                translation: text,
                hindiTranslation: "Translation Error",
                wordBreakdown: []
            };
        }
    } catch (error: any) {
        let errorMsg = error.message || 'Unknown AI Error';
        console.error("Gemini API error detailed:", errorMsg);

        // EXTRA CLEANING: Extract only the human-readable part of the error
        if (errorMsg.includes("429")) errorMsg = "Daily limit reached (Quota Exceeded)";
        else if (errorMsg.includes("403")) errorMsg = "API Key restricted or leaked";
        else if (errorMsg.includes("401")) errorMsg = "Invalid API Key";
        else if (errorMsg.includes("Safety")) errorMsg = "Blocked by Safety Filters";
        else if (errorMsg.includes("fetch")) errorMsg = "Network connection failed";

        // Final fallback if the message is too long
        if (errorMsg.length > 50) errorMsg = errorMsg.substring(0, 50) + "...";

        return {
            translation: text,
            hindiTranslation: `AI Logic Offline: ${errorMsg}`,
            wordBreakdown: []
        };
    }
}
