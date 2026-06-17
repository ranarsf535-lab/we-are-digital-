import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchJSON } from "../api";
import { CardSkeleton } from "./Skeleton";

function Services() {
  const { data: services, isLoading: loading, error } = useQuery({
    queryKey: ["services"],
    queryFn: () => fetchJSON("/api/services/"),
  });

  const gridClass = "mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8";

  return (
    <div className="relative py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden" data-aos="fade-up">

      <div className="absolute w-[500px] h-[500px] bg-purple-600/15 blur-3xl rounded-full -top-40 right-20"></div>

      <div className="relative max-w-6xl mx-auto text-center">

        <h2 className="text-3xl md:text-4xl font-bold">
          Our Services
        </h2>

        <p className="text-gray-400 mt-4">
          Complete digital solutions for modern businesses
        </p>

        <div className={gridClass}>

          {loading && (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          )}

          {error && (
            <p className="col-span-full text-red-400 text-center py-12">{error.message}</p>
          )}

          {!loading && !error && services.map((item, i) => (
            <div
              key={item.id}
              data-aos="zoom-in"
              data-aos-delay={i * 150}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 text-left shadow-lg hover:shadow-purple-600/40 hover:-translate-y-2 transition duration-300"
            >
              <div className="text-4xl">{item.icon}</div>

              <h3 className="text-xl font-semibold mt-4">
                {item.title}
              </h3>

              <p className="text-gray-400 mt-2 text-sm">
                {item.description}
              </p>

              <Link to="/#contact" className="mt-5 text-purple-400 text-sm font-medium block hover:text-purple-300 transition">
                Learn more →
              </Link>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Services;
