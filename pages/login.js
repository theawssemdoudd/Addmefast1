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
  apiKey: "YOUR_API_KEY",
  authDomain: "hasmen-8eba0.firebaseapp.com",
  projectId: "hasmen-8eba0",
  storageBucket: "hasmen-8eba0.appspot.com", // ✅ صححتها هنا
  messagingSenderId: "992187142687",
  appId: "YOUR_APP_ID",
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
      alert("✅ تم تسجيل الدخول");
    } catch (error) {
      alert("❌ " + error.message);
    }
  };

  return (
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
    </div>
  );
}
