"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser
} from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="bg-[#577590] py-4 shadow-md">
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-between">
        
        {/* <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <span className="text-white font-bold text-xl">TaskSync</span>
          </Link>
        </div> */}

        <div className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="text-white font-medium hover:text-[#F9E9EC] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-white font-medium hover:text-[#F9E9EC] transition-colors"
          >
            About
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton
              mode="modal"
              className="bg-[#F3CA40] text-[#577590] font-semibold px-4 py-2 rounded hover:bg-[#F2A541] transition-colors"
            />
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-9 w-9",
                  userButtonTrigger:
                    "text-white hover:bg-white/10 transition-colors rounded-full p-1",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
