"use client";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface SubBannerProps {
  backgroundImage: string | StaticImageData;
  rootPath: string;
  rootLabel: string;
  currentPage: string;
}

const SubBanner = ({
  backgroundImage,
  rootPath,
  rootLabel,
  currentPage,
}: SubBannerProps) => {
  return (
    <section className="relative h-[200px] md:h-[250px] lg:h-[300px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={currentPage}
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay to match the depth of the starry image */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto flex h-full items-center px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="flex items-center gap-2 font-lato text-sm md:text-base lg:text-lg text-white tracking-widest uppercase"
        >
          <Link
            href={rootPath}
            className="opacity-70 hover:opacity-100 transition-opacity duration-300"
          >
            {rootLabel}
          </Link>
          <span className="opacity-30">/</span>
          <span className="relative inline-block border-b border-white/60 pb-1 font-semibold">
            {currentPage}
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default SubBanner;
