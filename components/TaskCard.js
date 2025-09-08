export default function TaskCard({ task }) {
  return (
    <div className="bg-white border rounded-lg shadow p-4 mb-3">
      <h3 className="text-lg font-semibold">{task.name}</h3>
      <p className="text-sm text-gray-600">🗂️ القسم: {task.category}</p>
      <p className="text-sm">👥 عدد النقرات: {task.clicks}</p>
      <p className="text-sm">🏆 النقاط لكل نقرة: {task.pointsPerClick}</p>
      <p className="text-xs text-gray-500 mt-2">
        الحالة: {task.status || "قيد الانتظار"}
      </p>
    </div>
  );
}
