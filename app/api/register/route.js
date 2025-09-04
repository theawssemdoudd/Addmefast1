import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/lib/models";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    await connectDB();
    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, password: hashed });
    return NextResponse.json({ ok: true, user: newUser });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }
}
