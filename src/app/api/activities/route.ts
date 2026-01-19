import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { sendActivityEmail } from "@/lib/email";
import { translateAndAnalyze } from "@/lib/gemini";
import { sendPushNotification } from "@/lib/notifications";

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    console.log("API GET activities called");
    try {
        const { searchParams } = new URL(req.url);
        const date = searchParams.get("date"); // YYYY-MM-DD
        console.log(`Fetching activities for date: ${date}`);

        if (!date) {
            return NextResponse.json({ error: "Date required" }, { status: 400 });
        }

        const prisma = getPrisma();

        const activities = await prisma.activity.findMany({
            where: { date },
            include: {
                comments: {
                    orderBy: { createdAt: "asc" }
                }
            },
            orderBy: { createdAt: "desc" }
        });

        return NextResponse.json(activities);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { text, imageUrl, sender } = await req.json();

        if (!text || !sender) {
            return NextResponse.json({ error: "Text and sender required" }, { status: 400 });
        }

        // Language detection/direction
        const targetLang = sender === "sajid" ? "Indonesian" : "English";
        const sourceLang = sender === "sajid" ? "English" : "Indonesian";

        // AI Translation and breakdown
        const aiResult = await translateAndAnalyze(text, sourceLang, targetLang);

        let uploadedUrl = imageUrl;
        if (imageUrl && imageUrl.startsWith("data:image")) {
            const { v2: cloudinary } = await import("cloudinary");
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });
            const uploadRes = await cloudinary.uploader.upload(imageUrl, {
                folder: "power-couple-activities",
                resource_type: "auto",
            });
            uploadedUrl = uploadRes.secure_url;
        }

        const prisma = getPrisma();
        const today = new Date().toISOString().split('T')[0];

        const activity = await prisma.activity.create({
            data: {
                text,
                translation: aiResult.translation,
                hindiTranslation: aiResult.hindiTranslation,
                wordBreakdown: aiResult.wordBreakdown,
                imageUrl: uploadedUrl,
                sender,
                date: today,
                status: "pending",
                reactions: []
            },
            include: {
                comments: true
            }
        });

        // Broadcast new activity
        const sorted = ["sajid", "nasywa"].sort();
        const chatKey = `${sorted[0]}-${sorted[1]}`;
        await pusherServer.trigger(chatKey, "new-activity", activity);

        // Also notify partner about new activity
        const partnerName = sender === "sajid" ? "Sajid" : "Nasywa";
        await pusherServer.trigger(chatKey, "partner-notification", {
            type: "activity",
            title: "New Activity",
            message: `${partnerName} added a new activity: "${text.substring(0, 30)}${text.length > 30 ? '...' : ''}"`,
            sender: sender,
            createdAt: new Date().toISOString()
        });

        // Push Notification
        const targetRole = sender === "sajid" ? "nasywa" : "sajid";
        await sendPushNotification(targetRole, "New Pulse", `${partnerName}: ${text.substring(0, 40)}...`);

        return NextResponse.json(activity);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { id, status, reaction, comment, sender } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "Activity ID required" }, { status: 400 });
        }

        const prisma = getPrisma();
        let activity;

        const partnerEmails = {
            sajid: "nasywanazhifariyandi@gmail.com",
            nasywa: "ss2727303@gmail.com"
        };
        const partnerNames = {
            sajid: "Sajid",
            nasywa: "Nasywa"
        };

        if (status) {
            activity = await (prisma as any).activity.update({
                where: { id },
                data: { status },
                include: { comments: true }
            });
        } else if (reaction) {
            const current = await (prisma as any).activity.findUnique({ where: { id } });
            const reactions = (current?.reactions as any[]) || [];

            // Toggle reaction
            const existingIdx = reactions.findIndex(r => r.user === sender && r.emoji === reaction);
            let isAdding = false;
            if (existingIdx > -1) {
                reactions.splice(existingIdx, 1);
            } else {
                reactions.push({ emoji: reaction, user: sender });
                isAdding = true;
            }

            activity = await (prisma as any).activity.update({
                where: { id },
                data: { reactions },
                include: { comments: true }
            });

            // Send notification if it's a new reaction and added by someone other than the owner
            if (isAdding && activity.sender !== sender) {
                const targetEmail = partnerEmails[sender as keyof typeof partnerEmails];
                const fromName = partnerNames[sender as keyof typeof partnerNames];

                // Email
                sendActivityEmail(targetEmail, fromName, "reaction", activity.text, reaction);

                // In-app
                const sorted = ["sajid", "nasywa"].sort();
                const chatKey = `${sorted[0]}-${sorted[1]}`;
                await pusherServer.trigger(chatKey, "partner-notification", {
                    type: "reaction",
                    title: "New Reaction",
                    message: `${fromName} reacted with ${reaction} to your activity`,
                    sender: sender,
                    createdAt: new Date().toISOString()
                });

                // Push Notification
                await sendPushNotification(activity.sender, "New Reaction", `${fromName} reacted ${reaction} to your pulse`);
            }
        } else if (comment && sender) {
            await (prisma as any).activityComment.create({
                data: {
                    text: comment,
                    sender,
                    activityId: id
                }
            });
            activity = await (prisma as any).activity.findUnique({
                where: { id },
                include: { comments: true }
            });

            // Send notification if comment is from someone else
            if (activity.sender !== sender) {
                const targetEmail = partnerEmails[sender as keyof typeof partnerEmails];
                const fromName = partnerNames[sender as keyof typeof partnerNames];

                // Email
                sendActivityEmail(targetEmail, fromName, "comment", activity.text, comment);

                // In-app
                const sorted = ["sajid", "nasywa"].sort();
                const chatKey = `${sorted[0]}-${sorted[1]}`;
                await pusherServer.trigger(chatKey, "partner-notification", {
                    type: "comment",
                    title: "New Comment",
                    message: `${fromName} commented on your activity`,
                    createdAt: new Date().toISOString()
                });

                // Push Notification
                await sendPushNotification(activity.sender, "New Comment", `${fromName} commented: ${comment}`);
            }
        }

        if (activity) {
            const sorted = ["sajid", "nasywa"].sort();
            const chatKey = `${sorted[0]}-${sorted[1]}`;
            await pusherServer.trigger(chatKey, "activity-update", activity);
        }

        return NextResponse.json(activity);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

