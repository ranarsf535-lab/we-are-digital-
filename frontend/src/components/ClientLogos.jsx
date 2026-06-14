const clients = [
  "TechFlow", "NovaBrand", "PulseCommerce",
  "BrightPath", "ElevateCo", "SummitMedia",
  "FrontierX", "CoreVault",
];

function ClientLogos() {
  return (
    <div className="relative py-16 px-6 bg-gray-950/80 border-y border-white/5">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-8">
          Trusted by innovative brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {clients.map((name) => (
            <div
              key={name}
              className="text-gray-600 text-lg font-semibold tracking-wide hover:text-gray-400 transition-colors duration-300"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClientLogos;
