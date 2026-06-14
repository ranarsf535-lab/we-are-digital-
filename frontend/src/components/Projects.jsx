import { useQuery } from "@tanstack/react-query";

function Projects() {

  const { data: projects, isLoading: loading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/projects/`).then((r) => {
        if (!r.ok) throw new Error("Failed to load projects");
        return r.json();
      }),
  });

  return (
    <div
      className="relative py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden"
      data-aos="fade-up"
    >
      <div className="absolute w-[500px] h-[500px] bg-purple-600/10 blur-3xl rounded-full top-40 -right-40"></div>
      <div className="absolute w-[300px] h-[300px] bg-purple-500/10 blur-3xl rounded-full -bottom-20 left-20"></div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold">
          Our Projects
        </h2>

        <p className="text-gray-400 mt-4">
          Some of our recent work and creative solutions
        </p>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">

          {loading && (
            <div className="col-span-full flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <p className="col-span-full text-red-400 text-center py-12">{error}</p>
          )}

          {!loading && !error && projects.map((item) => (
            <div
              key={item.id}
              className="relative group rounded-2xl overflow-hidden shadow-lg border border-white/10"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
              />

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

                <a href="#contact" className="mt-4 text-purple-400 text-sm font-medium block hover:text-purple-300 transition">
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;