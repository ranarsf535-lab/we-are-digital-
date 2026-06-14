import { useEffect, useState } from "react";

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("div[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-black/60 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        <a href="#home" className="flex items-center gap-3">
          <div className="h-9 w-9 flex items-center justify-center bg-gray-800 rounded-lg overflow-hidden">
            <img src="/images/logo_final.png" alt="WE ARE DIGITAL" className="h-full w-full object-cover" />
          </div>
          <h1 className="text-white font-bold text-lg tracking-wide hidden sm:block">WE ARE DIGITAL</h1>
        </a>

        <ul className="hidden md:flex gap-8 text-sm">
          <li className={`transition cursor-pointer ${
            activeSection === "home" ? "text-white font-semibold" : "text-gray-300"
          }`}>
            <a href="#home">Home</a>
          </li>
          <li className={`transition cursor-pointer ${
            activeSection === "about" ? "text-white font-semibold" : "text-gray-300"
          }`}>
            <a href="#about">About</a>
          </li>
          <li className={`transition cursor-pointer ${
            activeSection === "services" ? "text-white font-semibold" : "text-gray-300"
          }`}>
            <a href="#services">Services</a>
          </li>
          <li className={`transition cursor-pointer ${
            activeSection === "projects" ? "text-white font-semibold" : "text-gray-300"
          }`}>
            <a href="#projects">Projects</a>
          </li>
          <li className={`transition cursor-pointer ${
            activeSection === "blog" ? "text-white font-semibold" : "text-gray-300"
          }`}>
            <a href="#blog">Blog</a>
          </li>
          <li className={`transition cursor-pointer ${
            activeSection === "contact" ? "text-white font-semibold" : "text-gray-300"
          }`}>
            <a href="#contact">Contact</a>
          </li>
        </ul>

        <div
          className="md:hidden text-white text-2xl cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          ☰
        </div>

      </div>

      <div
        className={`md:hidden backdrop-blur-xl bg-black/80 border-t border-white/10 px-6 space-y-4 text-gray-300 overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-80 py-6 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        <p><a href="#home" onClick={() => setOpen(false)}>Home</a></p>
        <p><a href="#about" onClick={() => setOpen(false)}>About</a></p>
        <p><a href="#services" onClick={() => setOpen(false)}>Services</a></p>
        <p><a href="#projects" onClick={() => setOpen(false)}>Projects</a></p>
        <p><a href="#blog" onClick={() => setOpen(false)}>Blog</a></p>
        <p><a href="#contact" onClick={() => setOpen(false)}>Contact</a></p>

        <a
          href="#contact"
          className="block w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-center"
          onClick={() => setOpen(false)}
        >
          Get Started
        </a>
      </div>

    </nav>
  );
}

export default Navbar;
