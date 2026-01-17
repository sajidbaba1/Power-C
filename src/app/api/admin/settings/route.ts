import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export async function GET() {
    try {
        const prisma = getPrisma();
        let settings = await prisma.globalSettings.findUnique({
            where: { id: "default" }
        });

        if (!settings) {
            settings = await prisma.globalSettings.create({
                data: { id: "default", stopEffects: false }
            });
        }

        return NextResponse.json(settings);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { stopEffects, updatedBy } = await req.json();
        const prisma = getPrisma();

        const settings = await prisma.globalSettings.upsert({
            where: { id: "default" },
            update: { stopEffects, updatedBy },
            create: { id: "default", stopEffects, updatedBy }
        });

        // Notify both dashboards instantly
        const sorted = ["sajid", "nasywa"].sort();
        const chatKey = `${sorted[0]}-${sorted[1]}`;
        await pusherServer.trigger(chatKey, "global-settings-update", settings);

        return NextResponse.json(settings);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
