"use client";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

interface CommonBannerProps {
  title: string;
  backgroundImage: string | StaticImageData;
}

const CommonBanner = ({ title, backgroundImage }: CommonBannerProps) => {
  return (
    <section className="relative h-[400px] md:h-[500px] lg:h-[750px] xl:h-[850px] 2xl:h-[950px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative flex h-full items-center justify-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className=" text-5xl md:text-6xl lg:text-[100px] text-white tracking-wide"
        >
          {title}
        </motion.h1>
      </div>
    </section>
  );
};

export default CommonBanner;
