import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "../api";
import { BlogSkeleton } from "./Skeleton";

function BlogSection() {
  const { data: posts, isLoading: loading, error } = useQuery({
    queryKey: ["blog"],
    queryFn: () => fetchJSON("/api/blog/?limit=3"),
  });

  return (
    <div className="relative py-24 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden" data-aos="fade-up">

      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-3xl md:text-4xl font-bold">Latest Insights</h2>
        <p className="text-gray-400 mt-4">Tips, strategies, and news from our team</p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">

          {loading && (
            <>
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
            </>
          )}

          {error && (
            <p className="col-span-full text-red-400 text-center py-12">{error.message}</p>
          )}

          {!loading && !error && posts.map((post, i) => (
            <div
              key={post.id}
              data-aos="fade-up"
              data-aos-delay={i * 150}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-left hover:bg-white/10 hover:-translate-y-2 hover:shadow-purple-600/30 hover:shadow-lg transition duration-300"
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
              <Link to={`/blog/${post.slug}`} className="text-purple-400 text-sm font-medium mt-5 block hover:text-purple-300 transition">
                Read More →
              </Link>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default BlogSection;
