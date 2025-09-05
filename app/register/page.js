// داخل app/register/page.js (client component)
const handleRegister = async (e) => {
  e.preventDefault();
  setMessage("⏳ Processing...");

  try {
    console.log("Sending register request:", { username, email, password });
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    console.log("Response status:", res.status);
    const text = await res.text();
    console.log("Raw response text:", text);

    let data;
    try { data = JSON.parse(text); } catch (ex) { data = { ok: false, message: text }; }

    console.log("Parsed response:", data);
    setMessage(data.message || (data.error || "No message returned"));

  } catch (err) {
    console.error("Register client error:", err);
    setMessage("⚠️ Something went wrong (client). See console.");
  }
};
