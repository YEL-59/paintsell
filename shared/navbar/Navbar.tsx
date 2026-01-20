"use client";

import { useState } from "react";
import { Search, User, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPrintsOpen, setIsPrintsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Product", href: "/products" },
    { name: "Original Works", href: "/original-works" },
    {
      name: "Prints",
      href: "/prints",
      hasDropdown: true,
    },
    { name: "Event", href: "/events" },
    { name: "About US", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 z-50 w-full px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="mx-auto container">
        <div className="flex items-center justify-between rounded-[73px] bg-black/20 px-8 py-5 backdrop-blur-sm ring-1 ring-white/10">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="text-2xl tracking-[0.3em] text-white transition-all font-light duration-300 hover:opacity-80 sm:text-[32px]"
            >
              ARTIS
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 font-lato lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.name} className="relative">
                  {link.hasDropdown ? (
                    <button
                      onMouseEnter={() => setIsPrintsOpen(true)}
                      onMouseLeave={() => setIsPrintsOpen(false)}
                      className={cn(
                        "group flex items-center space-x-1 text-sm lg:text-lg tracking-wide transition-all duration-300 text-white hover:text-white",
                        isActive ? " font-semibold" : "",
                      )}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute -bottom-1 left-0 h-px w-full bg-white"
                        />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "relative text-sm lg:text-lg transition-all duration-300 text-white hover:text-white after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full",
                        isActive ? "after:w-full font-semibold" : "",
                      )}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-6">
            {/* Search Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Search"
              className="group relative hidden text-white/90 transition-all duration-300 hover:text-white sm:block"
            >
              <Search className="h-5 w-5" />
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </motion.button>

            {/* User Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="User Account"
              className="group relative hidden text-white/90 transition-all duration-300 hover:text-white sm:block"
            >
              <User className="h-5 w-5" />
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </motion.button>

            {/* Cart Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Shopping Cart"
              className="group relative text-white/90 transition-all duration-300 hover:text-white"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white/90 transition-all duration-300 hover:text-white lg:hidden"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="mt-4 lg:hidden"
          >
            <div className="overflow-hidden rounded-3xl bg-black/40 px-4 pb-4 pt-2 backdrop-blur-md ring-1 ring-white/10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div variants={itemVariants} key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-base font-light tracking-wide transition-all duration-300 hover:bg-white/10 hover:text-white",
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-white shadow-none",
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile Search */}
              <motion.button
                variants={itemVariants}
                className="flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-base font-light tracking-wide text-white transition-all duration-300 hover:bg-white/10 hover:text-white sm:hidden"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </motion.button>

              {/* Mobile User */}
              <motion.button
                variants={itemVariants}
                className="flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-base font-light tracking-wide text-white transition-all duration-300 hover:bg-white/10 hover:text-white sm:hidden"
              >
                <User className="h-4 w-4" />
                <span>Account</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
