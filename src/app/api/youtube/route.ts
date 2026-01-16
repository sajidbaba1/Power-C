import { NextResponse } from "next/server";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const YOUTUBE_VIDEO_URL = "https://www.googleapis.com/youtube/v3/videos";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    let videoId = searchParams.get("videoId");
    if (videoId?.includes("?")) {
        videoId = videoId.split("?")[0];
    }

    if (!YOUTUBE_API_KEY) {
        // Fallback for development if no key provided: return mock data or error
        // But for "Implement GPC" we assume key will be added.
        return NextResponse.json({ error: "YOUTUBE_API_KEY is not configured in .env.local" }, { status: 500 });
    }

    try {
        if (videoId) {
            // Fetch Metadata
            const res = await fetch(`${YOUTUBE_VIDEO_URL}?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`);
            const data = await res.json();
            if (data.items && data.items.length > 0) {
                return NextResponse.json({
                    title: data.items[0].snippet.title,
                    img: data.items[0].snippet.thumbnails?.default?.url
                });
            }
            return NextResponse.json({ error: "Video not found" }, { status: 404 });
        }

        if (query) {
            // Search
            const res = await fetch(`${YOUTUBE_SEARCH_URL}?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}&maxResults=5`);
            const data = await res.json();

            if (data.error) {
                return NextResponse.json({ error: data.error.message }, { status: 400 });
            }

            const items = data.items?.map((item: any) => ({
                id: item.id.videoId,
                title: item.snippet.title,
                url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                thumbnails: item.snippet.thumbnails
            })) || [];

            return NextResponse.json({ items });
        }

        return NextResponse.json({ error: "No query provided" }, { status: 400 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
