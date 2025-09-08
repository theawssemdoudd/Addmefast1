"use client";
import { useEffect, useState } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// ✅ إعداد Firebase مع منع التكرار
const firebaseConfig = {
  apiKey: "AIzaSyBR3RiVIGpBwmFbwycC9amdh9x6KqCir_M",
  authDomain: "hasmen-8eba0.firebaseapp.com",
  projectId: "hasmen-8eba0",
  storageBucket: "hasmen-8eba0.firebasestorage.app",
  messagingSenderId: "992187142687",
  appId: "1:992187142687:web:c24dd992ed61ee80d43b2a",
  measurementId: "G-70RKFK8HGX",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Earn() {
  const [tasks, setTasks] = useState([]);

  // ✅ جلب المهام من Firestore
  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tasks"));
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
  }, []);

  // 🔹 دالة تجريبية لإنجاز المهمة
  const completeTask = (task) => {
    alert(`✅ أنجزت المهمة: ${task.taskName} وربحت ${task.points} نقاط 🎉`);
    // لاحقًا: تحديث رصيد المستخدم في قاعدة البيانات
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          💰 قائمة المهام المتاحة
        </h1>

        {tasks.length === 0 ? (
          <p className="text-center text-gray-600">⏳ لا توجد مهام متاحة حاليًا</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((t) => (
              <li
                key={t.id}
                className="p-4 bg-gray-50 border rounded shadow-sm flex justify-between items-center"
              >
                <div>
                  <h2 className="font-bold text-lg">{t.taskName}</h2>
                  <p className="text-sm text-gray-600">
                    📂 {t.category} | 🎯 {t.clicks} نقرة
                  </p>
                  <p className="text-sm text-green-700">
                    ⭐ {t.points} نقطة/نقرة
                  </p>
                </div>
                <button
                  onClick={() => completeTask(t)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  إنجاز
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
          }
