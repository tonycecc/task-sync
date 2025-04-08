"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignedIn,
    SignUpn,
  SignedOut,
  UserButton,
  useUser
} from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/calendar", label: "Calendar" },
    ...(isSignedIn ? [
      { href: "/task", label: "Tasks" },
      { href: "/groups", label: "Groups" }] : []),
  ];

  return (
      <>
        <div className="h-16 md:h-20"></div>

        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? "py-2 bg-[#00246B]/95 backdrop-blur-sm shadow-lg"
                    : "py-3 bg-[#00246B]"
            }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-10 md:h-14">
              {/* Logo and Brand */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#F3CA40] rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-[#577590] font-bold text-lg">T</span>
                  </div>
                  <span className="text-white font-bold text-xl hidden sm:block">TaskSync</span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`relative font-medium transition-colors ${
                            pathname === link.href
                                ? "text-[#F3CA40]"
                                : "text-white hover:text-[#F9E9EC]"
                        }`}
                    >
                      {link.label}
                      {pathname === link.href && (
                          <motion.span
                              layoutId="underline"
                              className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F3CA40] rounded-full"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                          />
                      )}
                    </Link>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <SignedOut>
                  <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="hidden sm:block"
                  >
                    <SignInButton
                        mode="modal"
                        className="bg-[#F3CA40] text-[#577590] font-semibold px-4 py-1.5 rounded-lg hover:bg-[#F2A541] shadow-md transition-colors"
                    />
                  </motion.div>
                </SignedOut>

                <SignedIn>
                  <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "h-9 w-9",
                          userButtonTrigger:
                              "border-2 border-[#F3CA40] hover:border-white hover:scale-105 transition-all duration-300 rounded-full p-0",
                        },
                      }}
                  />
                </SignedIn>

                <button
                    className="md:hidden flex items-center"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                  <div className="relative w-6 h-5 transform transition-all duration-300">
                  <span
                      className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ${
                          isMobileMenuOpen ? "rotate-45 translate-y-2" : "rotate-0"
                      }`}
                  ></span>
                    <span
                        className={`absolute h-0.5 bg-white transform transition-all duration-300 ${
                            isMobileMenuOpen ? "opacity-0 translate-x-3" : "opacity-100 w-6"
                        }`}
                        style={{ top: "50%", transform: isMobileMenuOpen ? "translateX(20px)" : "none" }}
                    ></span>
                    <span
                        className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ${
                            isMobileMenuOpen ? "-rotate-45 -translate-y-2" : "rotate-0"
                        }`}
                        style={{ bottom: "0" }}
                    ></span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden bg-[#577590] shadow-lg overflow-hidden"
                >
                  <div className="px-4 py-5 space-y-4 border-t border-white/10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`block py-2 text-base font-medium ${
                                pathname === link.href
                                    ? "text-[#F3CA40]"
                                    : "text-white hover:text-[#F9E9EC]"
                            }`}
                        >
                          {link.label}
                        </Link>
                    ))}
                    <SignedOut>
                      <div className="pt-2 pb-1">
                        <SignInButton
                            mode="modal"
                            className="w-full bg-[#F3CA40] text-[#577590] font-semibold px-5 py-2 rounded-lg hover:bg-[#F2A541] shadow-md transition-colors flex justify-center"
                        >
                          Sign In
                        </SignInButton>
                      </div>
                    </SignedOut>
                  </div>
                </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </>
  );
}