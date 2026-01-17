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

    // 3. Select a key (Rotation)
    let apiKey = "";
    if (allKeys.length > 0) {
        const index = Math.floor(Date.now() / 1000) % allKeys.length;
        apiKey = allKeys[index];
        console.log(`Using Gemini API Key index ${index} from total pool of ${allKeys.length} keys`);
    } else {
        // Final fallback
        apiKey = "AIzaSyCAwtSTvj1qYINRZZ6IGcykMUVGLD7Gn6Y";
        console.log("Using hardcoded Gemini API Key fallback");
    }

    if (!apiKey) throw new Error("No Gemini API keys found");

    const genAI = new GoogleGenerativeAI(apiKey);
    // Try gemini-2.0-flash first (latest stable)
    return genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
}

export async function translateAndAnalyze(text: string, sourceLang: string, targetLang: string) {
    // Expanded fallback translations for common phrases when API fails
    const commonPhrases: Record<string, { id: string, hi: string }> = {
        // Greetings
        "hi": { id: "Hai", hi: "Namaste" },
        "hello": { id: "Halo", hi: "Namaste" },
        "hey": { id: "Hei", hi: "Hey" },
        "good morning": { id: "Selamat pagi", hi: "Suprabhat" },
        "good afternoon": { id: "Selamat siang", hi: "Namaskar" },
        "good evening": { id: "Selamat sore", hi: "Shubh sandhya" },
        "good night": { id: "Selamat malam", hi: "Shubh ratri" },

        // Love expressions
        "i love you": { id: "Aku cinta kamu", hi: "Main tumse pyar karta hoon" },
        "i miss you": { id: "Aku merindukanmu", hi: "Mujhe tumhari yaad aa rahi hai" },
        "i love you so much": { id: "Aku sangat mencintaimu", hi: "Main tumse bahut pyar karta hoon" },
        "you are beautiful": { id: "Kamu cantik", hi: "Tum bahut sundar ho" },
        "you are handsome": { id: "Kamu tampan", hi: "Tum bahut handsome ho" },
        "my love": { id: "Cintaku", hi: "Meri jaan" },
        "my heart": { id: "Hatiku", hi: "Mera dil" },
        "forever": { id: "Selamanya", hi: "Hamesha" },
        "always": { id: "Selalu", hi: "Hamesha" },

        // Pet names
        "baby": { id: "Sayang", hi: "Jaanu" },
        "babe": { id: "Sayang", hi: "Jaanu" },
        "darling": { id: "Sayang", hi: "Jaanu" },
        "honey": { id: "Sayang", hi: "Jaanu" },
        "sweetheart": { id: "Sayangku", hi: "Meri jaan" },

        // Common responses
        "yes": { id: "Ya", hi: "Haan" },
        "no": { id: "Tidak", hi: "Nahi" },
        "okay": { id: "Oke", hi: "Theek hai" },
        "ok": { id: "Oke", hi: "Theek hai" },
        "thank you": { id: "Terima kasih", hi: "Dhanyavaad" },
        "thanks": { id: "Terima kasih", hi: "Dhanyavaad" },
        "please": { id: "Tolong", hi: "Please" },
        "sorry": { id: "Maaf", hi: "Maaf karo" },
        "welcome": { id: "Selamat datang", hi: "Swagat hai" },

        // Questions
        "how are you": { id: "Apa kabar?", hi: "Aap kaise hain?" },
        "what are you doing": { id: "Apa yang kamu lakukan?", hi: "Tum kya kar rahe ho?" },
        "where are you": { id: "Kamu di mana?", hi: "Tum kahan ho?" },
        "when": { id: "Kapan?", hi: "Kab?" },
        "why": { id: "Mengapa?", hi: "Kyun?" },
        "how": { id: "Bagaimana?", hi: "Kaise?" },
        "what": { id: "Apa?", hi: "Kya?" },

        // Feelings
        "i am happy": { id: "Aku bahagia", hi: "Main khush hoon" },
        "i am sad": { id: "Aku sedih", hi: "Main dukhi hoon" },
        "i am tired": { id: "Aku lelah", hi: "Main thak gaya hoon" },
        "i am hungry": { id: "Aku lapar", hi: "Mujhe bhook lagi hai" },
        "i am sleepy": { id: "Aku mengantuk", hi: "Mujhe neend aa rahi hai" },

        // Daily
        "eat": { id: "Makan", hi: "Khana khao" },
        "sleep": { id: "Tidur", hi: "So jao" },
        "come": { id: "Datang", hi: "Aao" },
        "go": { id: "Pergi", hi: "Jao" },
        "wait": { id: "Tunggu", hi: "Ruko" },
        "take care": { id: "Jaga diri", hi: "Apna khayal rakhna" },
        "see you": { id: "Sampai jumpa", hi: "Phir milenge" },
        "bye": { id: "Dah", hi: "Bye" },
        "goodbye": { id: "Selamat tinggal", hi: "Alvida" }
    };

    // Check for common phrase match
    const lowerText = text.toLowerCase().trim();
    const commonMatch = commonPhrases[lowerText];
    if (commonMatch) {
        const translation = targetLang.toLowerCase() === "indonesian" ? commonMatch.id : commonMatch.hi;
        return {
            translation,
            hindiTranslation: commonMatch.hi,
            wordBreakdown: [{ word: text, [targetLang.toLowerCase()]: translation, meaning: "Common phrase" }]
        };
    }

    // Try API with retry
    for (let attempt = 0; attempt < 2; attempt++) {
        try {
            console.log(`🔄 Translation attempt ${attempt + 1}: "${text}" -> ${targetLang}`);
            const model = await getGeminiModel();
            console.log("✅ Got Gemini model, sending request...");

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

            console.log("Raw Gemini Response received");

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
                console.log("✅ Translation successful:", parsed.translation);
                return parsed;
            } catch (e) {
                console.error("Failed to parse Gemini response as JSON:", jsonText);
                // Continue to next attempt
            }
        } catch (error: any) {
            const rawError = error.message || 'Unknown Error';
            console.error(`❌ Attempt ${attempt + 1} failed:`, rawError);
            // Continue to next attempt or fallback
        }
    }

    // If all attempts fail, return a helpful message
    return {
        translation: `🌐 ${text}`,
        hindiTranslation: "अनुवाद उपलब्ध नहीं",
        wordBreakdown: []
    };
}
