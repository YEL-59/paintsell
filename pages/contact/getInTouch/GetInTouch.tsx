"use client";

import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import ContactForm from "@/components/forms/ContactForm";

const GetInTouch = () => {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-12 font-serif text-5xl text-[#141414] lg:text-6xl">
              Get In Touch
            </h2>

            <ContactForm />
          </motion.div>

          {/* Right Column: Contact Info and Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Contact Information Cards */}
            <div className="grid grid-cols-2 gap-2 md:gap-8">
              {/* Phone Contact */}
              <div className="flex flex-col items-start">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gray-100 shadow-sm">
                  <Phone className="h-7 w-7 text-[#0C2E46]" />
                </div>
                <h3 className="mb-3 font-lato text-lg md:text-2xl lg:text-3xl font-medium text-[#141414]">
                  Our contact info
                </h3>
                <div className="space-y-1">
                  <p className="font-lato text-sm md:text-base text-[#686868]">
                    (310) 963-4722
                  </p>
                  <p className="font-lato text-sm md:text-base text-[#686868]">
                    hello@impressionart.com
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col items-start">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gray-100 shadow-sm">
                  <MapPin className="h-7 w-7 text-[#0C2E46]" />
                </div>
                <h3 className="mb-3 font-lato text-lg md:text-2xl lg:text-3xl font-medium text-[#141414]">
                  Our address
                </h3>
                <div className="space-y-1">
                  <p className="font-lato text-sm md:text-base text-[#686868]">
                    915Springboard Business Hub,
                  </p>
                  <p className="font-lato text-sm md:text-base text-[#686868]">
                    MG Road, Indiranagar
                  </p>
                </div>
              </div>
            </div>

            {/* Office Image */}
            <div className="relative h-[300px] lg:h-[380px] w-full  overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                alt="Office workspace with art"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
