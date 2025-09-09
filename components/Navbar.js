import { useState } from "react";

export default function Navbar({ user, username, points = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-lg relative">
      <h1 className="text-lg font-bold">📌 نظام المهام</h1>

      {user && (
        <div className="flex items-center gap-3">
          <span>👤 {username || "user "}</span>
          <span>🏆 {points || 0} نقاط</span>

          {/* صورة أو رمز المستخدم */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-2 w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center"
          >
            {/* هنا تحط الرمز أو الصورة لاحقًا */}
            🙂
          </button>
        </div>
      )}

      {/* القائمة المنسدلة */}
      {menuOpen && (
        <div className="absolute right-4 top-16 bg-white text-black rounded-lg shadow-lg w-40 p-3">
          <ul className="space-y-2">
            <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">
              الملف الشخصي
            </li>
            <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">
              الإعدادات
            </li>
            <li className="hover:bg-gray-200 p-2 rounded cursor-pointer">
              تسجيل الخروج
            </li>
          </ul>
        </div>
      )}
    </div>
  );
        }
