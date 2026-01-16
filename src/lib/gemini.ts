import { GoogleGenerativeAI } from "@google/generative-ai";
import { getPrisma } from "./db";

export async function getGeminiModel() {
    let apiKey = "";

    // Try to get from Env keys first
    const envKeys = process.env.GEMINI_API_KEYS?.split(",") || [];
    if (envKeys.length > 0) {
        apiKey = envKeys[0];
        console.log("Using Gemini API Key from environment variable");
    }

    // If no env key, try DB (only if configured and NOT the local proxy protocol which hangs)
    const dbUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
    const isLocalProxy = dbUrl?.startsWith("prisma+postgres://");
    const hasDb = !!dbUrl && !isLocalProxy;

    if (!apiKey && hasDb) {
        try {
            console.log("Attempting to fetch API keys from DB (with timeout)...");
            const prisma = getPrisma();

            // Create a timeout promise
            const timeout = new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error("DB Timeout")), 3000)
            );

            // Race the DB query against the timeout
            const dbKeys = await Promise.race([
                prisma.apiKey.findMany({
                    where: { status: "active" },
                    orderBy: { updatedAt: "asc" }
                }),
                timeout
            ]) as any[];

            if (dbKeys.length > 0) {
                const selected = dbKeys[0];
                apiKey = selected.key;
                console.log("Using Gemini API Key from Database");

                // Update usage and timestamp back in DB (async, no await)
                const prisma = getPrisma();
                prisma.apiKey.update({
                    where: { id: selected.id },
                    data: {
                        usage: { increment: 1 },
                        updatedAt: new Date()
                    }
                }).catch((err: any) => console.error("Prisma update error:", err));
            }
        } catch (e: any) {
            console.warn(`DB not accessible for API keys (${e.message}), skipping.`);
        }
    }

    // Final fallback to hardcoded (be careful with this in production!)
    if (!apiKey) {
        apiKey = "AIzaSyBWKccHpqzoNqaUsyBvv6DuECplbkho_2s";
        console.log("Using hardcoded Gemini API Key fallback");
    }

    if (!apiKey) throw new Error("No Gemini API keys found in any source");

    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
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

        console.log("Raw Gemini Response:", jsonText);

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
                hindiTranslation: "अनुवाद त्रुटि",
                wordBreakdown: []
            };
        }
    } catch (error: any) {
        console.error("Gemini API error detailed:", error);
        // Return a graceful failure object that matches the expected structure
        return {
            translation: text,
            hindiTranslation: "Gemini Error",
            wordBreakdown: [
                { word: "Error", [targetLang.toLowerCase()]: "Error", meaning: (error.message || "Unknown API error").substring(0, 50) }
            ]
        };
    }
}
