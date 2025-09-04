import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
