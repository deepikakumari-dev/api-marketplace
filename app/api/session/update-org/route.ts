import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { orgId } = await req.json()
  const session = await getServerSession(authOptions)

  if (!session) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 })

  // Trigger session update
  session.user.activeOrgId = orgId

  return NextResponse.json({ success: true })
}
