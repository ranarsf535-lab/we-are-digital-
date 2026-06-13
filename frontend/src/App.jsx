import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Stats from "./components/Stats";
import Projects from "./components/Projects";
import CustomerReviews from "./components/CustomerReviews";
import Contact from "./components/Contact";
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

      <div id="home" className="scroll-mt-18">
        <Hero />
      </div>

      <div id="about" className="scroll-mt-18">
        <About />
      </div>

      <div id="stats" className="scroll-mt-18">
        <Stats />
      </div>

      <div id="services" className="scroll-mt-18">
        <Services />
      </div>

      <div id="projects" className="scroll-mt-18">
        <Projects />
      </div>

      <div id="reviews" className="scroll-mt-18">
        <CustomerReviews />
      </div>

      <div id="contact" className="scroll-mt-18">
        <Contact />
      </div>

      <Footer />

    </div>
  );
}

export default App;