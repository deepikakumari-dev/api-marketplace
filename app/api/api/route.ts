import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !session.user) {
            return NextResponse.json({ success: false, error: 'Unauthorized request' }, { status: 401 })
        }

        const apis = await prisma.aPI.findMany({
            where:{
                orgId: session.user.activeOrgId
            }
        })


        return NextResponse.json(
            { success: true, apis },
            { status: 201 }
        );

    } catch (e: any){
                console.error("API fetching error:", e);
        return NextResponse.json(
            { success: false, error: e.message || "Internal Server Error" },
            { status: 500 }
        );

    }
}
