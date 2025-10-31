import { authOptions } from "@/lib/auth"
import { getOrganizationAPIs } from "@/lib/data/apis"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req, { params }) {
    try {

        const { id } = await params
        const apis = await getOrganizationAPIs(id)

        return NextResponse.json(
            { success: true, apis },
            { status: 201 }
        );

    } catch (e: any) {
        console.error("API fetching error:", e);
        return NextResponse.json(
            { success: false, error: e.message || "Internal Server Error" },
            { status: 500 }
        );

    }
}
