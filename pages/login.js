"use client";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

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
const auth = getAuth(app);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // تسجيل حساب جديد
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("✅ تم إنشاء الحساب");
    } catch (error) {
      alert("❌ " + error.message);
    }
  };

  // تسجيل الدخول
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/tasks"; // ⬅️ ينتقل لصفحة المهام
    } catch (error) {
      alert("❌ " + error.message);
    }
  };

  // تسجيل الخروج
  const handleLogout = async () => {
    await signOut(auth);
    alert("تم تسجيل الخروج");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">🔐 تسجيل الدخول</h2>

        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />

        <div className="flex gap-2">
          <button
            onClick={handleSignup}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            إنشاء حساب
          </button>
          <button
            onClick={handleLogin}
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            تسجيل الدخول
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
        >
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}
