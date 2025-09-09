import { useState } from "react";
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      // 1- إنشاء الحساب بالبريد و كلمة السر
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 2- تخزين البيانات الإضافية في Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        username,
        country,
        email,
        createdAt: new Date(),
      });

      alert("✅ تم إنشاء الحساب بنجاح");
    } catch (error) {
      alert("❌ " + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>إنشاء حساب جديد</h2>

      <input
        type="text"
        placeholder="الاسم الكامل"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      /><br />

      <input
        type="text"
        placeholder="اسم المستخدم"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />

      <input
        type="text"
        placeholder="البلد"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      /><br />

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

      <button onClick={handleRegister}>تسجيل</button>
    </div>
  );
  }
