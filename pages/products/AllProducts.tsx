"use client";

import { useAllProducts } from "@/services/hooks/useProducts";
import { Search, SlidersHorizontal, Loader2, ImageOff } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const AllProducts = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const {
    products,
    pagination,
    loading,
    currentPage,
    searchQuery,
    activeSort,
    handlePageChange,
    handleSearch,
    handleSort,
  } = useAllProducts();

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

  const sortOptions = [
    "Default",
    "Newest Artist",
    "Oldest Artist",
    "Least Price",
    "Most Price",
  ];

  const onPageChange = (page: number) => {
    handlePageChange(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-16 md:py-24 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header with Search and Filter */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#141414]">
            Featured Works
          </h2>

          <div className="flex w-full items-center gap-4 md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-[350px]">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full rounded-full border border-gray-200 py-3 pl-12 pr-6 font-lato text-sm focus:border-[#0C2E46] focus:outline-none"
              />
            </div>

            {/* Filter Toggle */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex h-12 w-12 items-center justify-center cursor-pointer rounded-full bg-[#0c2e46] text-white transition-all active:scale-95"
              >
                <SlidersHorizontal className="h-5 w-5" />
              </button>

              {/* Filter Dropdown */}
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 z-50 mt-3 w-[200px] overflow-hidden rounded-lg bg-white shadow-2xl border border-gray-100"
                  >
                    <div className="flex flex-col">
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            handleSort(option);
                            setIsFilterOpen(false);
                          }}
                          className={`px-6 cursor-pointer py-4 text-left font-lato text-sm transition-colors ${
                            activeSort === option
                              ? "bg-[#0C2E46] text-white hover:bg-[#143a59]"
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

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="h-12 w-12 text-[#0c2e46] animate-spin mb-4" />
            <p className="text-gray-500 font-lato animate-pulse">
              Loading products...
            </p>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 lg:gap-x-8 gap-x-4 lg:gap-y-12 gap-y-6">
              {products.map((product: any, index: number) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer text-center"
                >
                  {/* Reuse WorkCard or inline structure if WorkCard expects specific props */}
                  <Link href={`/products/${product.id}`} className="group cursor-pointer block">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden mb-5 bg-[#F9F9F9] lg:h-[460px] md:h-[300px] h-[200px] w-full">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.product_name}
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-300 w-full h-full">
                          <ImageOff className="h-12 w-12 mb-2" />
                          <span className="text-xs uppercase tracking-widest font-lato">
                            No image
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Text Content */}
                    <div className="text-center">
                      <h3 className="text-base md:text-lg lg:text-2xl font-bold font-lato text-[#141414] tracking-wide mb-1">
                        {product.product_name}
                      </h3>
                      <div className="flex items-center justify-center gap-4">
                        <p className="text-base lg:text-lg font-medium font-lato text-[#141414]">
                          <span className="text-gray-500">Frame Price:</span> $
                          {parseFloat(
                            product.framed_price || "0",
                          ).toLocaleString()}
                        </p>
                        <p className="text-base lg:text-lg font-medium font-lato text-[#141414]">
                          <span className="text-gray-500">Unframe Price:</span>{" "}
                          $
                          {parseFloat(
                            product.unframed_price || "0",
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination controls */}
            {pagination && pagination.last_page > 1 && (
              <div className="mt-20 flex items-center justify-end gap-2 md:gap-4">
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex h-12 items-center justify-center rounded-xl border border-gray-200 px-6 font-lato text-base text-gray-600 transition-all hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from(
                    { length: pagination.last_page },
                    (_, i) => i + 1,
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => onPageChange(page)}
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border font-lato text-lg font-medium transition-all cursor-pointer ${
                        currentPage === page
                          ? "border-[#0C2E46] bg-[#E3F1FA] text-[#0C2E46]"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === pagination.last_page}
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

export default AllProducts;
