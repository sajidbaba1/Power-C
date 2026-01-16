import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
    try {
        const { chatKey, playlist, index, isPlaying } = await req.json();

        if (!chatKey) {
            return NextResponse.json({ error: "Missing chatKey" }, { status: 400 });
        }

        await pusherServer.trigger(chatKey, "music-update", {
            playlist,
            index,
            isPlaying
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
