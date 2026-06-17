import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "../api";
import SEO from "../components/SEO";

function BlogDetail() {
  const { slug } = useParams();
  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => fetchJSON(`/api/blog/${slug}/`),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center gap-4 px-6">
        <h1 className="text-4xl font-bold text-purple-400">404</h1>
        <p className="text-gray-400">Blog post not found.</p>
        <Link to="/blog" className="text-purple-400 hover:underline">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <SEO title={post.title} description={post.excerpt} />
      <div className="pt-28 pb-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="text-purple-400 hover:underline text-sm">&larr; Back to Blog</Link>
          {post.category && (
            <span className="text-purple-400 text-xs uppercase tracking-wider font-semibold ml-4">
              {post.category}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-bold mt-4">{post.title}</h1>
          <p className="text-gray-400 text-sm mt-2">
            {new Date(post.created_at).toLocaleDateString()}
          </p>
          <div className="mt-10 text-gray-300 leading-relaxed space-y-4 whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogDetail;
