"use client";

import React from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { passwordChangeSchema, PasswordChangeFormValues } from "@/lib/schemas/auth";
import { forgotPasswordResetPassword } from "@/services/auth";
import newpassword1 from "@/assets/images/newpassword1.png";

const PasswordChangeForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<PasswordChangeFormValues>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordChangeFormValues) => {
    const email = sessionStorage.getItem("resetEmail");
    const otp = sessionStorage.getItem("resetOtp");

    if (!email || !otp) {
      toast.error("Session expired. Please start the process again.");
      router.push("/auth/forget");
      return;
    }

    setLoading(true);
    try {
      const res = await forgotPasswordResetPassword({
        email,
        otp,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });

      if (res.status === true || res.success === true) {
        toast.success(res.message || "Password reset successfully!");
        sessionStorage.removeItem("resetEmail");
        sessionStorage.removeItem("resetOtp");
        router.push("/auth/login");
      } else {
        toast.error(res.message || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
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
            src={newpassword1}
            alt="New Password Artwork"
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
          <h1 className="text-2xl md:text-3xl font-serif text-[#001D35] mb-4 tracking-wider uppercase">
            Create new password
          </h1>
          <p className="text-[13px] text-gray-400 font-sans tracking-tight font-light max-w-[280px] mx-auto">
            Set a strong password to secure your account
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 font-sans">
            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2 relative">
                  <FormLabel className="text-[11px] font-bold text-[#001D35]/80 uppercase tracking-[0.15em] ml-0.5">
                    Create new password
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                        className="w-full px-4 py-7 border border-gray-100 bg-[#FAFAFA] rounded-none focus:bg-white focus:border-[#001D35]/30 transition-all text-[14px] pr-10 placeholder:text-gray-300 font-sans h-auto focus-visible:ring-0 focus-visible:ring-offset-0 border-b-2 focus:border-b-[#001D35] shadow-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#001D35] transition-colors focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="w-[18px] h-[18px]" />
                        ) : (
                          <Eye className="w-[18px] h-[18px]" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-[10px] absolute -bottom-5 left-0 font-medium italic" />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-2 relative pt-1">
                  <FormLabel className="text-[11px] font-bold text-[#001D35]/80 uppercase tracking-[0.15em] ml-0.5">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                        className="w-full px-4 py-7 border border-gray-100 bg-[#FAFAFA] rounded-none focus:bg-white focus:border-[#001D35]/30 transition-all text-[14px] pr-10 placeholder:text-gray-300 font-sans h-auto focus-visible:ring-0 focus-visible:ring-offset-0 border-b-2 focus:border-b-[#001D35] shadow-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#001D35] transition-colors focus:outline-none"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-[18px] h-[18px]" />
                        ) : (
                          <Eye className="w-[18px] h-[18px]" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-[10px] absolute -bottom-5 left-0 font-medium italic" />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#001D35] text-white py-8 px-4 rounded-none font-bold hover:bg-[#002848] transition-all text-[13px] uppercase tracking-[0.25em] shadow-xl shadow-[#001d35]/20 font-sans h-auto cursor-pointer border-none active:scale-[0.98] disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
};

export default PasswordChangeForm;