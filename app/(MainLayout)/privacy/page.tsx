"use client";

import { usePrivacyPolicy } from "@/services/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import TimelessArtwork from "@/pages/home/timeless-artwork/TimelessArtwork";

const PrivacyPolicyPage = () => {
  const { data, loading, error } = usePrivacyPolicy();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0C2E46] mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-red-600">{error || "Failed to load privacy policy"}</p>
        </div>
      </div>
    );
  }

  const policySection = data.privacy_policy_section[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-30 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#141414] mb-6">
              {policySection.name}
            </h1>
            <p className="text-lg md:text-xl text-[#404040] font-lato">
              {policySection.short_description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={policySection.image}
                  alt={policySection.name}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-base md:text-lg leading-relaxed text-[#404040] font-lato whitespace-pre-line">
                  {policySection.description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="py-20 md:py-30 bg-[#F5F5F5] ">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-[#141414] mb-6">
                  Information We Collect
                </h2>
                <p className="text-base md:text-lg text-[#404040] font-lato leading-relaxed">
                  We collect information that you provide directly to us, including when you create an account, 
                  make a purchase, subscribe to our newsletter, or contact us for support.
                </p>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-[#141414] mb-6">
                  How We Use Your Information
                </h2>
                <p className="text-base md:text-lg text-[#404040] font-lato leading-relaxed">
                  We use the information we collect to process your orders, communicate with you, 
                  improve our services, and ensure the security of our platform.
                </p>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-[#141414] mb-6">
                  Data Security
                </h2>
                <p className="text-base md:text-lg text-[#404040] font-lato leading-relaxed">
                  We implement industry-standard security measures to protect your personal information 
                  from unauthorized access, disclosure, or destruction.
                </p>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-[#141414] mb-6">
                  Your Rights
                </h2>
                <p className="text-base md:text-lg text-[#404040] font-lato leading-relaxed">
                  You have the right to access, update, or delete your personal information at any time. 
                  Please contact us if you wish to exercise these rights.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeless Artwork CTA */}
      <TimelessArtwork />
    </div>
  );
};

export default PrivacyPolicyPage;
