"use client";

import { useEffect, useState } from "react";

/**
 * ملاحظات:
 * - يتوقع أن تكون API routes متوفرة عند:
 *   POST  /api/register   { username, password }  -> { ok, token? }
 *   POST  /api/login      { username, password }  -> { ok, token? }
 *   GET   /api/tasks                         -> [ { _id, title, pointsReward } ]
 *   POST  /api/complete   { taskId }         -> { points }
 *
 * - يستخدم token مخزن في localStorage باسم "amf_token"
 */

export default function Page() {
  const [activeTab, setActiveTab] = useState("home");
  const [tasks, setTasks] = useState([]);
  const [me, setMe] = useState(null);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({ username: "", password: "" });
  const [token, setToken] = useState(typeof window !== "undefined" ? localStorage.getItem("amf_token") : null);

  useEffect(() => {
    // when token changes, store it and refetch user
    if (token) {
      localStorage.setItem("amf_token", token);
      fetchMe();
    } else {
      localStorage.removeItem("amf_token");
      setMe(null);
    }
  }, [token]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function api(path, opts = {}) {
    const headers = opts.headers || {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    headers["Content-Type"] = "application/json";
    const res = await fetch(`/api/${path}`, { ...opts, headers });
    const text = await res.text();
    try {
      return { status: res.status, data: JSON.parse(text) };
    } catch {
      return { status: res.status, data: text };
    }
  }

  async function loadTasks() {
    setLoadingTasks(true);
    const r = await api("tasks", { method: "GET" });
    setLoadingTasks(false);
    if (r.status >= 200 && r.status < 300) {
      setTasks(r.data || []);
    } else {
      setMessage("فشل تحميل المهام: " + (r.data?.error || r.data));
    }
  }

  async function fetchMe() {
    if (!token) return;
    const r = await api("me", { method: "GET" });
    if (r.status === 200) setMe(r.data);
    else {
      setMessage("لم نستطع جلب بياناتك. الرجاء تسجيل الدخول من جديد.");
      setToken(null);
    }
  }

  async function handleRegister() {
    setMessage("...");
    const r = await api("auth/register", { method: "POST", body: JSON.stringify({ username: form.username, password: form.password }) });
    if (r.status === 200 && r.data.token) {
      setToken(r.data.token);
      setMessage("تم التسجيل وتسجيل الدخول.");
      setActiveTab("home");
    } else {
      setMessage("خطأ في التسجيل: " + (r.data?.error || JSON.stringify(r.data)));
    }
  }

  async function handleLogin() {
    setMessage("...");
    const r = await api("auth/login", { method: "POST", body: JSON.stringify({ username: form.username, password: form.password }) });
    if (r.status === 200 && r.data.token) {
      setToken(r.data.token);
      setMessage("تم تسجيل الدخول.");
      setActiveTab("home");
    } else {
      setMessage("خطأ في تسجيل الدخول: " + (r.data?.error || JSON.stringify(r.data)));
    }
  }

  async function completeTask(taskId) {
    if (!token) {
      setMessage("لازم تسجل دخول أولاً لتكسب نقاط.");
      return;
    }
    const r = await api("complete", { method: "POST", body: JSON.stringify({ taskId }) });
    if (r.status === 200 && r.data.points !== undefined) {
      setMessage("تمت المهمة. نقاطك الآن: " + r.data.points);
      fetchMe();
    } else {
      setMessage("فشل إكمال المهمة: " + (r.data?.error || JSON.stringify(r.data)));
    }
  }

  function logout() {
    setToken(null);
    setForm({ username: "", password: "" });
    setMessage("تم تسجيل الخروج.");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h1 className="text-2xl font-bold">🚀 AddMeFast Clone</h1>

        <nav className="space-y-2">
          <button onClick={() => setActiveTab("home")} className={`block w-full text-left p-2 rounded ${activeTab==="home"?"bg-gray-700":""}`}>🏠 الرئيسية</button>
          <button onClick={() => setActiveTab("tasks")} className={`block w-full text-left p-2 rounded ${activeTab==="tasks"?"bg-gray-700":""}`}>✅ مهامي</button>
          <button onClick={() => setActiveTab("points")} className={`block w-full text-left p-2 rounded ${activeTab==="points"?"bg-gray-700":""}`}>⭐ رصيدي</button>
          <button onClick={() => setActiveTab("settings")} className={`block w-full text-left p-2 rounded ${activeTab==="settings"?"bg-gray-700":""}`}>⚙️ الإعدادات</button>
        </nav>

        <div className="pt-4 border-t border-gray-700">
          {me ? (
            <div>
              <div className="text-sm">مرحباً، <strong>{me.username || me.email}</strong></div>
              <div className="text-xs text-gray-300">نقاط: {me.points ?? 0}</div>
              <button onClick={logout} className="mt-2 w-full bg-red-600 p-2 rounded">تسجيل خروج</button>
            </div>
          ) : (
            <div>
              <div className="text-sm text-gray-300">غير مسجل</div>
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl mb-4">
            {activeTab === "home" && "مرحبًا بك 👋"}
            {activeTab === "tasks" && "قائمة المهام"}
            {activeTab === "points" && "رصيد نقاطك"}
            {activeTab === "settings" && "الإعدادات"}
          </h2>

          <div className="mb-4 text-sm text-red-600">{message}</div>

          {activeTab === "home" && (
            <div className="space-y-4">
              <p>هذه الصفحة الرئيسية. يمكنك تحميل المهام أو تسجيل الدخول من الأسفل.</p>

              {!me && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded shadow">
                    <h3 className="font-semibold mb-2">تسجيل</h3>
                    <input className="w-full p-2 border mb-2" placeholder="اسم المستخدم" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} />
                    <input className="w-full p-2 border mb-2" placeholder="كلمة المرور" type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
                    <button onClick={handleRegister} className="w-full bg-green-600 text-white p-2 rounded">تسجيل</button>
                  </div>

                  <div className="p-4 bg-white rounded shadow">
                    <h3 className="font-semibold mb-2">تسجيل دخول</h3>
                    <input className="w-full p-2 border mb-2" placeholder="اسم المستخدم" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} />
                    <input className="w-full p-2 border mb-2" placeholder="كلمة المرور" type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
                    <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-2 rounded">دخول</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "tasks" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>المهام المتاحة ({tasks.length})</div>
                <button onClick={loadTasks} className="bg-gray-200 px-3 py-1 rounded">تحديث</button>
              </div>

              <div className="space-y-3">
                {loadingTasks && <div>تحميل...</div>}
                {!loadingTasks && tasks.length === 0 && <div className="p-4 bg-white rounded shadow">لا توجد مهام حالياً.</div>}
                {tasks.map((t) => (
                  <div key={t._id} className="p-4 bg-white rounded shadow flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{t.title}</div>
                      <div className="text-xs text-gray-500">+{t.pointsReward} نقطة</div>
                    </div>
                    <button onClick={() => completeTask(t._id)} className="bg-green-600 text-white px-3 py-1 rounded">إكمال</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "points" && (
            <div className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold">رصيدك</h3>
              <div className="text-3xl mt-4">{me ? (me.points ?? 0) : "غير مسجل"}</div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold mb-2">إعدادات</h3>
              <p className="text-sm text-gray-600">ليس هناك إعدادات حالياً.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
  }
