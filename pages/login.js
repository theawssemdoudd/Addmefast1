"use client";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// 🔹 إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBR3RiVIGpBwmFbwycC9amdh9x6KqCir_M",
  authDomain: "hasmen-8eba0.firebaseapp.com",
  projectId: "hasmen-8eba0",
  storageBucket: "hasmen-8eba0.firebasestorage.app",
  messagingSenderId: "992187142687",
  appId: "1:992187142687:web:c24dd992ed61ee80d43b2a",
  measurementId: "G-70RKFK8HGX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // متابعة حالة المستخدم
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // إنشاء حساب
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("✅ تم إنشاء الحساب بنجاح");
    } catch (error) {
      alert("❌ خطأ: " + error.message);
    }
  };

  // تسجيل الدخول
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ تم تسجيل الدخول");
    } catch (error) {
      alert("❌ " + error.message);
    }
  };

  // تسجيل الخروج
  const handleLogout = async () => {
    await signOut(auth);
    alert("🚪 تم تسجيل الخروج");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          🔐 تسجيل الدخول
        </h2>

        {user ? (
          <div className="text-center">
            <p className="mb-4 text-gray-700">
              مرحبًا <span className="font-bold">{user.email}</span>
            </p>
            <button
              onClick={handleLogout}
              className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              تسجيل الخروج
            </button>
          </div>
        ) : (
          <>
            <input
              type="email"
              placeholder="📧 البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="🔑 كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex gap-3">
              <button
                onClick={handleSignup}
                className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                إنشاء حساب
              </button>
              <button
                onClick={handleLogin}
                className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                تسجيل الدخول
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
                }
