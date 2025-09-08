export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-xl font-bold">🔑 تسجيل الدخول</h1>
      <form className="flex flex-col gap-4 w-64 mt-6">
        <input type="email" placeholder="الإيميل" className="p-2 border rounded" />
        <input type="password" placeholder="كلمة المرور" className="p-2 border rounded" />
        <button className="bg-blue-600 text-white p-2 rounded">تسجيل الدخول</button>
      </form>
    </div>
  );
}
