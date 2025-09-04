import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/lib/models";
import { signToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    await connectDB();
    const user = await User.findOne({ username });
    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid password");

    const token = signToken(user);
    return NextResponse.json({ ok: true, token });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 401 });
  }
}
