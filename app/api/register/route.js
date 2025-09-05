// app/api/register/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/lib/models";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Register request body:", body);

    const { username, email, password } = body || {};
    if (!username || !email || !password) {
      return NextResponse.json(
        { ok: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // تحقق سريع قبل المحاولة
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      const which = existing.username === username ? "username" : "email";
      return NextResponse.json(
        { ok: false, message: `${which} already exists` },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashed });
    await newUser.save();

    console.log("New user created:", { id: newUser._id, username: newUser.username });
    return NextResponse.json({ ok: true, message: "User registered successfully" }, { status: 201 });
  } catch (err) {
    console.error("Register ERROR:", err);
    // تعامل خاص مع duplicate key error من MongoDB
    if (err && err.code === 11000) {
      const field = Object.keys(err.keyValue || { })[0] || "field";
      return NextResponse.json({ ok: false, message: `${field} already exists (dup)` }, { status: 400 });
    }
    // ملاحظة: رجع stack مؤقتاً للتصحيح — احذف الـ stack لاحقاً في الإنتاج
    return NextResponse.json({ ok: false, message: err?.message || "Server error", stack: err?.stack }, { status: 500 });
  }
}
