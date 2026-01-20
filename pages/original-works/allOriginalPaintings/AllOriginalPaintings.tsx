"use client";
import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  artOriginalWorkProducts,
  IOriginalWorkProduct,
} from "@/constants/products";
import Image from "next/image";

const ITEMS_PER_PAGE = 12;

const AllOriginalPaintings = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeSort, setActiveSort] = useState("Default");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close filter when clicking outside
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen]);

  // Reset to page 1 when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeSort]);

  const sortOptions = [
    "Default",
    "Newest Artist",
    "Oldest Artist",
    "Least Price",
    "Most Price",
  ];

  // Search and Sort Logic
  const filteredProducts = artOriginalWorkProducts
    .filter((product: IOriginalWorkProduct) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a: IOriginalWorkProduct, b: IOriginalWorkProduct) => {
      if (activeSort === "Newest Artist") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (activeSort === "Oldest Artist") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (activeSort === "Least Price") {
        return a.price - b.price;
      }
      if (activeSort === "Most Price") {
        return b.price - a.price;
      }
      return a.id - b.id;
    });

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-16 md:py-24 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header with Search and Filter */}
        <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#141414]">
            Original Paintings
          </h2>

          <div className="flex w-full items-center gap-4 md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-[400px]">
              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-gray-200 py-4 pl-14 pr-8 font-lato text-base focus:border-[#0C2E46] focus:outline-none transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Filter Toggle */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex h-14 w-14 items-center justify-center cursor-pointer rounded-full bg-[#0c2e46] text-white transition-all hover:bg-[#143a59] active:scale-95 shadow-lg"
              >
                <SlidersHorizontal className="h-6 w-6" />
              </button>

              {/* Filter Dropdown */}
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute right-0 z-50 mt-4 w-[220px] overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-50"
                  >
                    <div className="flex flex-col p-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setActiveSort(option);
                            setIsFilterOpen(false);
                          }}
                          className={`px-6 py-4 rounded-xl text-left font-lato text-sm transition-all cursor-pointer ${
                            activeSort === option
                              ? "bg-[#0C2E46] text-white"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
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
              {paginatedProducts.map(
                (product: IOriginalWorkProduct, index: number) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="group cursor-pointer">
                      {/* Image Container */}
                      <div className="relative aspect-square overflow-hidden mb-5 bg-[#F9F9F9] lg:h-[460px] md:h-[300px] h-[200px] w-full">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      {/* Text Content */}
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-base lg:text-lg text-[#141414] font-bold font-lato tracking-wide mb-1">
                            {product.title}
                          </h3>
                          <p className="text-base lg:text-lg font-bold font-lato text-[#141414]">
                            ${product.price.toLocaleString()}
                          </p>
                        </div>
                        <p className="text-base lg:text-lg font-lato text-[#686868]">
                          {product?.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ),
              )}
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

export default AllOriginalPaintings;
