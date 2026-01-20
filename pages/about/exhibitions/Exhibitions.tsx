"use client";

import Image from "next/image";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import ExhibitBG from "@/assets/images/footer-banner.png";
import ExhibitArtist from "@/assets/images/meet-the-artist-img.png";

const exhibitionData = [
  {
    id: 1,
    location: "The Hara Art Gallery, Israel",
    date: "15th-22th May 2025",
  },
  {
    id: 2,
    location: "The Hara Art Gallery, Israel",
    date: "15th-22th May 2025",
  },
  {
    id: 3,
    location: "The Hara Art Gallery, Israel",
    date: "15th-22th May 2025",
  },
  {
    id: 4,
    location: "The Hara Art Gallery, Israel",
    date: "15th-22th May 2025",
  },
  {
    id: 5,
    location: "The Hara Art Gallery, Israel",
    date: "15th-22th May 2025",
  },
  {
    id: 6,
    location: "The Hara Art Gallery, Israel",
    date: "15th-22th May 2025",
  },
];

const Exhibitions = () => {
  return (
    <section className="relative min-h-screen overflow-hidden py-24 lg:py-32">
      {/* Dark Textured Background */}
      <div className="absolute inset-0 z-0 bg-[#1A1A1A]">
        <Image
          src={ExhibitBG}
          alt="Exhibition Background"
          fill
          className="object-cover opacity-30 mix-blend-overlay grayscale"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#1A1A1A]/80 via-transparent to-[#1A1A1A]/80" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column: List of Exhibitions */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <h2 className="mb-16 font-serif text-5xl text-white lg:text-7xl">
              Exhibitions
            </h2>

            <div className="flex flex-col">
              {exhibitionData.map((item, index) => (
                <div key={item.id} className="group flex flex-col">
                  {/* Top Separator for the first item */}
                  {index === 0 && <div className="h-px w-full bg-white/20" />}

                  <div className="flex items-center justify-between py-8 transition-colors duration-300">
                    <div className="flex items-center gap-4">
                      {/* Active Bullet Style */}
                      <div
                        className={`h-2 w-2 rounded-full ${index === 0 ? "bg-white" : "bg-white/40"}`}
                      />
                      <p
                        className={`font-lato text-base lg:text-lg tracking-wide ${index === 0 ? "text-white" : "text-white/60"}`}
                      >
                        {item.location}{" "}
                        <span className="ml-1 opacity-80">{item.date}</span>
                      </p>
                    </div>

                    <MoveRight
                      className={`h-6 w-10 transition-all duration-300 ${index === 0 ? "text-white translate-x-0" : "text-white/40 group-hover:text-white group-hover:translate-x-2"}`}
                    />
                  </div>

                  {/* Separator */}
                  <div className="h-px w-full bg-white/20" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Artist Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-[600px] w-full lg:h-[800px]"
          >
            <div className="relative h-full w-full overflow-hidden shadow-2xl">
              <Image
                src={ExhibitArtist}
                alt="Angela in Exhibition"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
            {/* Subtle Overlay to match the art look */}
            <div className="absolute inset-0 ring-1 ring-white/10 ring-inset" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Exhibitions;
