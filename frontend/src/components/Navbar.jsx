import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/#contact" },
];

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = document.querySelectorAll("div[id]:not(#root)");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.6 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-black/60 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-9 w-9 flex items-center justify-center bg-gray-800 rounded-lg overflow-hidden">
            <img src="/images/logo_final.png" alt="WE ARE DIGITAL" className="h-full w-full object-cover" />
          </div>
          <h1 className="text-white font-bold text-lg tracking-wide hidden sm:block">WE ARE DIGITAL</h1>
        </Link>

        <ul className="hidden md:flex gap-8 text-sm">
          {links.map((link) => {
            const section = link.href.replace("/#", "") || "home";
            const isActive = isHome && activeSection === section;
            return (
              <li
                key={link.label}
                className={`transition cursor-pointer ${
                  isActive ? "text-white font-semibold" : "text-gray-300"
                }`}
              >
                <Link to={link.href}>{link.label}</Link>
              </li>
            );
          })}
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
        {links.map((link) => (
          <p key={link.label}>
            <Link to={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          </p>
        ))}
        <Link
          to="/#contact"
          className="block w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-center"
          onClick={() => setOpen(false)}
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
