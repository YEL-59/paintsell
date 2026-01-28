"use client";

import { useFAQs } from "@/services/hooks";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQPage = () => {
  const { faqs, loading, error } = useFAQs();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0C2E46] mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  if (error || !faqs) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-red-600">{error || "Failed to load FAQs"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20 md:py-30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#141414] mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-[#404040] font-lato max-w-3xl mx-auto">
            Find answers to common questions about our artwork, shipping, and services.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg md:text-xl font-medium text-[#141414] text-left pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <Minus className="w-6 h-6 text-[#0C2E46]" />
                    ) : (
                      <Plus className="w-6 h-6 text-[#0C2E46]" />
                    )}
                  </div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 bg-gray-50">
                        <p className="text-base md:text-lg text-[#404040] font-lato leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="bg-[#F5F5F5] rounded-2xl p-10 md:p-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-[#141414] mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-[#404040] font-lato mb-8">
              Our team is here to help. Feel free to reach out to us.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-[#0C2E46] px-10 py-4 text-base md:text-lg tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#081F30] active:scale-95"
            >
              CONTACT US
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQPage;
