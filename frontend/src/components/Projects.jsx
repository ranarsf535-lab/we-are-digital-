import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchJSON } from "../api";
import { ProjectSkeleton } from "./Skeleton";

function Projects() {
  const { data: projects, isLoading: loading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchJSON("/api/projects/"),
  });

  return (
    <div
      className="relative py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden"
      data-aos="fade-up"
    >
      <div className="absolute w-[500px] h-[500px] bg-purple-600/10 blur-3xl rounded-full top-40 -right-40"></div>
      <div className="absolute w-[300px] h-[300px] bg-purple-500/10 blur-3xl rounded-full -bottom-20 left-20"></div>

      <div className="relative max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Our Projects
        </h2>

        <p className="text-gray-400 mt-4">
          Some of our recent work and creative solutions
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">

          {loading && (
            <>
              <ProjectSkeleton />
              <ProjectSkeleton />
            </>
          )}

          {error && (
            <p className="col-span-full text-red-400 text-center py-12">{error.message}</p>
          )}

          {!loading && !error && projects.map((item, i) => (
            <div
              key={item.id}
              data-aos="flip-up"
              data-aos-delay={i * 200}
              className="relative group rounded-2xl overflow-hidden shadow-lg border border-white/10 hover:shadow-purple-600/30 transition-shadow duration-300"
            >
              {/* Image */}
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
                />
              ) : (
                <div className="w-full h-72 bg-gray-800 flex items-center justify-center text-gray-500">
                  No image
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition duration-300"></div>

              {/* Metric Badge */}
              {item.metric && (
                <div className="absolute top-4 right-4 bg-purple-600/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  {item.metric}
                </div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 p-6 text-left">
                <h3 className="text-2xl font-semibold">
                  {item.title}
                </h3>

                <p className="text-gray-300 text-sm mt-2">
                  {item.description}
                </p>

                <Link to="/#contact" className="mt-4 text-purple-400 text-sm font-medium block hover:text-purple-300 transition">
                  View Project →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;