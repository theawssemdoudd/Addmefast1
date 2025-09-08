"use client";
import { useState } from "react";

export default function Tasks() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, task]);
    setTask("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">✍️ إنشاء مهمة</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="أدخل المهمة..."
            className="flex-1 border rounded p-2"
          />
          <button
            onClick={addTask}
            className="px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            إضافة
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((t, i) => (
            <li
              key={i}
              className="p-2 bg-gray-50 border rounded shadow-sm flex justify-between"
            >
              <span>{t}</span>
              <button className="text-red-600 hover:underline">❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
                }
