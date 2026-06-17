import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "./BackToTop";

function Layout() {
  const { pathname, hash } = useLocation();
  const inited = useRef(false);

  useEffect(() => {
    if (!inited.current) {
      AOS.init({ duration: 1000, once: true, easing: "ease-out", offset: 120 });
      inited.current = true;
    }
  }, []);

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash.replace("#", ""));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className="bg-[#0f172a] text-white min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
      <BackToTop />
    </div>
  );
}

export default Layout;
