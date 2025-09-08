export default function Navbar({ user, points }) {
  return (
    <div className="flex justify-between bg-blue-600 text-white p-4 rounded-lg">
      <h1 className="text-lg font-bold">📌 نظام المهام</h1>
      {user && (
        <div>
          👤 {user.email} | 🏆 {points} نقاط
        </div>
      )}
    </div>
  );
}
