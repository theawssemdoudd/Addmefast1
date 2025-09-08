
import { useState, useEffect } from "react";
import { db, auth } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function TasksPage() {
  const [user] = useAuthState(auth);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("فيسبوك");
  const [clicks, setClicks] = useState("");
  const [points, setPoints] = useState("");

  // 🟢 إنشاء مهمة جديدة
  const handleCreateTask = async () => {
    if (!user) {
      alert("❌ يجب تسجيل الدخول أولاً");
      return;
    }
    if (!title || !clicks || !points) {
      alert("⚠️ يرجى إدخال جميع الحقول");
      return;
    }

    try {
      await addDoc(collection(db, "tasks"), {
        title,
        category,
        clicks: Number(clicks),
        points: Number(points),
        userId: user.uid, // 🔹 ربط المهمة بالمستخدم الحالي
        createdAt: serverTimestamp(),
      });
      alert("✅ تم إنشاء المهمة");
      setTitle("");
      setClicks("");
      setPoints("");
      fetchTasks(); // إعادة تحميل المهام بعد الإضافة
    } catch (error) {
      console.error("خطأ في إنشاء المهمة:", error);
    }
  };

  // 🟢 جلب المهام الخاصة بالمستخدم الحالي
  const fetchTasks = async () => {
    if (!user) return;
    try {
      const q = query(
        collection(db, "tasks"),
        where("userId", "==", user.uid)
      );
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

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 font-bold text-lg">
          ❌ يجب تسجيل الدخول لعرض أو إنشاء مهامك
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📌 مهامي</h1>

      {/* 🔹 إنشاء مهمة جديدة */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">➕ إنشاء مهمة جديدة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="اسم المهمة"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-lg p-2"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option>فيسبوك</option>
            <option>يوتيوب</option>
            <option>إنستغرام</option>
            <option>لينكدإن</option>
            <option>تيك توك</option>
          </select>
          <input
            type="number"
            placeholder="عدد النقرات المطلوبة"
            value={clicks}
            onChange={(e) => setClicks(e.target.value)}
            className="border rounded-lg p-2"
          />
          <input
            type="number"
            placeholder="النقاط لكل نقرة"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            className="border rounded-lg p-2"
          />
        </div>
        <button
          onClick={handleCreateTask}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          حفظ المهمة
        </button>
      </div>

      {/* 🔹 عرض المهام */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">📂 مهامي السابقة</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-500">لا توجد مهام بعد</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="p-3 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">{task.title}</p>
                  <p className="text-sm text-gray-500">
                    {task.category} | {task.clicks} نقرة | {task.points} نقطة
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {task.createdAt?.toDate
                    ? task.createdAt.toDate().toLocaleDateString()
                    : "⏳"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
