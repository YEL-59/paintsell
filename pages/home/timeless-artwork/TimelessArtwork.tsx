"use client";

import Link from "next/link";
import Image from "next/image";
import BannerImg from "@/assets/images/artwork-banner.png"

const TimelessArtwork = () => {
  return (
    <section className="pb-15 md:pb-30">
      <div className="container mx-auto px-4">
        <div className="relative h-[400px] md:h-[450px] lg:h-[590px] w-full overflow-hidden rounded-[20px] md:rounded-[28px] shadow-2xl">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={BannerImg}
              alt="Timeless Artwork Background"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
            <h2 className="mb-6 text-5xl md:text-6xl text-white ">
              Own a Timeless Artwork
            </h2>
            <p className="mb-10 max-w-2xl font-lato text-base md:text-lg text-white font-medium">
              Art that stands the test of time, inspiring generations.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <Link
                href="/gallery"
                className="inline-flex h-12 md:h-14 items-center justify-center bg-[#f3c265] px-8 md:px-10 font-lato text-sm md:text-base cursor-pointer active:scale-95 tracking-[0.2em] text-[#141414] transition-all hover:bg-[#E2AF5B]"
              >
                BROWS GALLERY
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 md:h-14 items-center justify-center border border-[#EEE] active:scale-95 px-8 md:px-10 font-lato text-sm md:text-base tracking-[0.2em] text-[#EEE] transition-all hover:bg-white hover:text-[#141414]"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelessArtwork;
