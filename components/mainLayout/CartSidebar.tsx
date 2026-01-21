"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  option: string;
  quantity: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const router = useRouter();

  // Mock data for demonstration - in a real app this would come from a context/store
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "Make Us One Within You",
      price: 2000,
      image:
        "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=2070&auto=format&fit=crop",
      option: "Framed",
      quantity: 1,
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-60 bg-black/40 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-70 h-full w-full max-w-[450px] bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between  px-8 py-6 border-b border-gray-100">
              <h2 className="text-2xl text-[#141414]  font-lato font-medium tracking-tight">
                Your Bag
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-6 h-6 text-[#141414]" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <p className="text-gray-500 font-lato">Your bag is empty</p>
                  <button
                    onClick={onClose}
                    className="text-[#0C2E46] font-bold underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-6">
                    {/* Item Image */}
                    <div className="relative w-24 h-24 shrink-0 bg-gray-50 rounded-sm overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="text-base font-lato font-bold text-[#141414] truncate pr-4">
                          {item.title}
                        </h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 -mr-2 text-gray-400 hover:text-red-500 transition-colors border border-gray-100 rounded-full cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-sm font-lato text-gray-500">
                        {item.option}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-base font-lato font-bold text-[#141414]">
                          ${item.price.toLocaleString()}
                        </span>

                        {/* Quantity Selector */}
                        <div className="flex items-center border py-1 border-gray-200 rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 px-2 hover:bg-gray-50 text-gray-500 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-sm font-lato font-bold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 px-2 hover:bg-gray-50 text-gray-500 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-8 py-8 border-t border-gray-100 space-y-6 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-lato text-[#686868]">
                    Subtotal
                  </span>
                  <span className="text-2xl font-lato font-bold text-[#141414]">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#0C2E46] text-white py-4 font-lato font-bold tracking-[0.2em] uppercase hover:bg-[#081F30] transition-all active:scale-[0.98] cursor-pointer"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
