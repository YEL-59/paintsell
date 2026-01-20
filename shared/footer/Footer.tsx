import Image from "next/image";
import Link from "next/link";
import FooterBanner from "@/assets/images/footer-banner.png";
import {
  FacebookSvg,
  InstagramSvg,
  YoutubeSvg,
} from "@/components/svg/MainLayoutSvg";

const Footer = () => {
    const footerNav = [
        {
            title: "Home",
            href: "/"
        },
        {
            title: "Search",
            href: "/search"
        },
        {
            title: "All Products",
            href: "/products"
        },
        {
            title: "Original Works",
            href: "/original-works"
        },
        {
            title: "Event",
            href: "/event"
        },
        {
            title: "Print",
            href: "/print"
        },
        {
            title: "About Us",
            href: "/about"
        },
        {
            title: "Contact Us",
            href: "/contact"
        },
        {
            title: "Privacy Policy",
            href: "/privacy"
        },
        {
            title: "Terms Of Service",
            href: "/terms"
        },
        {
            title: "FAQ",
            href: "/faq"
        },
    ]
  return (
    <footer className="relative w-full overflow-hidden text-white pt-50 pb-10">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={FooterBanner}
          alt="Footer Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20 items-start">
          {/* Brand Section */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <h2 className="text-3xl lg:text-[32px] font-bold tracking-[0.3em] mb-6">
              ARTIS
            </h2>
            <p className="font-lato text-base lg:text-lg  leading-relaxed text-white/80 max-w-sm">
              Brooke Cormier is an accomplished artist, helping creatives
              transform their passion into meaningful and successful work.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-x-8 gap-y-4 lg:px-10">
            {footerNav.map((item, index) => (
                <div key={index} className="flex flex-col gap-4">
              <Link
                href={item.href}
                className="font-lato text-base lg:text-lg hover:text-[#f3c265] transition-colors"
              >
                {item.title}
              </Link>
            </div>
            ))}
          </div>

          {/* Stay Connected Section */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="font-lato text-lg font-medium tracking-wide">
              Stay Connected
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full bg-white/5 border border-white/20 rounded-full px-6 py-3 font-lato text-sm focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>
              <button className="bg-white text-black font-lato text-sm font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
                Subscribe
              </button>
            </div>
            <div className="flex gap-4 mt-2">
              <Link href="#" className="hover:scale-110 transition-transform">
                <FacebookSvg />
              </Link>
              <Link href="#" className="hover:scale-110 transition-transform">
                <InstagramSvg />
              </Link>
              <Link href="#" className="hover:scale-110 transition-transform">
                <YoutubeSvg />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 border-dashed pt-8 text-center">
          <p className="font-lato text-sm lg:text-lg xl:text-xl tracking-widest text-white/60">
            © 2026 design • Art platform built on availability & trust
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
