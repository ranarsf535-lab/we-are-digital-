function About() {
  return (
    <div className="relative py-28 px-6 bg-gray-950 text-white overflow-hidden" data-aos="fade-right">

      {/* Subtle top-right glow only */}
      <div className="absolute w-[450px] h-[450px] bg-purple-600/10 blur-3xl rounded-full -top-40 -right-40"></div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT SIDE - CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Who We Are at{" "}
            <span className="text-purple-400">WE ARE DIGITAL</span>
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
            {[
              { icon: "⚡", title: "Fast Execution", desc: "Efficient delivery without compromising quality." },
              { icon: "🎨", title: "Creative Design", desc: "Modern UI/UX built for real users." },
              { icon: "🚀", title: "Scalable Systems", desc: "Built to grow with your business." },
              { icon: "🤝", title: "Client Focus", desc: "Your success is our priority." },
            ].map((f, i) => (
              <div
                key={f.title}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="backdrop-blur-lg bg-white/10 border border-white/20 p-5 rounded-xl hover:shadow-purple-600/20 transition"
              >
                <h4 className="font-semibold">{f.icon} {f.title}</h4>
                <p className="text-sm text-gray-400 mt-1">{f.desc}</p>
              </div>
            ))}
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

      {/* TEAM SECTION */}
      <div className="relative max-w-6xl mx-auto mt-24 text-center">
        <h3 className="text-2xl md:text-3xl font-bold">Meet the Team</h3>
        <p className="text-gray-400 mt-3">The people behind the pixels</p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { name: "Rana Sufyan", role: "Founder & CEO", img: "/images/avatar-1.jpg" },
            { name: "Ayesha Khan", role: "Creative Director", img: "/images/avatar-2.jpg" },
            { name: "Usman Ali", role: "Lead Developer", img: "/images/avatar-3.jpg" },
            { name: "Fatima Zara", role: "Social Media Manager", img: "/images/avatar-4.jpg" },
            { name: "Hassan Raza", role: "SEO Specialist", img: "/images/avatar-5.jpg" },
            { name: "Zainab Noor", role: "UI/UX Designer", img: "/images/avatar-6.jpg" },
          ].map((member, i) => (
            <div
              key={member.name}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition duration-300"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-20 h-20 rounded-full object-cover mx-auto"
              />
              <h4 className="font-semibold mt-4">{member.name}</h4>
              <p className="text-gray-400 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default About;