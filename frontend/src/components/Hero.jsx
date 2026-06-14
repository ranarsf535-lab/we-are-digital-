import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

function Hero() {
  const [index, setIndex] = useState(0);

  const { data: hero } = useQuery({
    queryKey: ["hero"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/homepage/hero/`).then((r) => {
        if (!r.ok) throw new Error("Failed to load hero");
        return r.json();
      }),
  });

  const images = hero?.images || [];

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden" data-aos="fade-up">

      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center scale-110 transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl top-20 left-10 animate-float"></div>
      <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl bottom-20 right-10 animate-floatSlow"></div>

      <div className="relative text-center text-white px-6 max-w-3xl">

        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          {hero?.title || "Your Gateway to Cutting-Edge Marketing Solutions"}
        </h1>

        <p className="text-purple-400 mt-3 text-xl font-semibold tracking-wide">— WE ARE DIGITAL</p>

        <p className="text-gray-200 mt-6 text-lg">
          {hero?.subtitle || "From captivating campaigns to strategic social media management — we help businesses thrive in the digital realm."}
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <a href="#contact">
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full font-medium transition">
              Get Started
            </button>
          </a>

          <a href="#projects">
            <button className="border border-white/30 px-6 py-3 rounded-full hover:bg-white/10 transition">
              View Work
            </button>
          </a>
        </div>

      </div>
    </div>
  );
}

export default Hero;
