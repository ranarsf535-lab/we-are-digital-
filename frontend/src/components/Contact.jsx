import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postJSON } from "../api";

const services = [
  { value: "", label: "Select a service..." },
  { value: "meta-tiktok-ads", label: "Meta & TikTok Ads" },
  { value: "shopify", label: "Shopify Development" },
  { value: "wordpress", label: "WordPress Development" },
  { value: "social-media", label: "Social Media Management" },
  { value: "seo", label: "SEO & Digital Marketing" },
  { value: "branding", label: "Branding & Design" },
  { value: "other", label: "Other" },
];

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const mutation = useMutation({
    mutationFn: (data) => postJSON("/api/contact/", data),
    onSuccess: () => {
      setForm({ name: "", email: "", phone: "", company: "", service: "", message: "" });
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="relative py-28 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden" data-aos="fade-up">

      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-3xl rounded-full -top-20 -left-20 animate-float"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full -bottom-20 -right-20 animate-floatSlow"></div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Let's Build Something <span className="text-purple-400">Powerful</span>
          </h2>

          <p className="text-gray-300 text-lg">
            Tell us about your project. We'll get back to you within 24 hours.
          </p>

          <div className="space-y-3 text-gray-400">
            <a href="mailto:we.are.digital09@gmail.com" className="block hover:text-white transition">📧 we.are.digital09@gmail.com</a>
            <p>📍 Society Colony, Sargodha</p>
            <a href="tel:+923157497696" className="block hover:text-white transition">📞 +92 315 7497696</a>
          </div>
        </div>

        {/* RIGHT - FORM */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl transition hover:shadow-purple-600/20">

          <form className="space-y-6" onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="peer w-full bg-transparent border-b border-gray-400 text-white py-2 focus:outline-none focus:border-purple-400"
                />
                <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-purple-400 peer-valid:-top-4 peer-valid:text-xs">
                  Your Name *
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
                  className="peer w-full bg-transparent border-b border-gray-400 text-white py-2 focus:outline-none focus:border-purple-400"
                />
                <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-purple-400 peer-valid:-top-4 peer-valid:text-xs">
                  Email Address *
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="peer w-full bg-transparent border-b border-gray-400 text-white py-2 focus:outline-none focus:border-purple-400"
                />
                <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-purple-400 peer-valid:-top-4 peer-valid:text-xs">
                  Phone Number
                </label>
              </div>

              {/* Company */}
              <div className="relative">
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="peer w-full bg-transparent border-b border-gray-400 text-white py-2 focus:outline-none focus:border-purple-400"
                />
                <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-purple-400 peer-valid:-top-4 peer-valid:text-xs">
                  Company
                </label>
              </div>
            </div>

            {/* Service */}
            <div className="relative">
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-400 text-gray-400 py-2 focus:outline-none focus:border-purple-400 focus:text-white"
              >
                {services.map((s) => (
                  <option key={s.value} value={s.value} className="bg-gray-900">
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                rows="4"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                className="peer w-full bg-transparent border-b border-gray-400 text-white py-2 focus:outline-none focus:border-purple-400 resize-none"
              ></textarea>
              <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-purple-400 peer-valid:-top-4 peer-valid:text-xs">
                Your Message *
              </label>
            </div>

            {/* Button */}
            {mutation.isSuccess ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-3 py-3 text-green-400 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    Message sent! We'll be in touch soon.
                  </div>
                  <button
                    type="button"
                    onClick={() => mutation.reset()}
                    className="w-full py-2 rounded-xl font-medium border border-gray-500 text-gray-300 hover:bg-white/5 transition"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full py-3 rounded-xl font-medium bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600 transition duration-300 shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {mutation.isPending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              )}

            {mutation.isError && (
              <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
            )}

          </form>

        </div>

      </div>

    </div>
  );
}

export default Contact;
