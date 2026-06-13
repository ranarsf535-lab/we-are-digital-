import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");

    fetch(`${import.meta.env.VITE_API_URL}/api/contact/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to send");
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => setStatus("error"));
  };

  return (
    <div className="relative py-28 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden" data-aos="fade-up">

      {/* Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full -top-20 -left-20 animate-float"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full -bottom-20 -right-20 animate-floatSlow"></div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT */}
        <div className="space-y-6">
          <h2 className="text-5xl font-bold leading-tight">
            Let’s Build Something <span className="text-blue-400">Powerful</span>
          </h2>

          <p className="text-gray-300 text-lg">
            We help businesses grow through modern web solutions.
            Tell us your idea and we’ll bring it to life.
          </p>

          <div className="space-y-3 text-gray-400">
            <a href="mailto:we.are.digital09@gmail.com" className="block hover:text-white transition">📧 we.are.digital09@gmail.com</a>
            <p>📍 Society Colony, Sargodha</p>
            <a href="tel:+923157497696" className="block hover:text-white transition">📞 +92 315 7497696</a>
          </div>
        </div>

        {/* RIGHT - FORM */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl transition hover:shadow-blue-500/20">

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Name */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="peer w-full bg-transparent border-b border-gray-400 text-white py-2 focus:outline-none focus:border-blue-400"
              />
              <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-400 peer-valid:-top-4 peer-valid:text-xs">
                Your Name
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="peer w-full bg-transparent border-b border-gray-400 text-white py-2 focus:outline-none focus:border-blue-400"
              />
              <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-400 peer-valid:-top-4 peer-valid:text-xs">
                Your Email
              </label>
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                rows="4"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                className="peer w-full bg-transparent border-b border-gray-400 text-white py-2 focus:outline-none focus:border-blue-400"
              ></textarea>
              <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-400 peer-valid:-top-4 peer-valid:text-xs">
                Your Message
              </label>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 rounded-xl font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition duration-300 shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending..." : "Send Message 🚀"}
            </button>

            {status === "success" && (
              <p className="text-green-400 text-sm text-center">Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm text-center">Failed to send. Please try again.</p>
            )}

          </form>

        </div>

      </div>

    </div>
  );
}

export default Contact;