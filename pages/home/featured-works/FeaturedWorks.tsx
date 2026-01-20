import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import WorkCard from "@/components/mainLayout/WorkCard";

interface Work {
  id: number;
  title: string;
  price: string;
  image: string;
}

const featuredWorks: Work[] = [
  {
    id: 1,
    title: "Verdant Whispers",
    price: "$2,400",
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Verdant Whispers",
    price: "$2,400",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2090&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Verdant Whispers",
    price: "$2,400",
    image:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2038&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Verdant Whispers",
    price: "$2,400",
    image:
      "https://i01.fotocdn.net/s204/2f70fb613897500b/public_pin_l/2293013835.jpg",
  },
  {
    id: 5,
    title: "Verdant Whispers",
    price: "$2,400",
    image:
      "https://img.freepik.com/premium-photo/drawing-plant-with-sun-it_1320300-7204.jpg?uid=R191150260&ga=GA1.1.766574978.1765429508&semt=ais_hybrid&w=740&q=85",
  },
  {
    id: 6,
    title: "Verdant Whispers",
    price: "$2,400",
    image:
      "https://img.freepik.com/premium-photo/close-up-potted-plant_1048944-13936038.jpg?uid=R191150260&ga=GA1.1.766574978.1765429508&semt=ais_hybrid&w=740&q=80",
  },
];

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
          {featuredWorks?.slice(0,6).map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorks;
