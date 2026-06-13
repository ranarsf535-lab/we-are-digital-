import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative bg-black text-white py-20 px-6 overflow-hidden">

      {/* Glow background */}
      <div className="absolute w-[450px] h-[450px] bg-purple-600/10 blur-3xl rounded-full -top-20 -left-20"></div>
      <div className="absolute w-[350px] h-[350px] bg-purple-500/10 blur-3xl rounded-full -bottom-20 -right-20"></div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex items-center justify-center bg-gray-800 rounded-lg overflow-hidden">
              <img src="/images/logo_final.png" alt="WE ARE DIGITAL" className="h-full w-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold">WE ARE DIGITAL</h2>
          </div>

          <p className="text-gray-400 mt-4 text-sm leading-relaxed">
            Your gateway to cutting-edge marketing solutions. From captivating
            campaigns to strategic social media management, we help businesses
            thrive in the digital realm.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">

            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-gray-300 hover:text-white hover:bg-purple-600/30 transition cursor-pointer">
              <FaFacebookF size={14} />
            </div>

            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-gray-300 hover:text-white hover:bg-pink-500/30 transition cursor-pointer">
              <FaInstagram size={14} />
            </div>

            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-gray-300 hover:text-white hover:bg-purple-500/30 transition cursor-pointer">
              <FaLinkedinIn size={14} />
            </div>

            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-gray-300 hover:text-white hover:bg-sky-500/30 transition cursor-pointer">
              <FaTwitter size={14} />
            </div>

          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white transition cursor-pointer">Home</li>
            <li className="hover:text-white transition cursor-pointer">Services</li>
            <li className="hover:text-white transition cursor-pointer">Projects</li>
            <li className="hover:text-white transition cursor-pointer">About</li>
            <li className="hover:text-white transition cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Meta & TikTok Ads</li>
            <li>Shopify Development</li>
            <li>WordPress Development</li>
            <li>Social Media Management</li>
            <li>SEO & Digital Marketing</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>

          <a href="mailto:we.are.digital09@gmail.com" className="text-gray-400 text-sm hover:text-white transition">📧 we.are.digital09@gmail.com</a>
          <p className="text-gray-400 text-sm mt-2">📍 Society Colony, Sargodha</p>
          <a href="tel:+923157497696" className="text-gray-400 text-sm mt-2 block hover:text-white transition">📞 +92 315 7497696</a>

          <div className="mt-6 text-gray-500 text-xs">
            Available for freelance & full-time projects
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="relative mt-14 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-3">

        <p>© {new Date().getFullYear()} WE ARE DIGITAL. All rights reserved.</p>

        <p className="text-gray-600">
          Built with React + Tailwind
        </p>

      </div>

    </footer>
  );
}

export default Footer;