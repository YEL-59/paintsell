"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2, Trash2, ShoppingBag } from "lucide-react";
import { addAddress } from "@/services/address";
import { getAllCart } from "@/services/cart";
import Image from "next/image";
import { useEffect } from "react";

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
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartLoading, setCartLoading] = useState(true);

  const fetchCartData = async () => {
    try {
      setCartLoading(true);
      const res = await getAllCart();
      if (res?.success) {
        const cartData = res.data?.cart;
        const itemsData = cartData?.items;

        const formattedItems = Array.isArray(itemsData)
          ? itemsData
          : itemsData
            ? Object.values(itemsData)
            : [];

        setCartItems(formattedItems);
        setCartSubtotal(cartData?.subtotal || 0);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();

    const handleCartUpdate = () => {
      fetchCartData();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

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

  const onSubmit = async (data: CheckoutFormData) => {
    setLoading(true);
    try {
      // Common logic for addresses
      // If unchecked (shipToDifferentAddress is false), is_default should be true
      // If checked (shipToDifferentAddress is true), is_default should be false
      const isDefault = !data.shipToDifferentAddress;

      // 1. Prepare Billing Address
      const billingAddress = {
        address_type: "billing",
        country: data.billingCountry,
        address_line1: data.billingAddress1,
        address_line2: data.billingAddress2,
        state: data.billingState,
        city: data.billingCity,
        zip_code: data.billingPostalCode,
        is_default: isDefault,
      };

      // Submit Billing Address
      const billingRes = await addAddress(billingAddress);

      if (!(billingRes.status === true || billingRes.success === true)) {
        throw new Error(
          billingRes.message || "Failed to save billing address.",
        );
      }

      // 2. Prepare and Submit Shipping Address if different
      if (data.shipToDifferentAddress) {
        const shippingAddress = {
          address_type: "shipping",
          country: data.shippingCountry,
          address_line1: data.shippingAddress1,
          address_line2: data.shippingAddress2,
          state: data.shippingState,
          city: data.shippingCity,
          zip_code: data.shippingPostalCode,
          is_default: false, // Per user instruction: "if user checked and it should be 'is_default': false"
        };

        const shippingRes = await addAddress(shippingAddress);
        if (!(shippingRes.status === true || shippingRes.success === true)) {
          throw new Error(
            shippingRes.message || "Failed to save shipping address.",
          );
        }
      }

      toast.success("Address information saved successfully!");
      console.log("Order Data:", data);
      setIsSuccess(true);
    } catch (error: any) {
      toast.error(error.message || "An error occurred during checkout.");
      console.error(error);
    } finally {
      setLoading(false);
    }
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
        disabled={loading}
        placeholder={placeholder}
        className={`w-full border px-4 py-3 text-base lg:text-lg font-lato font-medium text-[#141414] focus:outline-none focus:border-[#0C2E46] transition-colors ${
          errors[name] ? "border-red-500" : "border-[#CACACA]"
        } disabled:opacity-50`}
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
                disabled={loading}
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

              {/* Order Items */}
            <div className="bg-white p-6 md:p-8 rounded-[16px] border border-[#A3A3A3]">
              <div className="flex items-center gap-2 mb-8">
                <ShoppingBag className="w-6 h-6 text-[#0C2E46]" />
                <h2 className="text-xl lg:text-2xl font-semibold font-lato text-[#141414]">
                  Order Items ({cartItems.length})
                </h2>
              </div>

              {cartLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-[#0C2E46]" />
                </div>
              ) : cartItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500 font-lato">
                  Your bag is empty.
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <div className="relative w-20 h-20 shrink-0 bg-gray-50 rounded-sm overflow-hidden">
                        <Image
                          src={item.product?.image}
                          alt={item.product?.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h3 className="text-base font-lato font-bold text-[#141414] truncate">
                            {item.product?.name}
                          </h3>
                          <span className="text-base font-lato font-bold text-[#141414]">
                            $
                            {(item.unit_price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm font-lato text-gray-500 capitalize">
                          {item.type}
                        </p>
                        <p className="text-sm font-lato text-[#0C2E46] font-bold mt-1">
                          QTY: {item.quantity} × $
                          {item.unit_price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

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
                  disabled={loading}
                  {...register("paymentMethod")}
                  className="w-4 h-4 accent-black"
                />
                <label
                  htmlFor="stripe"
                  className="text-sm font-lato text-gray-800"
                >
                  Stripe
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
                  <span className="font-bold text-[#141414]">
                    ${cartSubtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-base font-lato">
                  <span className="text-[#686868]">Vat (0%)</span>
                  <span className="font-bold text-[#141414]">$0</span>
                </div>
                <div className="flex justify-between text-base font-lato pb-4 border-b border-gray-100">
                  <span className="text-[#686868]">Delivery Fee</span>
                  <span className="font-bold text-[#141414]">$0</span>
                </div>
                <div className="flex justify-between text-xl font-lato font-bold pt-2">
                  <span className="text-[#141414]">Total</span>
                  <span className="text-[#1414114]">
                    ${cartSubtotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0C2E46] cursor-pointer text-white py-4 font-lato font-bold tracking-[0.2em] uppercase hover:bg-[#081F30] transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              {loading ? "Processing..." : "Confirm Order"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CheckoutPage;
