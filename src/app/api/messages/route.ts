import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { sendPushNotification } from "@/lib/notifications";
import { kafka, KAFKA_TOPICS } from "@/lib/kafka";

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
        const chatKey = getChatKey(user1, user2);
        const prisma = getPrisma();

        if (!user1 || !user2 || !message || !message.id) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // --- FAST PATH: Real-time and Kafka Logging ---
        // We trigger Pusher and Kafka first so the partner sees it INSTANTLY
        const fastPayload = {
            ...message,
            chatKey,
            receiver: user2 === message.sender ? user1 : user2,
            createdAt: new Date().toISOString(),
        };

        // 1. Trigger Pusher for immediate UI update
        const pusherPromise = pusherServer.trigger(chatKey, "new-message", fastPayload)
            .catch(err => console.error("Pusher Error:", err));

        // 2. Publish to Kafka for high-throughput processing/logging
        kafka.publish(KAFKA_TOPICS.MESSAGES, {
            ...fastPayload,
            operation: "message_sent"
        });

        // --- BACKGROUND PATH: Persistence and Notifications ---
        // These can happen while we prepare the response
        const persistencePromise = (async () => {
            try {
                const existing = await prisma.message.findUnique({ where: { id: message.id } });
                if (existing) {
                    return await prisma.message.update({
                        where: { id: message.id },
                        data: {
                            translation: message.translation,
                            status: message.status || "sent",
                            reactions: message.reactions,
                            isPinned: message.isPinned
                        }
                    });
                } else {
                    return await prisma.message.create({
                        data: {
                            id: message.id,
                            text: message.text,
                            translation: message.translation,
                            sender: message.sender,
                            receiver: fastPayload.receiver,
                            chatKey: chatKey,
                            status: message.status || "sent",
                            type: message.type || "normal",
                            parentId: message.parentId,
                            imageUrl: message.imageUrl,
                            audioUrl: message.audioUrl,
                            unlockAt: message.unlockAt ? new Date(message.unlockAt) : undefined,
                        }
                    });
                }
            } catch (dbErr) {
                console.error("DB Persistence Error:", dbErr);
            }
        })();

        // 3. Send Push Notification (Non-blocking)
        const notificationPromise = (async () => {
            if (message.sender && fastPayload.receiver) {
                const notificationText = message.type === 'sticker' ? 'Sent a sticker' : (message.text || 'Sent an image');
                await sendPushNotification(
                    fastPayload.receiver,
                    `Message from ${message.sender}`,
                    notificationText.substring(0, 50),
                    '/'
                ).catch(err => console.error("Notification Error:", err));
            }
        })();

        // We don't await persistencePromise or notificationPromise if we want MAXIMUM speed,
        // but in Next.js on Vercel, we should await them OR use waitUntil to ensure they finish.
        // For now, we await them to ensure data integrity, but the code is optimized.
        // If 'high throughput' is the goal, we would move DB writes to a Kafka consumer.
        await Promise.all([pusherPromise, persistencePromise, notificationPromise]);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("API POST FAILURE:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
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
