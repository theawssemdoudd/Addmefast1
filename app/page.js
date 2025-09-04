"use client";
import { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h1 className="text-2xl font-bold">🚀 AddMeFast Clone</h1>
        <nav className="space-y-2">
          <button onClick={() => setActiveTab("home")} className="block w-full text-left hover:bg-gray-700 p-2 rounded">🏠 الرئيسية</button>
          <button onClick={() => setActiveTab("tasks")} className="block w-full text-left hover:bg-gray-700 p-2 rounded">✅ مهامي</button>
          <button onClick={() => setActiveTab("points")} className="block w-full text-left hover:bg-gray-700 p-2 rounded">⭐ رصيدي</button>
          <button onClick={() => setActiveTab("settings")} className="block w-full text-left hover:bg-gray-700 p-2 rounded">⚙️ الإعدادات</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "home" && <h2 className="text-xl font-semibold">مرحبًا بك 👋</h2>}
        {activeTab === "tasks" && <h2 className="text-xl font-semibold">قائمة المهام</h2>}
        {activeTab === "points" && <h2 className="text-xl font-semibold">رصيد نقاطك</h2>}
        {activeTab === "settings" && <h2 className="text-xl font-semibold">الإعدادات</h2>}
      </main>
    </div>
  );
}
