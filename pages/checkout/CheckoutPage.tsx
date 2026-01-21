"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";

interface CheckoutFormData {
  billingFullName: string;
  billingPhone: string;
  billingAddress1: string;
  billingAddress2: string;
  billingCity: string;
  billingState: string;
  billingPostalCode: string;
  billingCountry: string;
  shipToDifferentAddress: boolean;
  shippingFullName?: string;
  shippingPhone?: string;
  shippingAddress1?: string;
  shippingAddress2?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingPostalCode?: string;
  shippingCountry?: string;
  paymentMethod: "stripe";
}

const CheckoutPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      shipToDifferentAddress: false,
      paymentMethod: "stripe",
    },
  });

  const shipToDifferentAddress = watch("shipToDifferentAddress");

  const onSubmit = (data: CheckoutFormData) => {
    console.log("Order Submitted:", data);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[16px] border border-[#A3A3A3] max-w-lg w-full"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            ✓
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold font-lato text-[#141414] mb-4">
            Order Confirmed!
          </h2>
          <p className="text-[#686868] font-lato mb-8">
            Thank you for your purchase. We've received your order and are
            processing it.
          </p>
          <button
            onClick={() => (window.location.href = "/products")}
            className="w-full bg-[#0C2E46] text-white py-4 font-lato font-bold tracking-widest uppercase hover:bg-[#081F30] transition-colors"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  const InputField = ({
    label,
    name,
    placeholder,
    required = true,
  }: {
    label: string;
    name: keyof CheckoutFormData;
    placeholder: string;
    required?: boolean;
  }) => (
    <div className="space-y-2">
      <label className="block text-base lg:text-lg font-lato font-medium text-[#141414]">
        {label}
      </label>
      <input
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        placeholder={placeholder}
        className={`w-full border px-4 py-3 text-base lg:text-lg font-lato font-medium text-[#141414] focus:outline-none focus:border-[#0C2E46] transition-colors ${
          errors[name] ? "border-red-500" : "border-[#CACACA]"
        }`}
      />
      {errors[name] && (
        <p className="text-red-500 font-lato text-sm mt-1">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );

  return (
    <main className="bg-[#FCFCFC] min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold font-lato text-[#141414] mb-12">
          Customer Information
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Left Column - Forms */}
          <div className="lg:col-span-8 space-y-8">
            {/* Billing Address */}
            <div className="bg-white p-6 md:p-8 rounded-[16px] border border-[#A3A3A3]">
              <h2 className="text-xl lg:text-2xl font-semibold font-lato text-[#141414] mb-8">
                Billing Address
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <InputField
                  label="Full name"
                  name="billingFullName"
                  placeholder="Full name here"
                />
                <InputField
                  label="Phone number"
                  name="billingPhone"
                  placeholder="Phone number"
                />
                <InputField
                  label="Address Line 1"
                  name="billingAddress1"
                  placeholder="Address here"
                />
                <InputField
                  label="Address Line 2"
                  name="billingAddress2"
                  placeholder="Address here"
                  required={false}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="City"
                    name="billingCity"
                    placeholder="City name here"
                  />
                  <InputField
                    label="State"
                    name="billingState"
                    placeholder="State name here"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Postal Code"
                    name="billingPostalCode"
                    placeholder="Code here"
                  />
                  <InputField
                    label="Country"
                    name="billingCountry"
                    placeholder="Country name here"
                  />
                </div>
              </div>
            </div>

            {/* Ship to different address checkbox */}
            <div className="flex items-center gap-3 px-2">
              <input
                type="checkbox"
                id="shipToDifferentAddress"
                {...register("shipToDifferentAddress")}
                className="w-5 h-5 accent-[#0C2E46] cursor-pointer"
              />
              <label
                htmlFor="shipToDifferentAddress"
                className="text-sm font-lato text-[#686868] cursor-pointer"
              >
                Shipping to Another Address
              </label>
            </div>

            {/* Shipping Information (Conditional) */}
            {shipToDifferentAddress && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 md:p-8 rounded-[16px] border border-[#A3A3A3]"
              >
                <h2 className="text-xl lg:text-2xl font-semibold font-lato text-[#141414] mb-8">
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  <InputField
                    label="Full name"
                    name="shippingFullName"
                    placeholder="Full name here"
                  />
                  <InputField
                    label="Phone number"
                    name="shippingPhone"
                    placeholder="Phone number"
                  />
                  <InputField
                    label="Address Line 1"
                    name="shippingAddress1"
                    placeholder="Address here"
                  />
                  <InputField
                    label="Address Line 2"
                    name="shippingAddress2"
                    placeholder="Address here"
                    required={false}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="City"
                      name="shippingCity"
                      placeholder="City name here"
                    />
                    <InputField
                      label="State"
                      name="shippingState"
                      placeholder="State name here"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Postal Code"
                      name="shippingPostalCode"
                      placeholder="Code here"
                    />
                    <InputField
                      label="Country"
                      name="shippingCountry"
                      placeholder="Country name here"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-4 space-y-6">
            {/* Payment Method */}
            <div className="bg-white p-6 rounded-[16px] border border-[#A3A3A3]">
              <h2 className="text-xl lg:text-2xl font-semibold font-lato text-[#141414] mb-8">
                Payment Method
              </h2>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="stripe"
                  value="stripe"
                  {...register("paymentMethod")}
                  className="w-4 h-4 accent-black"
                />
                <label
                  htmlFor="stripe"
                  className="text-sm font-lato text-gray-800"
                >
                  Strip
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-[16px] border border-[#A3A3A3]">
              <h2 className="text-xl lg:text-2xl font-semibold font-lato text-[#141414] mb-8">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-base font-lato">
                  <span className="text-[#686868]">Subtotal</span>
                  <span className="font-bold text-[#141414]">$3000</span>
                </div>
                <div className="flex justify-between text-base font-lato">
                  <span className="text-[#686868]">Vat (20%)</span>
                  <span className="font-bold text-[#141414]">$20</span>
                </div>
                <div className="flex justify-between text-base font-lato pb-4 border-b border-gray-100">
                  <span className="text-[#686868]">Delivery Fee</span>
                  <span className="font-bold text-[#141414]">$15</span>
                </div>
                <div className="flex justify-between text-xl font-lato font-bold pt-2">
                  <span className="text-[#141414]">Total</span>
                  <span className="text-[#141414]">$3500</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0C2E46] cursor-pointer text-white py-4 font-lato font-bold tracking-[0.2em] uppercase hover:bg-[#081F30] transition-all active:scale-[0.98]"
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CheckoutPage;
