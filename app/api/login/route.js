// api/auth/login.js
import bcrypt from "bcryptjs";
import { connectDB } from "../../lib/db.js";
import { User } from "../../lib/models.js";
import { signToken } from "../../lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await connectDB();
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "no user" });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(400).json({ error: "bad creds" });
  const token = signToken(user);
  res.json({ token });
}
