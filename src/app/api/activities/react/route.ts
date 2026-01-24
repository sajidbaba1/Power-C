import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
    try {
        const { activityId, emoji, user } = await req.json();
        const prisma = getPrisma();

        const activity = await prisma.activity.findUnique({
            where: { id: activityId },
            include: { comments: true }
        });

        if (!activity) {
            return NextResponse.json({ error: "Activity not found" }, { status: 404 });
        }

        const reactions = (activity.reactions as any[]) || [];
        const existingIndex = reactions.findIndex(r => r.emoji === emoji && r.user === user);

        if (existingIndex !== -1) {
            // Toggle off: remove if already exists
            reactions.splice(existingIndex, 1);
        } else {
            // Toggle on: add if doesn't exist
            reactions.push({ emoji, user, createdAt: new Date().toISOString() });
        }

        const updated = await prisma.activity.update({
            where: { id: activityId },
            data: { reactions },
            include: { comments: { orderBy: { createdAt: 'asc' } } }
        });

        // Trigger Pusher update
        const channelName = `activities-${activity.date}`;
        await pusherServer.trigger(channelName, "update-activity", updated);

        // Notify if it's a new reaction from partner
        if (existingIndex === -1 && activity.sender !== user) {
            const partnerName = user === "sajid" ? "Sajid" : "Nasywa";
            await import("@/lib/notifications").then(m =>
                m.sendPushNotification(activity.sender, "New Reaction", `${partnerName} reacted ${emoji} to your pulse`)
            );
        }

        return NextResponse.json(updated);
    } catch (e: any) {
        console.error("React Error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
