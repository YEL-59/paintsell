"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Instagram, Facebook, Youtube } from "lucide-react";
import CoverImg from "@/assets/images/instragram-banner.png";
import { FacebookSvg, InstagramSvg, RoundInstagramSvg, YoutubeSvg } from "@/components/svg/MainLayoutSvg";

const instagramPosts = [
  {
    id: 1,
    title: "The Of Community with ARTIS",
    date: "08/01/2026",
    description: "Clip taken from the January Full About",
    stats: "50K Views • 340 Likes • 20 Comments",
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=2070&auto=format&fit=crop",
    duration: "05:08",
  },
  {
    id: 2,
    title: "The Of Community with ARTIS",
    date: "08/01/2026",
    description: "Clip taken from the January Full About",
    stats: "50K Views • 340 Likes • 20 Comments",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2090&auto=format&fit=crop",
    duration: "05:08",
  },
  {
    id: 3,
    title: "The Of Community with ARTIS",
    date: "08/01/2026",
    description: "Clip taken from the January Full About",
    stats: "50K Views • 340 Likes • 20 Comments",
    image:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2038&auto=format&fit=crop",
    duration: "05:08",
  },
];

const InstagramSection = () => {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="mb-12 text-center text-5xl text-[#141414] lg:text-6xl">
          Our Art on Instagram
        </h2>

        {/* Profile/Cover Header */}
        <div className="relative mb-16 overflow-hidden rounded-md bg-[#1C1C1C]">
          {/* Cover Background */}
          <div className="relative h-48 w-full md:h-64 lg:h-72">
            <Image
              src={CoverImg}
              alt="Profile Cover"
              fill
              className="object-cover opacity-50"
            />
          </div>

          {/* Profile Overlay */}
          <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-between px-8 md:px-16 lg:px-24">
            <h3 className="text-2xl lg:text-[32px] font-bold tracking-[0.3em] text-white">
              ARTIS
            </h3>

            {/* Avatar (Circle) */}
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white/20 md:h-32 md:w-32 lg:h-44 lg:w-44">
              <Image
                src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=2070&auto=format&fit=crop"
                alt="Profile Avatar"
                fill
                className="object-cover"
              />
            </div>

            {/* Social Handles */}
            <div className="space-y-2 text-right">
              <div className="flex items-center justify-end gap-3 font-medium font-lato text-sm text-white">
                <FacebookSvg /> <span>@biataor</span>
              </div>
              <div className="flex items-center justify-end gap-3 font-medium font-lato text-sm text-white">
                <InstagramSvg /> <span>@biataor</span>
              </div>
              <div className="flex items-center justify-end gap-3 font-medium font-lato text-sm text-white">
                <YoutubeSvg /> <span>@biataor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info Header */}
        <div className="mb-10 flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="font-lato text-2xl font-medium text-[#141414] md:text-[32px]">
              Keshet 12
            </h4>
            <p className="font-lato text-sm font-medium text-[#141414]">
              50K Views • 340 Likes • 20 Comments
            </p>
          </div>

          {/* Instagram Follow Button Badge */}
          <div className="flex items-center font-lato gap-0 overflow-hidden rounded-sm">
            <div className="flex items-center gap-2 bg-[#fe973d] h-[30px] p-[21px] border-none text-base md:text-lg font-bold text-white">
              <RoundInstagramSvg />
              Instagram
            </div>
            <div className="bg-white px-3 py-1.5 text-base md:text-lg font-medium text-[#141414] border-r border-t border-b border-[#141414] rounded-r-sm">
              50K
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {instagramPosts.map((post) => (
            <div key={post.id} className="group cursor-pointer space-y-4">
              {/* Thumbnail Container */}
              <div className="relative aspect-square overflow-hidden bg-gray-100 h-[476px] w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full border-2 border-white/80 bg-black/20 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-4 md:h-5 w-4 md:w-5 fill-white text-white" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 bg-white px-2 py-0.5 text-xs md:text-sm font-bold tracking-wider text-[#141414] font-lato">
                  {post.duration}
                </div>
              </div>

              {/* Description Content */}
              <div className="space-y-1.5 px-1">
                <h5 className="font-lato text-base md:text-lg lg:text-2xl font-medium text-[#141414]">
                  {post.title}
                </h5>
                <p className="font-lato text-sm font-medium text-[#141414]">
                  {post.date}
                </p>
                <p className="font-lato text-sm font-medium text-[#878383]">
                  {post.description}
                </p>
                <p className="font-lato text-sm font-medium text-[#141414] pt-1">
                  {post.stats}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
