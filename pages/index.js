import Link from "next/link";
import Navbar from "../components/Navbar"; // استدعاء الشريط العلوي

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 🔹 الشريط العلوي */}
      <Navbar user={null} points={0} />

      {/* 🔹 المحتوى */}
      <main className="flex-1 flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          مرحبًا بك في منصة إدارة المهام 🎯
        </h2>
        <p className="text-gray-600 max-w-lg mb-6">
          يمكنك إنشاء مهامك الخاصة، متابعة تقدمك، وربح النقاط عبر إنجاز مهام
          الآخرين.
        </p>
        <div className="flex gap-4">
          <Link
            href="/tasks"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            إنشاء مهمة
          </Link>
          <Link
            href="/earn"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            ربح المال
          </Link>
        </div>
      </main>

      {/* 🔹 الفوتر */}
      <footer className="bg-gray-200 text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} نظام المهام. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
              }
