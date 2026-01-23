import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { sendPushNotification } from "@/lib/notifications";
import { kafka, KAFKA_TOPICS } from "@/lib/kafka";
import { cacheGet, cacheSet, redis } from "@/lib/redis"; // Mock redis if needed

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

        // Redis Cache Check
        const cached = await cacheGet(`chat:${chatKey}`);
        if (cached) {
            return NextResponse.json(JSON.parse(cached));
        }

        const prisma = getPrisma();

        const messages = await prisma.message.findMany({
            where: { chatKey },
            orderBy: { createdAt: "asc" }
        });

        // Cache the result (expire in 60s to be safe, or longer if we consistently invalidate)
        await cacheSet(`chat:${chatKey}`, JSON.stringify(messages), 300);

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

        let finalMessage = { ...message };

        // Handle Image Upload if present
        if (finalMessage.imageUrl && finalMessage.imageUrl.startsWith("data:image")) {
            // Dynamic import for Cloudinary to keep startup fast
            const { v2: cloudinary } = await import("cloudinary");
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });

            try {
                const uploadRes = await cloudinary.uploader.upload(finalMessage.imageUrl, {
                    folder: "power-couple-messages",
                    resource_type: "auto",
                });
                finalMessage.imageUrl = uploadRes.secure_url;
            } catch (err) {
                console.error("Image upload failed:", err);
            }
        }

        // --- FAST PATH: Real-time and Kafka Logging ---
        const fastPayload = {
            ...finalMessage,
            chatKey,
            receiver: user2 === finalMessage.sender ? user1 : user2,
            createdAt: finalMessage.createdAt || new Date().toISOString(),
        };

        // 1. Trigger Pusher for immediate UI update
        const pusherPromise = pusherServer.trigger(chatKey, "new-message", fastPayload)
            .catch(err => console.error("Pusher Error:", err));

        // 2. Publish to Kafka for high-throughput processing/logging (No await)
        kafka.publish(KAFKA_TOPICS.MESSAGES, {
            ...fastPayload,
            operation: "message_sent"
        }).catch(err => console.error("Kafka Error:", err));

        // --- BACKGROUND PATH: Persistence and Notifications ---
        const persistencePromise = (async () => {
            try {
                // Handle unlockAt conversion for DB (DB expects DateTime, UI sends "HH:mm" string)
                let dbUnlockAt = undefined;
                if (finalMessage.unlockAt) {
                    if (typeof finalMessage.unlockAt === 'string' && finalMessage.unlockAt.includes(':')) {
                        const [hours, minutes] = finalMessage.unlockAt.split(':').map(Number);
                        const d = new Date();
                        d.setHours(hours, minutes, 0, 0);
                        dbUnlockAt = d;
                    } else {
                        dbUnlockAt = new Date(finalMessage.unlockAt);
                    }
                }

                const existing = await prisma.message.findUnique({ where: { id: finalMessage.id } });
                if (existing) {
                    await prisma.message.update({
                        where: { id: finalMessage.id },
                        data: {
                            translation: finalMessage.translation,
                            status: finalMessage.status || "sent",
                            reactions: finalMessage.reactions,
                            isPinned: finalMessage.isPinned
                        }
                    });
                } else {
                    await prisma.message.create({
                        data: {
                            id: finalMessage.id,
                            text: finalMessage.text || "",
                            translation: finalMessage.translation,
                            sender: finalMessage.sender,
                            receiver: fastPayload.receiver,
                            chatKey: chatKey,
                            status: finalMessage.status || "sent",
                            type: finalMessage.type || "normal",
                            parentId: finalMessage.parentId,
                            imageUrl: finalMessage.imageUrl,
                            audioUrl: finalMessage.audioUrl,
                            isPinned: finalMessage.isPinned,
                            unlockAt: dbUnlockAt,
                            createdAt: new Date()
                        }
                    });
                }
            } catch (dbErr) {
                console.error("DB Persistence Error:", dbErr);
            }
        })();

        // Send Push Notification
        const notificationPromise = (async () => {
            if (finalMessage.sender && fastPayload.receiver) {
                try {
                    const notificationText = finalMessage.type === 'sticker' ? 'Sent a sticker' : (finalMessage.text || 'Sent an image');
                    await sendPushNotification(
                        fastPayload.receiver,
                        `Message from ${finalMessage.sender}`,
                        notificationText.substring(0, 50),
                        '/'
                    );
                } catch (err) {
                    // console.error("Notification Error:", err);
                }
            }
        })();

        await pusherPromise;

        // Invalidate Cache so next GET fetches fresh data
        await import("@/lib/redis").then(r => r.cacheDel(`chat:${chatKey}`));

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("API POST FAILURE:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { messageId, forEveryone, chatKey } = await req.json();
        const prisma = getPrisma();

        if (forEveryone) {
            await prisma.message.delete({
                where: { id: messageId }
            });
            // Notify other user
            await pusherServer.trigger(chatKey, "message-deleted", { messageId });
        } else {
            // "Delete for me" is usually handled locally or by flagging, 
            // but here we might just delete if we don't have per-user visibility flags
            // For simplicity in this app, "Delete for me" will just remove it locally if we don't store it per user.
            // If the user wants it gone from their view only, we'd need a separate visibleTo array.
            // Let's assume Delete for Everyone for now as the main requested feature.
        }

        await import("@/lib/redis").then(r => r.cacheDel(`chat:${chatKey}`));
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { messageId, text, chatKey } = await req.json();
        const prisma = getPrisma();

        const updated = await prisma.message.update({
            where: { id: messageId },
            data: {
                text,
                status: "edited" // Just a marker
            }
        });

        // Notify other user
        await pusherServer.trigger(chatKey, "message-edited", { messageId, text });

        await import("@/lib/redis").then(r => r.cacheDel(`chat:${chatKey}`));
        return NextResponse.json({ success: true, message: updated });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
