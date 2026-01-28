import { IProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";

const WorkCard = ({ work }: { work: IProduct }) => {
  return (
    <Link href={`/products/${work.id}`} className="group cursor-pointer block">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden mb-5 bg-[#F9F9F9] lg:h-[460px] md:h-[300px] h-[200px] w-full">
        <Image
          src={work?.image}
          alt={work?.product_name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Text Content */}
      <div>
        <h3 className="text-base text-center md:text-lg lg:text-2xl font-bold font-lato text-[#141414] tracking-wide mb-1">
          {work?.product_name}
        </h3>
        <div className="flex gap-4 items-center justify-center">
          {work?.framed_price && (
            <p className="text-lg lg:text-xl font-lato font-bold">
              <span className="font-medium text-gray-500">Framed Price:</span> ${parseFloat(work?.framed_price).toLocaleString()}
            </p>
          )}
          {work?.unframed_price && (
            <p className="text-lg lg:text-xl font-lato font-bold">
              <span className="font-medium text-gray-500">Unframed Price:</span> ${parseFloat(work?.unframed_price).toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default WorkCard;
