import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
    try {
        const { role, trackName, trackArtist, trackImage, isPlaying } = await req.json();
        const prisma = getPrisma();

        const profile = await prisma.profile.update({
            where: { role },
            data: { trackName, trackArtist, trackImage, isPlaying }
        });

        const sorted = ["sajid", "nasywa"].sort();
        const chatKey = `${sorted[0]}-${sorted[1]}`;
        await pusherServer.trigger(chatKey, "music-update", { role, trackName, trackArtist, trackImage, isPlaying });

        return NextResponse.json(profile);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
