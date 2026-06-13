import { useEffect, useState } from "react";

function Stats() {
  const [stats, setStats] = useState([]);
  const [count, setCount] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/homepage/stats/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load stats");
        return res.json();
      })
      .then((data) => {
        setStats(data);
        const initial = {};
        data.forEach((item) => { initial[item.key] = 0; });
        setCount(initial);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (stats.length === 0) return;
    const interval = setInterval(() => {
      setCount((prev) => {
        const updated = { ...prev };
        stats.forEach((item) => {
          if (updated[item.key] < item.target) {
            updated[item.key] += item.key === "satisfaction" ? 5 : 1;
          }
        });
        return updated;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [stats]);

  return (
    <div className="relative py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden" data-aos="zoom-in">

      {/* Glow effects (same system as About/Contact) */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full -top-20 -left-20"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full -bottom-20 -right-20"></div>

      <div className="relative max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold">
          Our Impact in Numbers
        </h2>

        <p className="text-gray-400 mt-4">
          Real results that reflect our growth and client success
        </p>

        {/* Stats Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {loading && (
            <div className="col-span-full flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {!loading && stats.map((item) => (
            <div
              key={item.key}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 text-center shadow-lg hover:shadow-blue-500/20 hover:-translate-y-2 transition duration-300"
            >
              <h2 className={`text-5xl font-bold ${item.color}`}>
                {count[item.key] || 0}
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
