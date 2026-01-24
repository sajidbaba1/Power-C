import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export async function GET() {
    try {
        const prisma = getPrisma();
        const notes = await prisma.loveNote.findMany({
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(notes);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { content, imageUrl, sender, x, y, rotation } = await req.json();
        const prisma = getPrisma();

        const note = await prisma.loveNote.create({
            data: {
                content,
                imageUrl,
                sender,
                x: x || 0,
                y: y || 0,
                rotation: rotation || 0
            }
        });

        const sorted = ["sajid", "nasywa"].sort();
        const chatKey = `${sorted[0]}-${sorted[1]}`;
        await pusherServer.trigger(chatKey, "new-lovenote", note);

        // Notify partner
        const partnerName = sender === "sajid" ? "Sajid" : "Nasywa";
        await pusherServer.trigger(chatKey, "partner-notification", {
            type: "lovenote",
            title: "New Love Note",
            message: `${partnerName} posted a new note on the Love Wall!`,
            sender: sender,
            createdAt: new Date().toISOString()
        });

        // Push Notification
        const targetRole = sender === "sajid" ? "nasywa" : "sajid";
        await import("@/lib/notifications").then(m =>
            m.sendPushNotification(targetRole, "New Love Note", `${partnerName} posted a note on the wall!`)
        );

        return NextResponse.json(note);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        const prisma = getPrisma();
        await prisma.loveNote.delete({ where: { id } });

        const sorted = ["sajid", "nasywa"].sort();
        const chatKey = `${sorted[0]}-${sorted[1]}`;
        await pusherServer.trigger(chatKey, "delete-lovenote", { id });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
