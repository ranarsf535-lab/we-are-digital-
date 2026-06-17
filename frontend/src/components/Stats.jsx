import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "../api";
import { StatSkeleton } from "./Skeleton";

function Stats() {
  const [count, setCount] = useState({});
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const sectionRef = useRef(null);

  const { data: stats, isLoading: loading } = useQuery({
    queryKey: ["stats"],
    queryFn: () => fetchJSON("/api/homepage/stats/"),
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !stats || stats.length === 0) return;

    setCount(Object.fromEntries(stats.map((s) => [s.key, 0])));

    timerRef.current = setInterval(() => {
      setCount((prev) => {
        const next = { ...prev };
        let allDone = true;
        stats.forEach((item) => {
          const curr = next[item.key] ?? 0;
          if (curr < item.target) {
            next[item.key] = Math.min(curr + (item.key === "satisfaction" ? 5 : 1), item.target);
            allDone = false;
          }
        });
        if (allDone && timerRef.current) clearInterval(timerRef.current);
        return next;
      });
    }, 30);

    return () => clearInterval(timerRef.current);
  }, [visible, stats]);

  return (
    <div ref={sectionRef} className="relative py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden" data-aos="zoom-in">

      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-3xl rounded-full -top-20 -left-20"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full -bottom-20 -right-20"></div>

      <div className="relative max-w-6xl mx-auto text-center">

        <h2 className="text-3xl md:text-4xl font-bold">
          Our Impact in Numbers
        </h2>

        <p className="text-gray-400 mt-4">
          Real results that reflect our growth and client success
        </p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {loading && (
            <>
              <StatSkeleton />
              <StatSkeleton />
              <StatSkeleton />
              <StatSkeleton />
            </>
          )}

          {!loading && stats?.map((item, i) => (
            <div
              key={item.key}
              data-aos="zoom-in"
              data-aos-delay={i * 150}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 text-center shadow-lg hover:shadow-purple-600/20 hover:-translate-y-2 transition duration-300"
            >
              <h2 className={`text-5xl font-bold ${item.color}`}>
                {count[item.key] ?? 0}
                {item.suffix}
              </h2>

              <p className="text-gray-300 mt-3 text-base tracking-wide">
                {item.label}
              </p>

              <p className="text-gray-500 text-xs mt-2">
                ↗ continuously growing
              </p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Stats;
