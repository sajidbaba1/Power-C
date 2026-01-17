import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
    try {
        const { messageId, emoji, user, chatKey } = await req.json();
        const prisma = getPrisma();

        const message = await prisma.message.findUnique({
            where: { id: messageId }
        });

        if (!message) {
            return NextResponse.json({ error: "Message not found" }, { status: 404 });
        }

        let reactions = (message.reactions as any[]) || [];

        // Check if user already has this reaction
        const existingIdx = reactions.findIndex(r => r.emoji === emoji && r.user === user);

        if (existingIdx > -1) {
            // Remove reaction
            reactions.splice(existingIdx, 1);
        } else {
            // Add reaction
            reactions.push({ emoji, user });
        }

        const updatedMessage = await prisma.message.update({
            where: { id: messageId },
            data: { reactions }
        });

        await pusherServer.trigger(chatKey, "message-reaction", {
            messageId,
            reactions: updatedMessage.reactions
        });

        return NextResponse.json(updatedMessage);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
