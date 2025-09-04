import { connectDB } from "../lib/db.js";

export default async function handler(req, res) {
  try {
    const db = await connectDB();
    res.status(200).json({ ok: true, message: "Connected to MongoDB ✅" });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
