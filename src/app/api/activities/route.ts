import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

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
        console.log("Prisma client type:", typeof prisma, "Keys:", Object.keys(prisma).slice(0, 10));

        const today = new Date().toISOString().split('T')[0];

        const activity = await prisma.activity.create({
            data: {
                text,
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
            if (existingIdx > -1) {
                reactions.splice(existingIdx, 1);
            } else {
                reactions.push({ emoji: reaction, user: sender });
            }

            activity = await (prisma as any).activity.update({
                where: { id },
                data: { reactions },
                include: { comments: true }
            });
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
