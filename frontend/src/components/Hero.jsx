import { useEffect, useState } from "react";

function Hero() {
  const [hero, setHero] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/homepage/hero/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load hero");
        return res.json();
      })
      .then((data) => setHero(data))
      .catch(() => {});
  }, []);

  const images = hero?.images || [];

  // Preload images
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  // Auto slider
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden" data-aos="fade-up">

      {/* BACKGROUND SLIDER */}
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center scale-110 transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* FLOATING GLOW ELEMENTS */}
      <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-20 left-10 animate-float"></div>
      <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl bottom-20 right-10 animate-floatSlow"></div>

      {/* CONTENT */}
      <div className="relative text-center text-white px-6 max-w-3xl">

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          {hero?.title || "Your Gateway to Cutting-Edge Marketing Solutions"}
        </h1>

        <p className="text-blue-400 mt-3 text-xl font-semibold tracking-wide">— WE ARE DIGITAL</p>

        <p className="text-gray-200 mt-6 text-lg">
          {hero?.subtitle || "From captivating campaigns to strategic social media management — we help businesses thrive in the digital realm."}
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full font-medium transition">
            Get Started
          </button>

          <button className="border border-white/30 px-6 py-3 rounded-full hover:bg-white/10 transition">
            View Work
          </button>
        </div>

      </div>
    </div>
  );
}

export default Hero;