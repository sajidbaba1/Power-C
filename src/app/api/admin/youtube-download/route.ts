import { NextResponse } from "next/server";
import ytdl from "ytdl-core";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
    try {
        const { youtubeUrl } = await req.json();

        if (!youtubeUrl || !youtubeUrl.trim()) {
            return NextResponse.json({ error: "YouTube URL is required" }, { status: 400 });
        }

        // Validate YouTube URL
        if (!ytdl.validateURL(youtubeUrl)) {
            return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
        }

        // Get video info
        const info = await ytdl.getInfo(youtubeUrl);
        const title = info.videoDetails.title.replace(/[^a-zA-Z0-9 ]/g, '').substring(0, 50);

        // Download audio
        const audioStream = ytdl(youtubeUrl, {
            quality: 'highestaudio',
            filter: 'audioonly',
        });

        // Upload to Cloudinary
        const uploadPromise = new Promise((resolve, reject) => {
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

            audioStream.pipe(uploadStream);
        });

        const uploadResult: any = await uploadPromise;

        return NextResponse.json({
            success: true,
            url: uploadResult.secure_url,
            title: title,
            duration: info.videoDetails.lengthSeconds,
        });
    } catch (error: any) {
        console.error("YouTube download error:", error);
        return NextResponse.json({
            error: error.message || "Failed to download YouTube audio"
        }, { status: 500 });
    }
}
