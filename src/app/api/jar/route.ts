import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export async function GET() {
    try {
        const prisma = getPrisma();
        const notes = await prisma.jarNote.findMany({
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(notes);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { content, author } = await req.json();
        const prisma = getPrisma();

        const note = await prisma.jarNote.create({
            data: { content, author }
        });

        const sorted = ["sajid", "nasywa"].sort();
        const chatKey = `${sorted[0]}-${sorted[1]}`;
        await pusherServer.trigger(chatKey, "new-jar-note", note);

        // Notify partner
        const partnerName = author === "sajid" ? "Sajid" : "Nasywa";
        await pusherServer.trigger(chatKey, "partner-notification", {
            type: "jar",
            title: "New Jar Note",
            message: `${partnerName} added a happy memory to the Love Jar!`,
            sender: author,
            createdAt: new Date().toISOString()
        });

        // Push Notification
        const targetRole = author === "sajid" ? "nasywa" : "sajid";
        await import("@/lib/notifications").then(m =>
            m.sendPushNotification(targetRole, "New Jar Memory", `${partnerName} added a memory to the jar!`)
        );

        return NextResponse.json(note);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
