import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Robust list of public Cobalt instances
// Mixed v10 and v7 support handling in logic
const COBALT_INSTANCES = [
    "https://cobalt.api.red",  // Often reliable
    "https://api.cobalt.best", // Often reliable
    "https://api.wuk.sh",      // Popular
    "https://cobalt.100ms.video"
];

async function getCobaltDownloadUrl(youtubeUrl: string) {
    let lastError;

    for (const instance of COBALT_INSTANCES) {
        try {
            console.log(`Trying Cobalt instance: ${instance}`);

            // Try v10 API (Standard for new instances) -> POST /
            // Payload: { url, downloadMode: "audio", audioFormat: "mp3" }
            const res = await fetch(`${instance}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    url: youtubeUrl,
                    downloadMode: "audio",
                    audioFormat: "mp3"
                })
            });

            // If 404, might be v7 instance at /api/json
            if (res.status === 404) {
                console.log(`${instance} returned 404 on root, trying /api/json (v7)`);
                const res7 = await fetch(`${instance}/api/json`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        url: youtubeUrl,
                        isAudioOnly: true,
                        aFormat: "mp3"
                    })
                });

                if (res7.ok) {
                    const data7 = await res7.json();
                    if (data7.url) return data7.url;
                    if (data7.picker && data7.picker.length > 0) return data7.picker[0].url;
                }
            } else if (res.ok) {
                const data = await res.json();
                // v10 response structure: { status: "stream"|"redirect", url: "..." }
                if (data.url) return data.url;
                // Sometimes it returns a 'tunnel' or 'picker'
                if (data.picker && data.picker.length > 0) return data.picker[0].url;
                // If status is error
                if (data.status === 'error') {
                    console.error(`Cobalt Check Error on ${instance}:`, data);
                }
            }

        } catch (e: any) {
            console.log(`Failed to fetch from ${instance}:`, e.message);
            lastError = e;
        }
    }

    throw new Error(lastError?.message || "All Cobalt instances failed to return a download URL");
}

export async function POST(req: Request) {
    try {
        const { youtubeUrl } = await req.json();

        if (!youtubeUrl || !youtubeUrl.trim()) {
            return NextResponse.json({ error: "YouTube URL is required" }, { status: 400 });
        }

        // Validate YouTube URL
        if (!youtubeUrl.includes("youtube.com") && !youtubeUrl.includes("youtu.be")) {
            return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
        }

        // Get download URL from Cobalt (with fallback)
        const downloadUrl = await getCobaltDownloadUrl(youtubeUrl);

        console.log("Downloading audio from:", downloadUrl);

        // Fetch the audio stream
        const audioResponse = await fetch(downloadUrl);
        if (!audioResponse.ok) throw new Error("Failed to fetch audio stream from Cobalt URL");

        // Use a default title if not available (Cobalt might not return metadata easily in this endpoint)
        const oembedUrl = `https://www.youtube.com/oembed?url=${youtubeUrl}&format=json`;
        let title = `Song ${Date.now()}`;
        try {
            const oembedRes = await fetch(oembedUrl);
            if (oembedRes.ok) {
                const oembedData = await oembedRes.json();
                title = oembedData.title.replace(/[^a-zA-Z0-9 ]/g, '').substring(0, 50);
            }
        } catch (e) {
            console.log("Failed to fetch oEmbed title", e);
        }

        // Convert Web Stream to Buffer for Cloudinary upload
        const arrayBuffer = await audioResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult: any = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'video',
                    folder: 'power-couple-songs',
                    public_id: `song_${Date.now()}`,
                    format: 'mp3',
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(buffer);
        });

        return NextResponse.json({
            success: true,
            url: uploadResult.secure_url,
            title: title,
            duration: uploadResult.duration,
        });
    } catch (error: any) {
        console.error("YouTube download error:", error);
        return NextResponse.json({
            error: error.message || "Failed to download YouTube audio"
        }, { status: 500 });
    }
}
