function About() {
  return (
    <div className="relative py-28 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden" data-aos="fade-right">

      {/* Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full -top-20 -left-20 animate-float"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full -bottom-20 -right-20 animate-floatSlow"></div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT SIDE - CONTENT */}
        <div>
          <h2 className="text-5xl font-bold leading-tight">
            Who We Are at{" "}
            <span className="text-blue-400">WE ARE DIGITAL</span>
          </h2>

          <p className="text-gray-300 mt-6 text-lg">
            Your gateway to cutting-edge marketing solutions. From captivating
            campaigns to strategic social media management, we help businesses
            thrive in the digital realm.
          </p>

          <p className="text-gray-400 mt-4">
            We specialize in Meta & TikTok ad campaigns, Shopify & WordPress
            development, and complete digital branding — tailored to grow your
            business online.
          </p>

          {/* FEATURES */}
          <div className="mt-10 grid grid-cols-2 gap-6">

            <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-5 rounded-xl hover:shadow-blue-500/20 transition">
              <h4 className="font-semibold">⚡ Fast Execution</h4>
              <p className="text-sm text-gray-400 mt-1">
                Efficient delivery without compromising quality.
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-5 rounded-xl hover:shadow-purple-500/20 transition">
              <h4 className="font-semibold">🎨 Creative Design</h4>
              <p className="text-sm text-gray-400 mt-1">
                Modern UI/UX built for real users.
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-5 rounded-xl hover:shadow-blue-500/20 transition">
              <h4 className="font-semibold">🚀 Scalable Systems</h4>
              <p className="text-sm text-gray-400 mt-1">
                Built to grow with your business.
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-5 rounded-xl hover:shadow-purple-500/20 transition">
              <h4 className="font-semibold">🤝 Client Focus</h4>
              <p className="text-sm text-gray-400 mt-1">
                Your success is our priority.
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE - IMAGE + FLOAT CARD */}
        <div className="relative">

          <img
            src="/images/about.jpg"
            alt="about"
            className="rounded-2xl shadow-2xl"
          />

          {/* Floating Card */}
          <div className="absolute -bottom-8 -left-8 backdrop-blur-lg bg-white/10 border border-white/20 p-5 rounded-xl shadow-lg">
            <p className="text-sm text-gray-300">🚀 Growing Agency</p>
            <p className="text-xl font-bold text-white">Social Media Agency</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default About;