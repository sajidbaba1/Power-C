import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const role = searchParams.get("role");

        if (!role) {
            return NextResponse.json({ error: "Role required" }, { status: 400 });
        }

        const prisma = getPrisma();
        let profile = await prisma.profile.findUnique({
            where: { role }
        });

        // Initialize if not exists
        if (!profile) {
            profile = await prisma.profile.create({
                data: {
                    role,
                    name: role.charAt(0).toUpperCase() + role.slice(1),
                    avatarUrl: null
                }
            });
        }

        return NextResponse.json(profile);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { role, name, avatarUrl } = await req.json();

        if (!role) {
            return NextResponse.json({ error: "Role required" }, { status: 400 });
        }

        const prisma = getPrisma();
        const profile = await prisma.profile.upsert({
            where: { role },
            update: { name, avatarUrl },
            create: { role, name, avatarUrl }
        });

        return NextResponse.json(profile);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
