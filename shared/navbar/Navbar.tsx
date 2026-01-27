"use client";

import { useState, useEffect } from "react";
import { Search, User, ShoppingCart, Menu, X, ChevronDown, LogOut, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import CartSidebar from "@/components/mainLayout/CartSidebar";
import { getCurrentUser, logout } from "@/services/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const Navbar = ({ initialUser }: { initialUser: any }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPrintsOpen, setIsPrintsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(initialUser);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Only fetch if initialUser is null or we navigated
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, [pathname, initialUser]); // Refresh user state on page change or if initialUser changes


  const handleLogout = async () => {
    try {
      await logout();
      setCurrentUser(null);
      toast.success("Logged out successfully");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

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
      className="fixed top-0 z-50 w-full px-4 py-6 sm:px-5 lg:px-8"
    >
      <div className="mx-auto container">
        <div className="flex items-center justify-between rounded-[73px] bg-black/20 px-8 py-5 backdrop-blur-sm ring-1 ring-white/10">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="text-lg tracking-[0.3em] text-white transition-all font-light duration-300 hover:opacity-80 "
            >
              Tevel Michaelness
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 font-lato lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const dropdownItems =
                link.name === "Prints"
                  ? [
                      { name: "Prints", href: "/prints" },
                      { name: "Small Print", href: "/prints/small" },
                      {
                        name: "Limited addition print",
                        href: "/prints/limited",
                      },
                    ]
                  : [];

              return (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => link.hasDropdown && setIsPrintsOpen(true)}
                  onMouseLeave={() =>
                    link.hasDropdown && setIsPrintsOpen(false)
                  }
                >
                  {link.hasDropdown ? (
                    <div className="relative">
                      <button
                        className={cn(
                          "flex items-center space-x-1 text-sm lg:text-lg tracking-wide transition-all duration-300 text-white hover:text-white",
                          isActive ? " font-semibold" : "",
                        )}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            isPrintsOpen ? "rotate-180" : "",
                          )}
                        />
                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute -bottom-1 left-0 h-px w-full bg-white"
                          />
                        )}
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {isPrintsOpen && (
                          <>
                            {/* Hover Bridge */}
                            <div className="absolute top-full left-0 h-4 w-full" />
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="absolute left-1/2 top-[calc(100%+8px)] w-64 -translate-x-1/2 overflow-hidden rounded-2xl bg-black/40 p-1.5 backdrop-blur-md ring-1 ring-white/10 shadow-2xl"
                            >
                              <div className="flex flex-col space-y-1">
                                {dropdownItems.map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className="rounded-xl px-4 py-3 text-[15px] font-light tracking-wide text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white"
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
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

            {/* User Dropdown / Login */}
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center focus:outline-none"
                  >
                    <Avatar className="h-8 w-8 ring-1 ring-white/20 transition-all hover:ring-white/50">
                      <AvatarImage src={currentUser.image || currentUser.avatar || currentUser.profile_image} alt={currentUser.name} />
                      <AvatarFallback className="bg-white/10 text-[10px] text-white font-medium">
                        {currentUser.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 mt-4 border-white/10 bg-black/70 text-white backdrop-blur-xl rounded-[24px] p-2 shadow-2xl ring-1 ring-white/10">
                  <DropdownMenuLabel className="px-4 py-4 font-normal">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12 ring-2 ring-white/10 shadow-lg">
                        <AvatarImage src={currentUser.image || currentUser.avatar || currentUser.profile_image} />
                        <AvatarFallback className="bg-white/10 text-sm font-medium">
                          {currentUser.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-0.5 overflow-hidden">
                        <p className="text-[15px] font-semibold tracking-tight truncate">{currentUser.name || "User"}</p>
                        <p className="text-[11px] text-white/50 truncate font-light">{currentUser.email}</p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5 mx-2" />
                  <DropdownMenuItem className="rounded-xl px-4 py-3 text-[14px] font-normal tracking-wide hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer transition-all duration-200 mt-1" asChild>
                    <Link href="/contact" className="flex items-center">
                      <Phone className="mr-3 h-4 w-4 text-white/60" />
                      <span>Contact Center</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/5 mx-2 mt-1" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="rounded-xl px-4 py-3 text-[14px] font-normal tracking-wide text-red-400 hover:bg-red-500/10 hover:text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer transition-all duration-200 mt-1"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>

              </DropdownMenu>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  href="/auth/login"
                  aria-label="User Account"
                  className="group relative flex text-white/90 transition-all duration-300 hover:text-white sm:block"
                >
                  <User className="h-5 w-5" />
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            )}

            {/* Cart Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Shopping Cart"
              onClick={() => setIsCartOpen(true)}
              className="group relative text-white/90 transition-all duration-300 hover:text-white cursor-pointer"
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
            <div className="overflow-hidden font-lato rounded-3xl bg-black/40 px-4 pb-4 pt-2 backdrop-blur-md ring-1 ring-white/10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const dropdownItems =
                  link.name === "Prints"
                    ? [
                        { name: "Prints", href: "/prints" },
                        { name: "Small Print", href: "/prints/small" },
                        {
                          name: "Limited addition print",
                          href: "/prints/limited",
                        },
                      ]
                    : [];

                return (
                  <motion.div variants={itemVariants} key={link.name}>
                    {link.hasDropdown ? (
                      <div className="flex flex-col">
                        <button
                          onClick={() => setIsPrintsOpen(!isPrintsOpen)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-light tracking-wide transition-all duration-300 hover:bg-white/10 hover:text-white",
                            isActive ? "bg-white/10 text-white" : "text-white",
                          )}
                        >
                          <span>{link.name}</span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-300",
                              isPrintsOpen ? "rotate-180" : "",
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {isPrintsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden bg-white/5 mx-2 my-1 rounded-xl"
                            >
                              {dropdownItems.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block rounded-xl px-4 py-3 text-[14px] font-light tracking-wide text-white/70 transition-all duration-300 hover:text-white"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
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
                    )}
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

              {/* Mobile User Section */}
              {currentUser ? (
                <>
                  <motion.div variants={itemVariants} className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={currentUser.image || currentUser.avatar || currentUser.profile_image} />
                        <AvatarFallback className="bg-white/10 text-xs font-medium text-white">
                          {currentUser.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">{currentUser.name}</span>
                        <span className="text-[10px] text-white/50">{currentUser.email}</span>
                      </div>
                    </div>
                  </motion.div>
                  <motion.button
                    variants={itemVariants}
                    onClick={handleLogout}
                    className="flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-base font-light tracking-wide text-red-400 transition-all duration-300 hover:bg-red-500/10"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </motion.button>
                </>
              ) : (
                <motion.div variants={itemVariants}>
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-base font-light tracking-wide text-white transition-all duration-300 hover:bg-white/10"
                  >
                    <User className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </motion.nav>
  );
};

export default Navbar;

