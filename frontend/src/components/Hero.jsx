import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "../api";

function Typewriter({ text, speed = 60 }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!text) return;
    setDisplayed("");
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayed}</span>;
}

function Hero() {
  const [index, setIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const { data: hero } = useQuery({
    queryKey: ["hero"],
    queryFn: () => fetchJSON("/api/homepage/hero/"),
  });

  const images = hero?.images || [];

  useEffect(() => {
    images.forEach((src) => { const img = new Image(); img.src = src; });
  }, [images]);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">

      <div
        className="absolute inset-0 transition-opacity duration-700 ease-in-out"
        style={{
          backgroundImage: `url(${images[index] || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `scale(1.1) translateY(${scrollY * 0.35}px)`,
        }}
      />

      <div
        className="absolute inset-0 bg-black/60"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      />

      <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl top-20 left-10 animate-float" />
      <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl bottom-20 right-10 animate-floatSlow" />

      <div
        className="relative text-center text-white px-6 max-w-3xl"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          opacity: Math.max(0, 1 - scrollY / 600),
        }}
      >

        <h1 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg">
          {hero?.title || "Your Gateway to Cutting-Edge Marketing Solutions"}
        </h1>

        <p className="text-purple-400 mt-3 text-xl font-semibold tracking-wide">— WE ARE DIGITAL</p>

        <p className="text-gray-200 mt-6 text-lg min-h-[2rem] drop-shadow">
          <Typewriter text={hero?.subtitle || "From captivating campaigns to strategic social media management — we help businesses thrive in the digital realm."} />
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <Link to="/#contact">
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full font-medium transition hover:shadow-lg hover:shadow-purple-600/40">
              Get Started
            </button>
          </Link>

          <Link to="/#projects">
            <button className="border border-white/30 px-6 py-3 rounded-full hover:bg-white/10 transition">
              View Work
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Hero;
