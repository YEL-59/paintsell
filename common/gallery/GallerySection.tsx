"use client";

import { useState, useRef, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { IProduct } from "@/constants/products";
import Image from "next/image";

const ITEMS_PER_PAGE = 12;

interface GallerySectionProps {
  title: string;
  products: IProduct[];
}

const GallerySection = ({ title, products }: GallerySectionProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeSort, setActiveSort] = useState("Default");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };
    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFilterOpen]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeSort]);

  const sortOptions = [
    "Default",
    "Newest",
    "Oldest",
    "Price: Low to High",
    "Price: High to Low",
  ];

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (activeSort === "Newest")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (activeSort === "Oldest")
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (activeSort === "Price: Low to High") return a.price - b.price;
      if (activeSort === "Price: High to Low") return b.price - a.price;
      return a.id - b.id;
    });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-16 md:py-24 lg:py-32 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Area */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#141414] tracking-tight">
            {title}
          </h2>

          <div className="flex w-full items-center gap-4 md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:w-[320px]">
              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-gray-200 py-3.5 pl-14 pr-6 font-lato text-sm focus:border-[#0C2E46] focus:outline-none transition-all"
              />
            </div>

            {/* Filter */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex h-[50px] w-[50px] items-center justify-center cursor-pointer rounded-full bg-[#0C2E46] text-white transition-all hover:bg-[#081F30] active:scale-95 shadow-lg"
              >
                <SlidersHorizontal className="h-5 w-5" />
              </button>

              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 z-50 mt-4 w-[220px] overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 p-2"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setActiveSort(option);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full px-5 py-3.5 cursor-pointer text-left rounded-xl font-lato text-sm transition-all ${
                          activeSort === option
                            ? "bg-[#0C2E46] text-white"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 lg:gap-x-8 gap-x-4 lg:gap-y-12 gap-y-6">
              {paginatedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <div className="group cursor-pointer">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden mb-5 bg-[#F9F9F9] lg:h-[395px] md:h-[250px] h-[180px] w-full">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Text Content */}
                    <div className="text-center">
                      <h3 className="text-base md:text-lg lg:text-2xl font-bold font-lato text-[#141414] tracking-wide mb-1">
                        {product.title}
                      </h3>
                      <p className="text-base lg:text-lg font-medium font-lato text-[#141414]">
                        ${product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

             {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="mt-20 flex items-center justify-end gap-2 md:gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex h-12 items-center justify-center rounded-xl border border-gray-200 px-6 font-lato text-base text-gray-600 transition-all hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`flex h-12 w-12 items-center justify-center rounded-xl border font-lato text-lg font-medium transition-all cursor-pointer ${
                          currentPage === page
                            ? "border-[#0C2E46] bg-[#E3F1FA] text-[#0C2E46]"
                            : "border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex h-12 items-center justify-center rounded-xl border border-gray-200 px-6 font-lato text-base text-gray-600 transition-all hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
           <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search className="h-16 w-16 mb-4 text-gray-200" />
            <h3 className="text-2xl font-lato text-[#141414] mb-2">
              No results found
            </h3>
            <p className="text-gray-500 font-lato">
              Try adjusting your search or filters to find what you're looking
              for.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
