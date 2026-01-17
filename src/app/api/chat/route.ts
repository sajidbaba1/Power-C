import { NextResponse } from "next/server";
// Import with a try-catch block for the module itself? No, we can't.
// But we can check if the function exists.
import { translateAndAnalyze } from "@/lib/gemini";

export async function POST(req: Request) {
    console.log("API: /api/chat called");

    // Debug env vars
    console.log("ENV Check:", {
        hasGeminiKeys: !!process.env.GEMINI_API_KEYS,
        hasDbUrl: !!process.env.DATABASE_URL
    });

    try {
        const body = await req.json().catch(e => {
            console.error("Failed to parse request JSON", e);
            return null;
        });

        if (!body) {
            return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const { text, sourceLang, targetLang } = body;
        console.log(`Processing: "${text}" (${sourceLang} -> ${targetLang})`);

        // Safety check BEFORE calling complex logic
        if (!process.env.GEMINI_API_KEYS) {
            console.warn("No Gemini API Key found in env");
            // We could return a mock response here for testing
        }

        const result = await translateAndAnalyze(text, sourceLang, targetLang)
            .catch(err => {
                console.error("translateAndAnalyze threw:", err);
                throw err;
            });

        console.log("🎯 Translation result:", {
            translation: result.translation?.substring(0, 50),
            hasWordBreakdown: (result.wordBreakdown || []).length > 0,
            originalText: text
        });
        return NextResponse.json(result);

    } catch (error: any) {
        const rawError = error.message || "Unknown server error";
        const sanitizedError = rawError.replace('[GoogleGenerativeAI Error]', 'AI Error');
        console.error("CRITICAL API ERROR:", rawError);

        // Ensure we return JSON, not HTML
        return NextResponse.json({
            translation: "System Error",
            hindiTranslation: "सिस्टम त्रुटि",
            wordBreakdown: [],
            error: sanitizedError,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined
        }, { status: 500 });
    }
}
