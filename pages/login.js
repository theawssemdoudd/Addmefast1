import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Navbar from "../components/Navbar"; // 🔹 استدعاء الشريط العلوي

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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
      alert("✅ تم تسجيل الدخول");
    } catch (error) {
      alert("❌ " + error.message);
    }
  };

  return (
    <div>
      {/* 🔹 الشريط العلوي */}
      <Navbar user={null} points={0} />

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>تسجيل الدخول</h2>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button onClick={handleLogin}>تسجيل الدخول</button>
        <button onClick={handleSignup}>إنشاء حساب</button>
        <br /><br />
        {/* 🔹 زر ينقل المستخدم إلى صفحة التسجيل */}
        <button onClick={() => router.push("/register")}>
          الانتقال إلى صفحة التسجيل
        </button>
      </div>
    </div>
  );
}
