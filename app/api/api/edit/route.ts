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

        const { name, shortDescription, longDescription, categoryId, baseUrl, slug, logo, orgId, isPublic } = await req.json();

        const userOrg = await prisma.userOrganization.findFirst({
            where: {
                userId: session.user.id,
                organizationId: orgId,
                OR: [
                    { role: 'admin' },
                    { role: 'editor' }
                ]
            }
        })

        if (!userOrg?.organizationId) {
            return NextResponse.json({ success: false, error: "Only admins or editors can edit this API" }, { status: 400 })
        }

        const data = await prisma.aPI.update({
            where: {
                slug
            },
            data: {
                name,
                shortDescription,
                longDescription,
                logo,
                categoryId,
                orgId,
                baseUrl,
                isPublic
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