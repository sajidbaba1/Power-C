import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
    try {
        const { imageId, user } = await req.json();

        if (!imageId || !user) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const prisma = getPrisma();
        const image = await prisma.image.findUnique({
            where: { id: imageId },
        });

        if (!image) {
            return NextResponse.json({ error: "Image not found" }, { status: 404 });
        }

        // Check if user has permission to view
        if (image.receiver !== user && image.receiver !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // If one-time view and already viewed, delete from Cloudinary
        if (image.viewType === "one-time" && image.viewed) {
            await cloudinary.uploader.destroy(image.cloudinaryId);
            await prisma.image.delete({ where: { id: imageId } });
            return NextResponse.json({ error: "Image already viewed and deleted" }, { status: 410 });
        }

        // Mark as viewed if one-time
        if (image.viewType === "one-time") {
            await prisma.image.update({
                where: { id: imageId },
                data: { viewed: true },
            });
        }

        return NextResponse.json({ url: image.url, viewType: image.viewType });
    } catch (error: any) {
        console.error("View image error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
