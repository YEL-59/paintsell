"use client";
import { motion } from "framer-motion";
import BannerImg from "@/assets/images/home-banner.png";
import Link from "next/link";

const Banner = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BannerImg.src})`,
        }}
      >
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Banner Content */}
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] container items-end px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-3xl space-y-6 py-20">
            <motion.h1
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-4xl font-medium tracking-wide text-white sm:text-5xl md:text-6xl lg:text-[100px]"
            >
              Art Collection
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link href={'/products'} className="group relative overflow-hidden bg-white px-8 py-3.5 font-lato cursor-pointer active:scale-95 text-sm sm:text-base font-medium tracking-wide text-[#0C2E46] transition-all duration-300 hover:bg-white/90">
                <span className="relative z-10">SHOP NOW</span>
                <div className="absolute inset-0 -translate-x-full bg-black/5 transition-transform duration-300 group-hover:translate-x-0" />
              </Link>

              <Link href={'/about'} className="group relative overflow-hidden border border-white/40 bg-transparent px-8 py-3.5 font-lato cursor-pointer active:scale-95 text-sm sm:text-base font-medium tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:text-[#0C2E46] hover:bg-white">
                <span className="relative z-10">ARTIST</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <div className="h-12 w-px bg-white/40" />
          <div className="h-2 w-2 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
