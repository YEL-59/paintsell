import Link from "next/link";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { IProduct } from "@/types";

const SmallPrint = ({ smallPrintsData }: { smallPrintsData: IProduct[] }) => {
  return (
    <section className="bg-[#F8F8F8] py-15 md:py-30">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="relative mb-10 flex flex-col items-center justify-center gap-6 md:flex-row md:justify-between">
          <div className="hidden md:block md:w-[150px]" />
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
          {smallPrintsData?.slice(0,8)?.map((work, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden mb-5 border-14 border-white bg-[#F9F9F9] lg:h-[430px] md:h-[280px] h-[200px] w-full">
                <Image
                  src={work?.image}
                  alt={work?.product_name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Text Content */}
              <div className="text-center">
                <h3 className="text-base md:text-lg lg:text-2xl font-bold font-lato text-[#141414] tracking-wide mb-1">
                  {work?.product_name}
                </h3>
                <div className="flex gap-4 items-center justify-center">
                  {work?.framed_price && (
                    <p className="text-sm lg:text-base font-lato font-bold">
                      <span className="font-medium text-gray-500">
                        Framed Price:
                      </span>{" "}
                      ${parseFloat(work?.framed_price).toLocaleString()}
                    </p>
                  )}
                  {work?.unframed_price && (
                    <p className="text-sm lg:text-base font-lato font-bold">
                      <span className="font-medium text-gray-500">
                        Unframed Price:
                      </span>{" "}
                      ${parseFloat(work?.unframed_price).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmallPrint;
