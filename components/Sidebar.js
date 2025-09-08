import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-60 bg-gray-800 text-white min-h-screen p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-6">📊 لوحة التحكم</h2>
      
      <nav className="flex flex-col gap-3">
        <Link href="/tasks" className="hover:bg-gray-700 p-2 rounded">
          📝 مهامي
        </Link>
        <Link href="/earn" className="hover:bg-gray-700 p-2 rounded">
          💰 ربح المال
        </Link>
        <Link href="/withdraw" className="hover:bg-gray-700 p-2 rounded">
          💸 سحب الأموال
        </Link>
      </nav>
    </div>
  );
}
