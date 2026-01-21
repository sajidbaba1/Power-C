import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getPrisma } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { url, title, effect } = await req.json();

        if (!url || !title) {
            return NextResponse.json({ error: "Missing url or title" }, { status: 400 });
        }

        // Save to database
        const prisma = getPrisma();
        const song = await prisma.playlistSong.create({
            data: {
                url,
                title,
                effect: effect || "none",
                chatKey: "sajid-nasywa", // Default chat key
                order: 0,
            },
        });

        return NextResponse.json({
            success: true,
            song
        });
    } catch (error: any) {
        console.error("Audio upload error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const prisma = getPrisma();
        const songs = await prisma.playlistSong.findMany({
            orderBy: {
                createdAt: "asc",
            },
        });
        return NextResponse.json(songs);
    } catch (error: any) {
        console.error("Fetch songs error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        const prisma = getPrisma();
        await prisma.playlistSong.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
