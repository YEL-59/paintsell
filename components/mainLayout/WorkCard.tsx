import { IProduct } from "@/constants/products";
import Image from "next/image";

const WorkCard = ({ work }: { work: IProduct }) => {
  return (
    <div className="group cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden mb-5 bg-[#F9F9F9] lg:h-[460px] md:h-[300px] h-[200px] w-full">
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
          ${work.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default WorkCard;
