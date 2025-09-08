

import { useState, useEffect } from "react";
import { db, auth } from "../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

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
        q = collection(db, "tasks"); // لو الزائر موش مسجل دخول، نعرض كل المهام
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

  useEffect(() => {
    fetchTasks();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">💰 كسب النقاط</h1>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">لا توجد مهام متاحة حاليا</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 border rounded-lg shadow-sm flex justify-between items-center bg-white"
            >
              <div>
                <p className="font-bold text-lg">{task.title}</p>
                <p className="text-sm text-gray-500">
                  📂 {task.category} | 🎯 {task.clicks} نقرة | ⭐ {task.points} نقطة
                </p>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                تنفيذ المهمة
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
