import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "../../components/Navbar";

export default function TaskDetails() {
  const router = useRouter();
  const { id } = router.query; // 🟢 الحصول على id من الرابط
  const [task, setTask] = useState(null);

  // 🟢 جلب بيانات المهمة من Firestore
  useEffect(() => {
    if (!id) return;
    const fetchTask = async () => {
      const docRef = doc(db, "tasks", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTask({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchTask();
  }, [id]);

  if (!task) {
    return <p className="text-center mt-10">⏳ جاري تحميل المهمة...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto p-6 bg-white rounded-xl shadow mt-6">
        <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
        <p className="text-gray-600 mb-2">📂 التصنيف: {task.category}</p>
        <p className="text-gray-600 mb-2">⭐ النقاط: {task.points}</p>
        <p className="text-gray-600 mb-6">🎯 النقرات المطلوبة: {task.clicks}</p>

        {/* مكان رابط المهمة */}
        {task.link && (
          <a
            href={task.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition mb-4"
          >
            فتح المهمة 🔗
          </a>
        )}

        {/* مكان إرسال الإثبات */}
        <div className="mt-6">
          <label className="block mb-2 font-semibold">📸 أرسل إثبات الإنجاز:</label>
          <input
            type="text"
            placeholder="رابط الصورة أو نص الإثبات"
            className="border w-full p-2 rounded mb-3"
          />
          <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition">
            إرسال للإدارة ✅
          </button>
        </div>
      </main>
    </div>
  );
              }
