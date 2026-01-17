import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

function getChatKey(user1: string, user2: string) {
    const sorted = [user1, user2].sort();
    return `${sorted[0]}-${sorted[1]}`;
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const user1 = searchParams.get("user1");
        const user2 = searchParams.get("user2");

        if (!user1 || !user2) {
            return NextResponse.json({ error: "Both users required" }, { status: 400 });
        }

        const chatKey = getChatKey(user1, user2);
        const prisma = getPrisma();

        const messages = await prisma.message.findMany({
            where: { chatKey },
            orderBy: { createdAt: "asc" }
        });

        return NextResponse.json(messages);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { user1, user2, message } = await req.json();
        console.log(`API POST: Attempting to save message from ${message.sender} to ${user2 === message.sender ? user1 : user2}`);

        if (!user1 || !user2 || !message || !message.id) {
            console.error("API POST: Missing critical fields", { user1, user2, messageId: message?.id });
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const chatKey = getChatKey(user1, user2);
        const prisma = getPrisma();

        // Check if message already exists by id
        console.log(`API POST: Checking existence for ID ${message.id}`);
        const existingMessage = await prisma.message.findUnique({
            where: { id: message.id }
        });

        let savedMessage;
        if (existingMessage) {
            console.log(`API POST: Updating existing message ${message.id}`);
            savedMessage = await prisma.message.update({
                where: { id: message.id },
                data: {
                    translation: message.translation,
                    hindiTranslation: message.hindiTranslation,
                    wordBreakdown: message.wordBreakdown,
                    status: message.status || "sent",
                    imageUrl: message.imageUrl,
                    audioUrl: message.audioUrl,
                    unlockAt: message.unlockAt ? new Date(message.unlockAt) : undefined,
                    type: message.type || "text",
                    parentId: message.parentId,
                    isPinned: message.isPinned,
                    reactions: message.reactions
                }
            });
        } else {
            console.log(`API POST: Creating new message ${message.id} with text: ${message.text?.substring(0, 20)}...`);
            savedMessage = await prisma.message.create({
                data: {
                    id: message.id,
                    text: message.text,
                    translation: message.translation,
                    hindiTranslation: message.hindiTranslation,
                    sender: message.sender,
                    receiver: user2 === message.sender ? user1 : user2,
                    chatKey: chatKey,
                    wordBreakdown: message.wordBreakdown,
                    status: message.status || "sent",
                    imageUrl: message.imageUrl,
                    audioUrl: message.audioUrl,
                    unlockAt: message.unlockAt ? new Date(message.unlockAt) : undefined,
                    type: message.type || "text",
                    parentId: message.parentId,
                    isPinned: message.isPinned || false,
                    reactions: message.reactions || []
                }
            });
        }

        // Trigger Pusher event
        try {
            await pusherServer.trigger(chatKey, "new-message", savedMessage);
        } catch (pushErr) {
            console.error("Pusher trigger failed:", pushErr);
        }

        console.log(`API POST: Success for ${message.id}`);
        return NextResponse.json({ success: true, message: savedMessage });
    } catch (error: any) {
        console.error("API POST FAILURE:", error);
        return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const user1 = searchParams.get("user1");
        const user2 = searchParams.get("user2");

        if (!user1 || !user2) {
            return NextResponse.json({ error: "Both users required" }, { status: 400 });
        }

        const chatKey = getChatKey(user1, user2);
        const prisma = getPrisma();

        await prisma.message.deleteMany({
            where: { chatKey }
        });

        // Trigger Pusher event
        try {
            await pusherServer.trigger(chatKey, "clear-chat", { success: true });
        } catch (pushErr) {
            console.error("Pusher trigger failed:", pushErr);
        }

        return NextResponse.json({ success: true, message: "Chat cleared" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
