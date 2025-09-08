"use client";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// 🔹 إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBR3RiVIGpBwmFbwycC9amdh9x6KqCir_M",
  authDomain: "hasmen-8eba0.firebaseapp.com",
  projectId: "hasmen-8eba0",
  storageBucket: "hasmen-8eba0.firebasestorage.app",
  messagingSenderId: "992187142687",
  appId: "1:992187142687:web:c24dd992ed61ee80d43b2a",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default function Earn() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  // متابعة المستخدم
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) loadTasks(u.uid);
    });
    return () => unsubscribe();
  }, []);

  // جلب المهام (باستثناء مهام المستخدم نفسه)
  const loadTasks = async (uid) => {
    const q = query(collection(db, "tasks"), where("userId", "!=", uid));
    const snap = await getDocs(q);
    setTasks(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  // تنفيذ مهمة
  const completeTask = async (task) => {
    if (!user) return alert("⚠️ يجب تسجيل الدخول");

    try {
      // 1️⃣ تقليل عدد النقرات المتبقية في المهمة
      const taskRef = doc(db, "tasks", task.id);
      await updateDoc(taskRef, {
        clicks: task.clicks - 1,
      });

      // 2️⃣ زيادة نقاط المستخدم
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        points: increment(task.points),
      });

      alert(`✅ حصلت على ${task.points} نقطة`);
      loadTasks(user.uid); // تحديث القائمة
    } catch (error) {
      console.error(error);
      alert("❌ حدث خطأ");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-green-600 mb-4">💰 اكسب النقاط</h1>

      {user ? (
        tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-lg shadow mb-3 border-l-4 border-green-500"
            >
              <p className="font-bold">{task.name}</p>
              <p className="text-sm text-gray-600">
                {task.category} | {task.clicks} نقرة متبقية | {task.points} نقطة/نقرة
              </p>
              <button
                onClick={() => completeTask(task)}
                disabled={task.clicks <= 0}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
              >
                {task.clicks > 0 ? "تنفيذ المهمة" : "المهمة مكتملة"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">🚫 لا توجد مهام متاحة الآن</p>
        )
      ) : (
        <p className="text-red-600">⚠️ الرجاء تسجيل الدخول أولاً</p>
      )}
    </div>
  );
        }
