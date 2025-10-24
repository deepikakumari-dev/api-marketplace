import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !session.user) {
            return NextResponse.json({ success: false, error: 'Unauthorized request' }, { status: 401 })
        }

        const { name, description, imageUrl } = await req.json();

        if (!name || !description) {
            return NextResponse.json(
                { success: false, error: "All fields are required." },
                { status: 400 }
            );
        }

        const data = await prisma.organization.create({
            data: {
                name,
                description,
                image: imageUrl,
                creatorId: session.user.id
            }
        })

        await prisma.userOrganization.create({
            data: {
                organizationId: data.id,
                userId: session.user.id,
                role: 'admin'
            }
        })

        return NextResponse.json(
            { success: true, data},
            { status: 201 }
        );
    } catch (e: any) {
        console.error("Registration error:", e);
        return NextResponse.json(
            { success: false, error: e.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}