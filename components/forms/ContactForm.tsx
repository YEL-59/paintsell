"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { createContact } from "@/services/contact";

export interface ContactFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      // Map form data to service expected fields: name, email, phone, message
      const contactData = {
        name: data.fullName,
        email: data.email,
        phone: data.phoneNumber,
        message: data.message,
      };

      const res = await createContact(contactData);
      
      if (res.status === true || res.success === true) {
        toast.success(res.message || "Message sent successfully!");
        reset();
      } else {
        toast.error(res.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Full Name and Phone Number Row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block font-lato text-base lg:text-lg font-medium text-[#141414]"
          >
            Full name
          </label>
          <input
            type="text"
            id="fullName"
            disabled={loading}
            {...register("fullName", {
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            placeholder="Full name here"
            className={`w-full border bg-transparent px-4 py-3 font-lato text-base text-[#141414] placeholder:text-gray-400 focus:outline-none transition-colors ${
              errors.fullName
                ? "border-red-500 focus:border-red-500"
                : "border-[#CACACA] focus:border-[#0C2E46]"
            } disabled:opacity-50`}
          />
          {errors.fullName && (
            <p className="mt-1 font-lato text-xs text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="mb-2 block font-lato text-base lg:text-lg font-medium text-[#141414]"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            disabled={loading}
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9+\-\s()]+$/,
                message: "Please enter a valid phone number",
              },
            })}
            placeholder="Phone number"
            className={`w-full border bg-transparent px-4 py-3 font-lato text-base text-[#141414] placeholder:text-gray-400 focus:outline-none transition-colors ${
              errors.phoneNumber
                ? "border-red-500 focus:border-red-500"
                : "border-[#CACACA] focus:border-[#0C2E46]"
            } disabled:opacity-50`}
          />
          {errors.phoneNumber && (
            <p className="mt-1 font-lato text-xs text-red-500">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block font-lato text-base lg:text-lg font-medium text-[#141414]"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          disabled={loading}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email address",
            },
          })}
          placeholder="Email"
          className={`w-full border bg-transparent px-4 py-3 font-lato text-base text-[#141414] placeholder:text-gray-400 focus:outline-none transition-colors ${
            errors.email
              ? "border-red-500 focus:border-red-500"
              : "border-[#CACACA] focus:border-[#0C2E46]"
          } disabled:opacity-50`}
        />
        {errors.email && (
          <p className="mt-1 font-lato text-xs text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-2 block font-lato text-base lg:text-lg font-medium text-[#141414]"
        >
          Message
        </label>
        <textarea
          id="message"
          disabled={loading}
          {...register("message", {
            required: "Message is required",
            minLength: {
              value: 10,
              message: "Message must be at least 10 characters",
            },
          })}
          placeholder="Message"
          rows={4}
          className={`w-full resize-none border bg-transparent px-4 py-3 font-lato text-base text-[#141414] placeholder:text-gray-400 focus:outline-none transition-colors ${
            errors.message
              ? "border-red-500 focus:border-red-500"
              : "border-[#CACACA] focus:border-[#0C2E46]"
          } disabled:opacity-50`}
        />
        {errors.message && (
          <p className="mt-1 font-lato text-xs text-red-500">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer bg-[#0C2E46] py-4 font-lato text-base font-bold tracking-wider text-white transition-all duration-300 active:scale-95 hover:bg-[#05304e] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        SUBMIT
      </button>
    </form>
  );
};

export default ContactForm;
