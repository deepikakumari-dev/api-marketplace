import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !session.user) {
            return NextResponse.json({ success: false, error: 'Unauthorized request' }, { status: 401 })
        }

        const { name, description, categoryId, orgId, slug } = await req.json();

        if (!name || !description || !categoryId || !orgId || !slug) {
            return NextResponse.json(
                { success: false, error: "All fields are required." },
                { status: 400 }
            );
        }

        const data = await prisma.aPI.create({
            data: {
                name,
                shortDescription: description,
                categoryId,
                orgId,
                slug,
                creatorId: session.user.id
            }
        })

        return NextResponse.json(
            { success: true, data },
            { status: 201 }
        );
    } catch (e: any) {
        console.error("API creation error:", e);
        return NextResponse.json(
            { success: false, error: e.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}