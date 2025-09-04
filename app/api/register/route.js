// api/auth/register.js
import bcrypt from "bcryptjs";
import { connectDB } from "../../lib/db.js";
import { User } from "../../lib/models.js";
import { signToken } from "../../lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await connectDB();
  const { email, password, username } = req.body;
  if (!email || !password) return res.status(400).json({ error: "missing" });

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, username, passwordHash: hash });
    const token = signToken(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: "user exists or bad" });
  }
}
