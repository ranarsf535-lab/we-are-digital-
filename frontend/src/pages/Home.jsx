import SEO from "../components/SEO";
import Hero from "../components/Hero";
import ClientLogos from "../components/ClientLogos";
import About from "../components/About";
import Stats from "../components/Stats";
import Services from "../components/Services";
import Projects from "../components/Projects";
import CustomerReviews from "../components/CustomerReviews";
import BlogSection from "../components/BlogSection";
import Contact from "../components/Contact";

function Home() {
  return (
    <div>
      <SEO />
      <div id="home"><Hero /></div>
      <ClientLogos />
      <div id="about"><About /></div>
      <div id="stats"><Stats /></div>
      <div id="services"><Services /></div>
      <div id="projects"><Projects /></div>
      <div id="reviews"><CustomerReviews /></div>
      <div id="blog"><BlogSection /></div>
      <div id="contact"><Contact /></div>
    </div>
  );
}

export default Home;
