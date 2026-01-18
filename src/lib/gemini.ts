import { GoogleGenerativeAI } from "@google/generative-ai";
import { getPrisma } from "./db";

export async function getAllGeminiKeys() {
    let allKeys: string[] = [];

    // 1. Collect from Env keys
    const envKeysRaw = process.env.GEMINI_API_KEYS || "";
    const envKeys = envKeysRaw.split(",").map(k => k.trim()).filter(Boolean);
    allKeys = [...allKeys, ...envKeys];

    // 2. Collect from DB (with fallback/timeout)
    const dbUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
    const isLocalProxy = dbUrl?.startsWith("prisma+postgres://");
    const hasDb = !!dbUrl && !isLocalProxy;

    if (hasDb) {
        try {
            const prisma = getPrisma();
            const timeout = new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error("DB Timeout")), 1500)
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

    // 3. Add Hardcoded Fallback keys to the pool
    const fallbackKeys = [
        "AIzaSyBB-6mYf0Abf3DcwgeXkTPzuyKPPpS7vIk",
        "AIzaSyAcJBvHv2lkEmjRSCby30uxMzL0BQOlzUI",
        "AIzaSyCeIjzNfwSOJ1aqtIjd8s7zvrCEpA67Ha8"
    ];
    allKeys = [...allKeys, ...fallbackKeys];

    // Remove duplicates and Shuffle
    const uniqueKeys = Array.from(new Set(allKeys.filter(Boolean)));
    return uniqueKeys.sort(() => Math.random() - 0.5);
}

export async function translateAndAnalyze(text: string, sourceLang: string, targetLang: string) {
    const keys = await getAllGeminiKeys();
    let lastError: any = null;

    console.log(`Starting translation attempt with pool of ${keys.length} keys`);

    for (let i = 0; i < keys.length; i++) {
        const apiKey = keys[i];
        try {
            console.log(`Attempt ${i + 1}/${keys.length} using key: ${apiKey.substring(0, 8)}...`);
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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

            const result = await model.generateContent(prompt);
            const response = await result.response;

            let jsonText = "";
            try {
                jsonText = response.text().trim();
            } catch (e) {
                console.error(`Key ${i} failed. Error: response.text() failed (may be safety blocked):`, e);
                throw e;
            }

            // Robust JSON extraction
            const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
            if (jsonMatch) jsonText = jsonMatch[0];

            const parsed = JSON.parse(jsonText);
            const langKey = targetLang.toLowerCase();

            // Normalize the breakdown keys
            if (parsed.wordBreakdown && Array.isArray(parsed.wordBreakdown)) {
                parsed.wordBreakdown = parsed.wordBreakdown.map((item: any) => ({
                    ...item,
                    [langKey]: item[langKey] || item.translation || item[targetLang] || "N/A"
                }));
            }

            console.log(`✅ Success with key ${i + 1}`);
            return parsed;

        } catch (error: any) {
            lastError = error;
            console.error(`❌ Key ${i + 1} failed:`, error.message?.substring(0, 100));
            // Continue to next key if it's a quota or temporary error
            if (i < keys.length - 1) {
                console.log("Retrying with next key...");
                continue;
            }
        }
    }

    // If we reach here, all keys failed
    return {
        translation: text,
        hindiTranslation: "Gemini Error",
        wordBreakdown: [
            { word: "Error", [targetLang.toLowerCase()]: "Error", meaning: (lastError?.message || "All keys exhausted").substring(0, 50) }
        ]
    };
}
