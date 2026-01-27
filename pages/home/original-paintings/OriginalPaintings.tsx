"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";
import { MoveLeft, MoveRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const paintings = [
  {
    id: 1,
    image:
      "https://img.freepik.com/premium-photo/drawing-plant-with-sun-it_1320300-7204.jpg?uid=R191150260&ga=GA1.1.766574978.1765429508&semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2080&auto=format&fit=crop",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1976&auto=format&fit=crop",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2038&auto=format&fit=crop",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 6,
    image:
      "https://img.freepik.com/premium-photo/drawing-plant-with-sun-it_1320300-7204.jpg?uid=R191150260&ga=GA1.1.766574978.1765429508&semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2080&auto=format&fit=crop",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1976&auto=format&fit=crop",
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2038&auto=format&fit=crop",
  },
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=2070&auto=format&fit=crop",
  },
];

const OriginalPaintings = () => {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  return (
    <section className="py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <h2 className="mb-20 text-center font-serif text-5xl text-[#141414] lg:text-7xl">
          Original Paintings
        </h2>

        {/* Swiper Slider */}
        <div className="relative mx-auto container">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={true}
            speed={1000}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: -150,
              depth: 200,
              modifier: 1,
              slideShadows: true,
            }}
            navigation={{
              prevEl: prevEl,
              nextEl: nextEl,
            }}
            onSwiper={(swiper) => {
              // Ensure navigation is properly updated once elements are available
              setTimeout(() => {
                if (swiper.navigation && swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                  swiper.params.navigation.prevEl = prevEl;
                  swiper.params.navigation.nextEl = nextEl;
                  swiper.navigation.destroy();
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
              });
            }}

            modules={[EffectCoverflow, Autoplay, Navigation]}
            className="original-paintings-swiper pb-20!"
          >
            {paintings?.map((painting, index) => (
              <SwiperSlide
                key={`${painting.id}-${index}`}
                className="w-[300px]! md:w-[350px]! lg:w-[380px]!"
              >
                <div className="card-container relative h-[450px] md:h-[550px] lg:h-[650px] overflow-hidden rounded-[40px] transition-all duration-500">
                  <Image
                    src={painting.image}
                    alt="Original Painting"
                    fill
                    className="object-cover"
                  />
                  {/* Subtle inner shadow to match the artistic look */}
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-black/20 to-transparent" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              ref={(node) => setPrevEl(node)}
              className="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-[#0C2E46]/30 text-[#0C2E46] transition-all duration-300 hover:border-[#0C2E46] hover:bg-[#0C2E46] hover:text-white"
            >
              <MoveLeft className="h-6 w-6" />
            </button>
            <button
              ref={(node) => setNextEl(node)}
              className="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#0C2E46] text-white transition-all duration-300 hover:bg-[#141414] shadow-lg"
            >
              <MoveRight className="h-6 w-6" />
            </button>
          </div>

        </div>
      </div>

      <style jsx global>{`
        .original-paintings-swiper {
          perspective: 600px;
        }
        .original-paintings-swiper .swiper-slide {
          opacity: 0.5;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
        }
        .original-paintings-swiper .swiper-slide-active {
          opacity: 1;
          z-index: 100;
        }
        .original-paintings-swiper .swiper-slide-prev,
        .original-paintings-swiper .swiper-slide-next {
          opacity: 1;
          z-index: 50;
        }
        /* Refined shadows for the 3D fold look */
        .original-paintings-swiper .swiper-slide-shadow-left {
          background-image: linear-gradient(
            to left,
            rgba(0, 0, 0, 0.4),
            rgba(0, 0, 0, 0)
          ) !important;
        }
        .original-paintings-swiper .swiper-slide-shadow-right {
          background-image: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.4),
            rgba(0, 0, 0, 0)
          ) !important;
        }
        .original-paintings-swiper .swiper-slide-shadow-left,
        .original-paintings-swiper .swiper-slide-shadow-right {
          border-radius: 40px;
        }
      `}</style>
    </section>
  );
};

export default OriginalPaintings;
