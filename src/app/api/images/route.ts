import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getPrisma } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { image, sender, receiver, viewType } = await req.json();

        if (!image || !sender || !receiver) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: "power-couple",
            resource_type: "auto",
        });

        // Save to database
        const prisma = getPrisma();
        const imageRecord = await prisma.image.create({
            data: {
                cloudinaryId: uploadResponse.public_id,
                url: uploadResponse.secure_url,
                sender,
                receiver,
                viewType: viewType || "permanent",
                viewed: false,
            },
        });

        return NextResponse.json({
            success: true,
            image: imageRecord
        });
    } catch (error: any) {
        console.error("Image upload error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// GET images for a specific user
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const user = searchParams.get("user");

        const prisma = getPrisma();

        const where = user ? {
            OR: [
                { sender: user },
                { receiver: user },
            ],
        } : {};

        const images = await prisma.image.findMany({
            where,
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(images);
    } catch (error: any) {
        console.error("Fetch images error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
