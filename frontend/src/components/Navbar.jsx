import { useEffect, useState } from "react";

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy (active section tracking)
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

        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="h-9 w-9 flex items-center justify-center bg-gray-800 rounded-lg overflow-hidden">
            <img src="/images/logo_final.png" alt="WE ARE DIGITAL" className="h-full w-full object-cover" />
          </div>
          <h1 className="text-white font-bold text-lg tracking-wide">WE ARE DIGITAL</h1>
        </a>

        {/* Desktop Menu */}
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
            activeSection === "contact" ? "text-white font-semibold" : "text-gray-300"
          }`}>
            <a href="#contact">Contact</a>
          </li>

        </ul>

        {/* Hamburger */}
        <div
          className="md:hidden text-white text-2xl cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          ☰
        </div>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden backdrop-blur-xl bg-black/80 border-t border-white/10 px-6 py-6 space-y-4 text-gray-300">

          <p><a href="#home">Home</a></p>
          <p><a href="#about">About</a></p>
          <p><a href="#services">Services</a></p>
          <p><a href="#projects">Projects</a></p>
          <p><a href="#contact">Contact</a></p>

          <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg">
            Get Started
          </button>

        </div>
      )}

    </nav>
  );
}

export default Navbar;
