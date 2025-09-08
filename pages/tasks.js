"use client";
import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function Tasks() {
  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState("Facebook");
  const [clicks, setClicks] = useState(0);
  const [points, setPoints] = useState(1);
  const [tasks, setTasks] = useState([]);

  // ✅ إضافة مهمة جديدة إلى Firestore
  const addTask = async () => {
    if (!taskName.trim()) return;

    try {
      await addDoc(collection(db, "tasks"), {
        taskName,
        category,
        clicks,
        points,
        createdAt: new Date(),
      });

      alert("✅ تمت إضافة المهمة بنجاح!");
      setTaskName("");
      setClicks(0);
      setPoints(1);
      fetchTasks(); // تحديث القائمة بعد الإضافة
    } catch (error) {
      console.error("❌ خطأ أثناء الحفظ:", error);
    }
  };

  // ✅ جلب المهام من Firestore
  const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const tasksData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(tasksData);
  };

  // جلب المهام عند تحميل الصفحة
  useState(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">✍️ إنشاء مهمة</h1>

        {/* إدخال بيانات المهمة */}
        <div className="space-y-3">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="اسم المهمة"
            className="w-full border rounded p-2"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option>Facebook</option>
            <option>Instagram</option>
            <option>YouTube</option>
            <option>LinkedIn</option>
            <option>TikTok</option>
          </select>

          <input
            type="number"
            value={clicks}
            onChange={(e) => setClicks(Number(e.target.value))}
            placeholder="عدد النقرات المطلوبة"
            className="w-full border rounded p-2"
          />

          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            placeholder="النقاط لكل نقرة"
            className="w-full border rounded p-2"
          />

          <button
            onClick={addTask}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            ➕ إضافة مهمة
          </button>
        </div>

        {/* عرض المهام */}
        <h2 className="text-xl font-bold mt-6 mb-3">📋 مهامي السابقة</h2>
        <ul className="space-y-2">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="p-3 bg-gray-50 border rounded shadow-sm"
            >
              <strong>{t.taskName}</strong> ({t.category})  
              <br />
              🎯 {t.clicks} نقرة – ⭐ {t.points} نقطة/نقرة
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
              }
