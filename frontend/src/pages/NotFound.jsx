import { Link } from "react-router-dom";
import SEO from "../components/SEO";

function NotFound() {
  return (
    <>
      <SEO title="404 — Page Not Found" />
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-6">
        <h1 className="text-6xl font-bold text-purple-400">404</h1>
        <p className="text-gray-400 text-lg">Page not found</p>
        <Link
          to="/"
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full font-medium transition"
        >
          Back Home
        </Link>
      </div>
    </>
  );
}

export default NotFound;
