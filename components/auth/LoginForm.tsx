"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Mail, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
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
import { loginSchema, LoginFormValues } from "@/lib/schemas/auth";
import { loginUser } from "@/services/auth";
import signin1 from "@/assets/images/signin1.png";

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const res = await loginUser(data);
      // Handling both 'status' and 'success' fields for maximum compatibility
      if (res.status === true || res.success === true) {
        toast.success(res.message || "Logged in successfully!");
        router.refresh();
        router.push("/");
      } else {

        toast.error(res.message || "Login failed. Please try again.");
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
      className="flex w-full max-w-[1000px] min-h-[600px] font-lato p-5 bg-white rounded-none overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.2)] flex-col md:flex-row mx-auto border border-gray-100"
    >
      {/* Left Column: Artwork */}
      <div className="w-full md:w-1/2 relative h-[350px] md:h-auto overflow-hidden">
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Image
            src={signin1}
            alt="Artistic Portrait"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        {/* Subtle gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
      </div>

      {/* Right Column: Form */}
      <div className="w-full md:w-1/2 p-10 md:p-14 lg:p-16  flex flex-col justify-center bg-white relative">
      <Link href="/" className="absolute top-4 left-4 flex items-center gap-2 hover:gap-4 transition-all duration-300 text-gray-500 hover:text-[#001D35] cursor-pointer"><ArrowLeft size={18}/> Back Home</Link>
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif text-[#001D35] mb-4 tracking-wider uppercase">
            Log in
          </h1>
          <p className="text-[13px] text-gray-400 font-sans tracking-tight font-light">
            Sign in to your account to continue
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 font-sans ">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2 relative">
                  <FormLabel className="text-[11px] font-bold text-[#001D35]/80 uppercase tracking-[0.15em] ml-0.5">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Input
                        placeholder="Enter email your address"
                        {...field}
                        className="w-full px-4 py-7 border border-gray-100 bg-[#FAFAFA] rounded-none focus:bg-white focus:border-[#001D35]/30 transition-all text-[14px] pr-10 placeholder:text-gray-300 font-sans h-auto focus-visible:ring-0 focus-visible:ring-offset-0 border-b-2 focus:border-b-[#001D35] shadow-none"
                      />
                      <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-300 group-focus-within:text-[#001D35] transition-colors" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-[10px] absolute -bottom-5 left-0 font-medium italic" />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2 relative pt-1">
                  <FormLabel className="text-[11px] font-bold text-[#001D35]/80 uppercase tracking-[0.15em] ml-0.5">
                    Password
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

            <div className="flex justify-end pr-0.5">
              <Link
                href="/auth/forget"
                className="text-[11px] text-gray-400 hover:text-[#001D35] transition-colors font-semibold uppercase tracking-widest border-b border-transparent hover:border-[#001D35]/20 pb-0.5"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="space-y-4 pt-6">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#001D35] text-white py-8 px-4 rounded-none font-bold hover:bg-[#002848] transition-all text-[13px] uppercase tracking-[0.25em] shadow-xl shadow-[#001d35]/20 font-sans h-auto cursor-pointer border-none active:scale-[0.98] disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              <Button
                variant="outline"
                asChild
                className="w-full border border-gray-200 text-[#001D35] py-8 px-4 rounded-none font-bold hover:bg-gray-50 transition-all text-[13px] uppercase tracking-[0.25em] font-sans h-auto cursor-pointer shadow-none active:scale-[0.98]"
              >
                <Link href="/auth/register">Create an account</Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
};

export default LoginForm;
