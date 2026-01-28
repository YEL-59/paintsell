"use client";

import { useTermsOfService } from "@/services/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import TimelessArtwork from "@/pages/home/timeless-artwork/TimelessArtwork";

const TermsOfServicePage = () => {
  const { data, loading, error } = useTermsOfService();

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
          <p className="text-lg text-red-600">{error || "Failed to load terms of service"}</p>
        </div>
      </div>
    );
  }

  const termsSection = data.privacy_policy_section[0];

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
              {termsSection.name}
            </h1>
            <p className="text-lg md:text-xl text-[#404040] font-lato">
              {termsSection.short_description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-base md:text-lg leading-relaxed text-[#404040] font-lato whitespace-pre-line">
                  {termsSection.description}
                </p>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={termsSection.image}
                  alt={termsSection.name}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Terms Sections */}
      <section className="py-20 md:py-30 bg-[#F5F5F5]">
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
                  Acceptance of Terms
                </h2>
                <p className="text-base md:text-lg text-[#404040] font-lato leading-relaxed">
                  By accessing and using our website, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to these terms, please do not use our services.
                </p>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-[#141414] mb-6">
                  Use of Services
                </h2>
                <p className="text-base md:text-lg text-[#404040] font-lato leading-relaxed">
                  You agree to use our services only for lawful purposes and in accordance with these terms. 
                  You are prohibited from using our services in any way that could damage, disable, or impair our website.
                </p>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-[#141414] mb-6">
                  Intellectual Property
                </h2>
                <p className="text-base md:text-lg text-[#404040] font-lato leading-relaxed">
                  All content on this website, including artwork, images, text, and graphics, is the property 
                  of Briataor or its content suppliers and is protected by international copyright laws.
                </p>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-[#141414] mb-6">
                  Limitation of Liability
                </h2>
                <p className="text-base md:text-lg text-[#404040] font-lato leading-relaxed">
                  Briataor shall not be liable for any indirect, incidental, special, consequential, or punitive 
                  damages resulting from your use of or inability to use our services.
                </p>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-[#141414] mb-6">
                  Changes to Terms
                </h2>
                <p className="text-base md:text-lg text-[#404040] font-lato leading-relaxed">
                  We reserve the right to modify these terms at any time. Your continued use of our services 
                  following any changes indicates your acceptance of the new terms.
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

export default TermsOfServicePage;
