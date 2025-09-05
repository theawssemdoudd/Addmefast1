"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "1rem",
        textAlign: "center",
        background: "linear-gradient(135deg, #f9f9f9, #e3f2fd)",
        minHeight: "100vh",
      }}
    >
      {/* العنوان الرئيسي */}
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🚀 AddMeFast Clone</h1>

      {/* شريط التنقل */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <Link href="/">🏠 الرئيسية</Link>
        <Link href="/tasks">✅ مهامي</Link>
        <Link href="/balance">⭐ رصيدي</Link>
        <Link href="/settings">⚙️ الإعدادات</Link>
      </nav>

      {/* الترحيب */}
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <h2>مرحبًا بك 👋</h2>
        <p>هذه الصفحة الرئيسية. يمكنك تحميل المهام أو تسجيل الدخول من الأسفل.</p>

        {/* الأزرار */}
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link
            href="/register"
            style={{
              padding: "0.7rem 1.5rem",
              background: "#4caf50",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            📝 تسجيل
          </Link>
          <Link
            href="/login"
            style={{
              padding: "0.7rem 1.5rem",
              background: "#2196f3",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            🔑 دخول
          </Link>
        </div>
      </div>
    </div>
  );
}              
