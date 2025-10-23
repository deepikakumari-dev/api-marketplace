import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await req.json();

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "Email already registered." },
        { status: 409 }
      );
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: firstName + ' ' + lastName,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { success: true, user: { id: user.id, email: user.email, name: user.name } },
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
