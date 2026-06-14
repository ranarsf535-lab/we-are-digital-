import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ClientLogos from "./components/ClientLogos";
import Services from "./components/Services";
import About from "./components/About";
import Stats from "./components/Stats";
import Projects from "./components/Projects";
import CustomerReviews from "./components/CustomerReviews";
import BlogSection from "./components/BlogSection";
import Contact from "./components/Contact";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
      offset: 120,
    });
  }, []);

  return (
    <div className="bg-[#0f172a] text-white min-h-screen">

      <Navbar />

      <div id="home">
        <Hero />
      </div>

      <div id="about">
        <About />
      </div>

      <ClientLogos />

      <div id="stats">
        <Stats />
      </div>

      <div id="services">
        <Services />
      </div>

      <div id="projects">
        <Projects />
      </div>

      <div id="reviews">
        <CustomerReviews />
      </div>

      <div id="blog">
        <BlogSection />
      </div>

      <div id="contact">
        <Contact />
      </div>

      <Footer />

      <BackToTop />

    </div>
  );
}

export default App;
