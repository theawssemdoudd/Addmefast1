import connectDB from "@/lib/db";
import User from "@/lib/models";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return Response.json({ ok: false, error: "All fields are required" }, { status: 400 });
    }

    // تحقق من وجود مستخدم بنفس الاسم
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return Response.json({ ok: false, error: "Username already taken" }, { status: 400 });
    }

    // تحقق من وجود مستخدم بنفس البريد
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return Response.json({ ok: false, error: "Email already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return Response.json({ ok: true, message: "User registered ✅" });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
