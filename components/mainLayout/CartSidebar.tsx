"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllCart, updateCart, deleteCart, clearCart } from "@/services/cart";
import { toast } from "sonner";

interface CartItem {
  id: number;
  quantity: number;
  type: string;
  unit_price: number;
  subtotal: number;
  product: {
    id: number;
    name: string;
    image: string;
  };
}
interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const router = useRouter();

  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const res = await getAllCart();
      if (res?.success) {
        const cartData = res.data?.cart;
        const itemsData = cartData?.items;

        // Ensure items is always an array, even if the API returns an object with numeric keys
        const formattedItems = Array.isArray(itemsData)
          ? itemsData
          : itemsData
            ? Object.values(itemsData)
            : [];

        setItems(formattedItems as CartItem[]);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  const handleUpdateQuantity = async (
    id: number,
    productId: number,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;
    try {
      const res = await updateCart(
        id.toString(),
        productId.toString(),
        newQuantity.toString(),
      );
      if (res?.success) {
        setItems(
          items.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item,
          ),
        );
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        toast.error(res?.message || "Failed to update quantity");
      }
    } catch (error) {
      toast.error("An error occurred while updating quantity");
    }
  };

  const handleRemoveItem = async (id: number) => {
    try {
      const res = await deleteCart(id.toString());
      if (res?.success) {
        setItems(items.filter((item) => item.id !== id));
        window.dispatchEvent(new Event("cartUpdated"));
        toast.success("Item removed from bag");
      } else {
        toast.error(res?.message || "Failed to remove item");
      }
    } catch (error) {
      toast.error("An error occurred while removing item");
    }
  };

  const handleClearBag = async () => {
    try {
      const res = await clearCart();
      if (res?.success) {
        setItems([]);
        window.dispatchEvent(new Event("cartUpdated"));
        toast.success("Bag cleared successfully");
      } else {
        toast.error(res?.message || "Failed to clear bag");
      }
    } catch (error) {
      toast.error("An error occurred while clearing bag");
    }
  };

  const subtotal = Array.isArray(items)
    ? items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0)
    : 0;

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
      document.body.setAttribute("data-lenis-prevent", "true");
    } else {
      document.body.style.overflow = "unset";
      document.body.removeAttribute("data-lenis-prevent");
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.removeAttribute("data-lenis-prevent");
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
              <div className="flex flex-col">
                <h2 className="text-2xl text-[#141414] font-lato font-medium tracking-tight">
                  Your Bag
                </h2>
                {items.length > 0 && (
                  <p className="text-sm text-gray-500 font-lato">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={handleClearBag}
                    className="text-sm font-lato text-red-500 hover:text-red-600 transition-colors uppercase tracking-wider font-bold cursor-pointer px-2 py-1"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6 text-[#141414]" />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div
              className="flex-1 overflow-y-auto px-8 py-6 space-y-8 custom-scrollbar"
              data-lenis-prevent
            >
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0C2E46]"></div>
                </div>
              ) : items.length === 0 ? (
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
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="text-base font-lato font-bold text-[#141414] truncate pr-4">
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 -mr-2 text-gray-400 hover:text-red-500 transition-colors border border-gray-100 rounded-full cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-sm font-lato text-gray-500 capitalize">
                        {item.type}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-base font-lato font-bold text-[#141414]">
                          ${item.unit_price.toLocaleString()}
                        </span>

                        {/* Quantity Selector */}
                        <div className="flex items-center border py-1 border-gray-200 rounded-sm">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.id,
                                item.product.id,
                                item.quantity - 1,
                              )
                            }
                            className="p-1 px-2 hover:bg-gray-50 text-gray-500 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-sm font-lato font-bold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.id,
                                item.product.id,
                                item.quantity + 1,
                              )
                            }
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
