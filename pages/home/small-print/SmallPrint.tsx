"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";
import WorkCard from "@/components/mainLayout/WorkCard";
import Image from "next/image";

const smallPrints = [
  {
    id: 1,
    title: "Verdant Whispers",
    price: "$2,400",
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Verdant Whispers",
    price: "$2,400",
    image:
      "https://images.unsplash.com/photo-1554188248-986adbb73be4?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Verdant Whispers",
    price: "$2,400",
    image:
      "https://images.unsplash.com/photo-1501472312651-726afe119ff1?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Verdant Whispers",
    price: "$2,400",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2090&auto=format&fit=crop",
  },
];

const SmallPrint = () => {
  return (
    <section className="bg-[#F8F8F8] py-15 md:py-30">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="relative mb-10 flex flex-col items-center justify-center gap-6 md:flex-row md:justify-between">
          <div className="hidden md:block md:w-[150px]" /> {/* Spacer */}
          <h2 className="text-center font-serif text-5xl text-[#141414] lg:text-6xl">
            Our Art Small Print
          </h2>
          <div className="flex md:w-[180px] justify-end">
            <Link
              href="/prints"
              className="group flex items-center gap-3 text-[13px] font-bold font-lato tracking-[0.2em] text-[#141414] transition-colors"
            >
              VIEW ALL PRINT
              <MoveRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-x-8 gap-x-4 lg:gap-y-16 gap-y-10">
          {smallPrints.map((work) => (
                <div className="group cursor-pointer">
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden mb-5 border-14 border-white bg-[#F9F9F9] lg:h-[430px] md:h-[280px] h-[200px] w-full">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
            
                  {/* Text Content */}
                  <div className="text-center">
                    <h3 className="text-base md:text-lg lg:text-2xl font-bold font-lato text-[#141414] tracking-wide mb-1">
                      {work.title}
                    </h3>
                    <p className="text-base lg:text-lg font-medium font-lato text-[#141414]">
                      {work.price}
                    </p>
                  </div>
                </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmallPrint;
