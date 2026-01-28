"use client";
import { Search, SlidersHorizontal, Loader2, ImageOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLimitedEditionProducts } from "@/services/hooks/useProducts";

const AllLimitedEditions = () => {
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
  } = useLimitedEditionProducts();

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
    "Newest artist",
    "Oldest artist",
    "Latest Price",
    "Most Price",
  ];

  const onPageChange = (page: number) => {
    handlePageChange(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-16 md:py-24 lg:py-32 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Area */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#141414] tracking-tight">
            Limited Addition Print
          </h2>

          <div className="flex w-full items-center gap-4 md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:w-[320px]">
              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Limited Editions..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full rounded-full border border-gray-200 py-3.5 pl-14 pr-6 font-lato text-sm focus:border-[#0C2E46] focus:outline-none transition-all"
              />
            </div>

            {/* Filter Toggle */}
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
                          handleSort(option);
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

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="h-12 w-12 text-[#0c2e46] animate-spin mb-4" />
            <p className="text-gray-500 font-lato animate-pulse">
              Loading limited editions...
            </p>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 lg:gap-x-8 gap-x-4 lg:gap-y-12 gap-y-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <div className="group cursor-pointer">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden mb-5 bg-[#F9F9F9] lg:h-[395px] md:h-[250px] h-[180px] w-full flex items-center justify-center">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.product_name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-300">
                          <ImageOff className="h-12 w-12 mb-2" />
                          <span className="text-xs uppercase tracking-widest font-lato">
                            No image available
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Text Content */}
                    <div className="text-center px-2">
                      <h3 className="text-base md:text-lg lg:text-2xl font-bold font-lato text-[#141414] tracking-wide mb-1 truncate">
                        {product.product_name}
                      </h3>

                      <div className="flex items-center justify-center gap-4">
                        <p className="text-base lg:text-lg font-medium font-lato text-[#141414]">
                          <span className="text-gray-500">Frame Price:</span> $
                          {parseFloat(product.framed_price).toLocaleString()}
                        </p>
                        <p className="text-base lg:text-lg font-medium font-lato text-[#141414]">
                          <span className="text-gray-500">Unframe Price:</span>{" "}
                          ${parseFloat(product.unframed_price).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
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
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Search className="h-16 w-16 mb-4 text-gray-200" />
            <h3 className="text-2xl font-lato text-[#141414] mb-2 font-semibold">
              No results found
            </h3>
            <p className="text-gray-500 font-lato max-w-sm mx-auto">
              We couldn't find any limited editions matching "{searchQuery}".
              Please try a different term.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllLimitedEditions;
