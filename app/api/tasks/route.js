// api/tasks.js
import { connectDB } from "../lib/db.js";
import { Task } from "../lib/models.js";

export default async function handler(req, res) {
  await connectDB();
  const tasks = await Task.find({ active: true });
  res.json(tasks);
}
