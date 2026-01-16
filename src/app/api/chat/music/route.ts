import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import { getPrisma } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const chatKey = searchParams.get("chatKey");
        const prisma = getPrisma();

        if (!chatKey) return NextResponse.json({ error: "Missing chatKey" }, { status: 400 });

        const songs = await prisma.playlistSong.findMany({
            where: { chatKey },
            orderBy: { order: 'asc' }
        });

        const playlist = songs.map(s => ({
            id: s.id,
            url: s.url,
            title: s.title,
            effect: s.effect
        }));

        return NextResponse.json({ playlist });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { chatKey, playlist, index, isPlaying } = body;
        const prisma = getPrisma();

        if (!chatKey) {
            return NextResponse.json({ error: "Missing chatKey" }, { status: 400 });
        }

        // Persistence: If playlist sent, sync to DB
        if (playlist) {
            await prisma.$transaction([
                prisma.playlistSong.deleteMany({ where: { chatKey } }),
                prisma.playlistSong.createMany({
                    data: playlist.map((s: any, i: number) => ({
                        id: s.id,
                        url: s.url,
                        title: s.title,
                        effect: s.effect,
                        chatKey: chatKey,
                        order: i
                    }))
                })
            ]);
        }

        await pusherServer.trigger(chatKey, "music-update", {
            playlist,
            index,
            isPlaying
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Music API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
