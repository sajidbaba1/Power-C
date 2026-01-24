import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export async function GET() {
    try {
        const prisma = getPrisma();
        const milestones = await prisma.milestone.findMany({
            orderBy: { date: "asc" }
        });
        return NextResponse.json(milestones);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { title, date, type, sender } = await req.json();
        const prisma = getPrisma();

        const milestone = await prisma.milestone.create({
            data: {
                title,
                date: new Date(date),
                type: type || "anniversary"
            }
        });

        const sorted = ["sajid", "nasywa"].sort();
        const chatKey = `${sorted[0]}-${sorted[1]}`;
        await pusherServer.trigger(chatKey, "new-milestone", milestone);

        // Notify partner
        if (sender) {
            const partnerName = sender === "sajid" ? "Sajid" : "Nasywa";
            await pusherServer.trigger(chatKey, "partner-notification", {
                type: "milestone",
                title: "New Milestone",
                message: `${partnerName} added a new milestone to your journey!`,
                sender: sender,
                createdAt: new Date().toISOString()
            });

            // Push Notification
            const targetRole = sender === "sajid" ? "nasywa" : "sajid";
            await import("@/lib/notifications").then(m =>
                m.sendPushNotification(targetRole, "New Milestone", `${partnerName} added a new milestone: ${title}`)
            );
        }

        return NextResponse.json(milestone);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        const prisma = getPrisma();
        await prisma.milestone.delete({ where: { id } });

        const sorted = ["sajid", "nasywa"].sort();
        const chatKey = `${sorted[0]}-${sorted[1]}`;
        await pusherServer.trigger(chatKey, "delete-milestone", { id });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
