import { useEffect, useState } from "react";

function Services() {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/services/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load services");
        return res.json();
      })
      .then((data) => setServices(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);


  return (
    <div className="relative py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden" data-aos="fade-up">

      {/* Glow background */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full -top-20 -left-20"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full -bottom-20 -right-20"></div>

      <div className="relative max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold">
          Our Services
        </h2>

        <p className="text-gray-400 mt-4">
          Complete digital solutions for modern businesses
        </p>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {loading && (
            <div className="col-span-full flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <p className="col-span-full text-red-400 text-center py-12">{error}</p>
          )}

          {!loading && !error && services.map((item) => (
            <div
              key={item.id}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 text-left shadow-lg hover:shadow-blue-500/20 hover:-translate-y-2 transition duration-300"
            >
              <div className="text-4xl">{item.icon}</div>

              <h3 className="text-xl font-semibold mt-4">
                {item.title}
              </h3>

              <p className="text-gray-400 mt-2 text-sm">
                {item.description}
              </p>

              <div className="mt-5 text-blue-400 text-sm font-medium cursor-pointer">
                Learn more →
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Services;
