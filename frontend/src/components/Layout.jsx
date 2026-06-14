import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="bg-[#0f172a] text-white min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
