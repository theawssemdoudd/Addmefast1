import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Earn() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        const tasksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksData);
      } catch (error) {
        console.error("❌ خطأ أثناء جلب المهام:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">💰 المهام المتاحة للربح</h1>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">لا توجد مهام متاحة حالياً</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-lg font-bold mb-2">{task.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                📂 القسم: {task.category}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                👥 عدد النقرات المطلوبة: {task.clicks}
              </p>
              <p className="text-sm text-green-600 font-semibold mb-4">
                💎 النقاط لكل نقرة: {task.points}
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                إنجاز المهمة ✅
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
