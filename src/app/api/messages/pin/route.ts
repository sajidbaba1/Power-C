import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
    try {
        const { messageId, isPinned, chatKey } = await req.json();
        const prisma = getPrisma();

        const updatedMessage = await prisma.message.update({
            where: { id: messageId },
            data: { isPinned }
        });

        await pusherServer.trigger(chatKey, "message-pin", {
            messageId,
            isPinned: updatedMessage.isPinned
        });

        return NextResponse.json(updatedMessage);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
