import Hero from "../components/Hero";
import ClientLogos from "../components/ClientLogos";
import Stats from "../components/Stats";
import CustomerReviews from "../components/CustomerReviews";

function Home() {
  return (
    <div>
      <Hero />
      <ClientLogos />
      <Stats />
      <CustomerReviews />
    </div>
  );
}

export default Home;
