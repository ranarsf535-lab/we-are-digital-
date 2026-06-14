import { useQuery } from "@tanstack/react-query";

function BlogSection() {

  const { data: posts, isLoading: loading, error } = useQuery({
    queryKey: ["blog"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/blog/`).then((r) => {
        if (!r.ok) throw new Error("Failed to load blog posts");
        return r.json();
      }),
  });

  return (
    <div className="relative py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden" data-aos="fade-up">

      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-3xl md:text-4xl font-bold">Latest Insights</h2>
        <p className="text-gray-400 mt-4">Tips, strategies, and news from our team</p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">

          {loading && (
            <div className="col-span-full flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <p className="col-span-full text-red-400 text-center py-12">{error}</p>
          )}

          {!loading && !error && posts.map((post) => (
            <div
              key={post.id}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-left hover:bg-white/10 hover:-translate-y-2 transition duration-300"
            >
              {post.category && (
                <span className="text-purple-400 text-xs uppercase tracking-wider font-semibold">
                  {post.category}
                </span>
              )}
              <h3 className="text-lg font-semibold mt-2 leading-snug">
                {post.title}
              </h3>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                {post.excerpt}
              </p>
              <p className="text-purple-400 text-sm font-medium mt-5 cursor-pointer hover:text-purple-300 transition">
                Read More →
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default BlogSection;
