import Link from "next/link";
import { MoveRight } from "lucide-react";
import WorkCard from "@/components/mainLayout/WorkCard";
import { allProducts } from "@/constants/products";

const FeaturedWorks = () => {
  return (
    <section className="py-30 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <h2 className="text-5xl md:text-6xl text-[#141414]">
            Featured Works
          </h2>

          <div className="flex flex-col items-start gap-4">
            <p className="text-base md:text-lg font-lato text-[#686868] max-w-[330px] leading-relaxed">
              A curated selector of our most celebrated original paintings
            </p>
            <Link
              href="/works"
              className="group flex items-center gap-3 text-sm md:text-base font-lato tracking-[0.2em] text-[#141414] transition-colors"
            >
              VIEW ALL WORKS
              <MoveRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-2 lg:grid-cols-3 lg:gap-x-8 gap-x-4 lg:gap-y-12 gap-y-6">
          {allProducts?.slice(0, 6)?.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorks;
