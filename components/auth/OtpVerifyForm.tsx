"use client";

import React from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { otpSchema, OtpFormValues } from "@/lib/schemas/auth";
import verification1 from "@/assets/images/verification1.png";

const OtpVerifyForm = () => {
  const [timeLeft, setTimeLeft] = React.useState(25);

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  React.useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const onSubmit = (data: OtpFormValues) => {
    console.log("OTP Form submitted:", data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex w-full max-w-[1000px] min-h-[550px] p-5 bg-white rounded-none overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.2)] flex-col md:flex-row mx-auto border border-gray-100"
    >
      {/* Left Column: Artwork */}
      <div className="w-full md:w-1/2 relative h-[300px] md:h-auto overflow-hidden">
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Image
            src={verification1}
            alt="Verification Artwork"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
      </div>

      {/* Right Column: Form */}
      <div className="w-full md:w-1/2 p-10 md:p-14 lg:p-16 flex flex-col justify-center bg-white relative">
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-serif text-[#001D35] mb-4 tracking-wider">
            Enter the verification code
          </h1>
          <p className="text-[13px] text-gray-400 font-sans tracking-tight font-light max-w-[280px] mx-auto leading-relaxed">
            We sent a verification code to your email, check your email
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 font-sans">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center space-y-4">
                  <FormControl>
                    <InputOTP
                      maxLength={4}
                      {...field}
                    >
                      <InputOTPGroup className="gap-4">
                        <InputOTPSlot
                          index={0}
                          className="size-14 md:size-16 rounded-none border-gray-100 bg-[#FAFAFA] text-xl font-medium focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#001D35] focus:bg-white transition-all shadow-none first:border-l first:rounded-none last:rounded-none"
                        />
                        <InputOTPSlot
                          index={1}
                          className="size-14 md:size-16 rounded-none border-gray-100 bg-[#FAFAFA] text-xl font-medium focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#001D35] focus:bg-white transition-all shadow-none first:border-l first:rounded-none last:rounded-none"
                        />
                        <InputOTPSlot
                          index={2}
                          className="size-14 md:size-16 rounded-none border-gray-100 bg-[#FAFAFA] text-xl font-medium focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#001D35] focus:bg-white transition-all shadow-none first:border-l first:rounded-none last:rounded-none"
                        />
                        <InputOTPSlot
                          index={3}
                          className="size-14 md:size-16 rounded-none border-gray-100 bg-[#FAFAFA] text-xl font-medium focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#001D35] focus:bg-white transition-all shadow-none first:border-l first:rounded-none last:rounded-none"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage className="text-red-500 text-[10px] font-medium italic" />
                </FormItem>
              )}
            />

            <div className="space-y-6">
              <Button
                type="submit"
                className="w-full bg-[#001D35] text-white py-8 px-4 rounded-none font-bold hover:bg-[#002848] transition-all text-[13px] uppercase tracking-[0.25em] shadow-xl shadow-[#001d35]/20 font-sans h-auto cursor-pointer border-none active:scale-[0.98]"
              >
                Continue
              </Button>

              <p className="text-center text-[11px] text-gray-400 font-medium tracking-tight">
                Didn't receive the code?{" "}
                <span className="text-[#EF4444] font-bold">Resend in {timeLeft} second</span>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
};

export default OtpVerifyForm;
