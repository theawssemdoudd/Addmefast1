import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Navbar from "../components/Navbar"; // الشريط العلوي

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  
  // تسجيل الدخول
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ تم تسجيل الدخول");
      router.push("/"); // تحويل مباشرة للصفحة الرئيسية
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
        <br /><br />
        <button onClick={() => router.push("/register")}>
         إنشاء حساب جديد 
        </button>
      </div>
    </div>
  );
}
