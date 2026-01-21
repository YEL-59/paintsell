"use client";

import { useForm } from "react-hook-form";

export interface ContactFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Form submitted:", data);
    // Add your form submission logic here
    reset();
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
            }`}
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
            }`}
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
          }`}
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
          }`}
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
        className="w-full cursor-pointer bg-[#0C2E46] py-4 font-lato text-base font-bold tracking-wider text-white transition-all duration-300 active:scale-95 hover:bg-[#05304e]"
      >
        SUBMIT
      </button>
    </form>
  );
};

export default ContactForm;
