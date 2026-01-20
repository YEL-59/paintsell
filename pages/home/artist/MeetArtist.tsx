"use client";

import Image from "next/image";
import ArtistBG from "@/assets/images/meet-the-artist-banner.png";
import ArtistImg from "@/assets/images/meet-the-artist-img.png";
import { motion } from "framer-motion";

const MeetArtist = () => {
  return (
    <section className="relative overflow-hidden py-30 bg-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={ArtistBG}
          alt="Background Pattern"
          fill
          className="object-cover opacity-60"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          {/* Artist Image Container */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-square overflow-hidden  2xl:h-[850px] xl:h-[700px] lg:h-[600px] md:h-[500px] h-[400px] w-full rounded-sm lg:aspect-4/5">
              <Image
                src={ArtistImg}
                alt="Meet the Artist"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full space-y-8 lg:w-1/2"
          >
            <div className="space-y-4">
              <h2 className="text-5xl font-serif font-semibold tracking-tight text-[#141414] lg:text-6xl">
                Meet The Artist
              </h2>
              <p className="max-w-xl text-base md:text-lg leading-relaxed font-medium text-[#404040] font-lato">
                Meet the artist behind the creations. With a passion for
                storytelling through art, each piece reflects creativity,
                emotion, and refined craftsmanship. Discover the vision that
                brings every artwork to life.
              </p>
            </div>

            <button className="group relative overflow-hidden bg-[#0C2E46] px-10 py-4 text-sm md:text-base cursor-pointer tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#081F30] active:scale-95">
              <span className="relative z-10 transition-colors group-hover:text-white">
                LEARN MORE
              </span>
              <div className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-300 group-hover:translate-x-0" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MeetArtist;
