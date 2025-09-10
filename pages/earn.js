import { useState, useEffect } from "react";
import { db, auth } from "../lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function EarnPage() {
  const [user] = useAuthState(auth);
  const [tasks, setTasks] = useState([]);

  // 🟢 جلب المهام من جميع المستخدمين باستثناء المستخدم الحالي
  const fetchTasks = async () => {
    try {
      let q;
      if (user) {
        q = query(collection(db, "tasks"), where("userId", "!=", user.uid));
      } else {
        q = collection(db, "tasks");
      }

      const querySnapshot = await getDocs(q);
      const tasksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    } catch (error) {
      console.error("خطأ في جلب المهام:", error);
    }
  };

  // 🟢 تنفيذ المهمة (زيادة العداد في Firestore)
  const handleDoTask = async (taskId, clicks, maxClicks) => {
    if (clicks >= maxClicks) {
      alert("❌ هذه المهمة اكتملت بالفعل");
      return;
    }

    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, {
        clicks: clicks + 1,
      });

      // تحديث الواجهة بعد الزيادة
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, clicks: task.clicks + 1 } : task
        )
      );

      alert("✅ تم تنفيذ المهمة");
    } catch (error) {
      console.error("خطأ أثناء تحديث المهمة:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* 🔹 الشريط العلوي */}
      <Navbar
        user={user}
        username={user?.displayName}
        points={user?.points || 0}
      />

      {/* 🔹 المحتوى */}
      <main className="flex-1 max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          💰 كسب النقاط
        </h1>

        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center bg-white p-6 rounded-lg shadow">
            لا توجد مهام متاحة حاليا
          </p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="p-4 border rounded-xl shadow-sm flex justify-between items-center bg-white hover:shadow-md transition"
              >
                <div>
                  <p className="font-bold text-lg text-gray-800">{task.title}</p>
                  <p className="text-sm text-gray-500">
                    📂 {task.category} | 🎯 {task.clicks}/{task.maxClicks} نقرة |
                    ⭐ {task.points} نقطة
                  </p>
                </div>

                {/* 🔹 إذا العداد اكتمل نوقف المهمة */}
                {task.clicks >= task.maxClicks ? (
                  <span className="text-red-500 font-bold">✔ المهمة مكتملة</span>
                ) : (
                  <button
                    onClick={() =>
                      handleDoTask(task.id, task.clicks, task.maxClicks)
                    }
                    className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    تنفيذ المهمة
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* 🔹 الفوتر */}
      <footer className="bg-gray-200 text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} نظام المهام. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
