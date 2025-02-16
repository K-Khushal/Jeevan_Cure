import { SignInButton } from "@/components/auth/sign-in-btn";
import { SignInFallback } from "@/components/auth/sign-in-btn";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Suspense } from "react";

export default function Navbar() {
  return (
    <nav className="fixed overflow-hidden z-20 w-full border-b bg-white/50 dark:bg-gray-950/50 backdrop-blur-2xl">
      <div className="px-6 m-auto max-w-6xl ">
        <div className="flex flex-wrap items-center justify-between py-2 sm:py-4">
          <div className="w-full items-center flex justify-between lg:w-auto">
            <Link href="/public" aria-label="logo">
              <Image
                className="block h-10 w-auto"
                height="250"
                width="250"
                src="/Logo.png"
                alt="Logo"
              />
            </Link>
            <div className="flex lg:hidden">
              <button
                aria-label="open menu"
                className="btn variant-ghost sz-md icon-only relative z-20 -mr-2.5 block cursor-pointer lg:hidden"
              >
                <svg
                  className="text-title m-auto size-6 transition-[transform,opacity] duration-300 group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                  ></path>
                </svg>
                <svg
                  className="text-title absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 transition-[transform,opacity] duration-300 group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full group-data-[state=active]:h-fit h-0 lg:w-fit flex-wrap justify-end items-center space-y-8 lg:space-y-0 lg:flex lg:h-fit md:flex-nowrap">
            <div className="mt-6 dark:text-body md:-ml-4 lg:pr-4 lg:mt-0">
              <ul className="space-y-6 tracking-wide text-base lg:text-sm lg:flex lg:space-y-0">
                <li>
                  <a href="#" className="hover:link md:px-4 block">
                    <span>Product</span>
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:link md:px-4 block">
                    <span>Playground</span>
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:link md:px-4 block">
                    <span>Docs</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:link md:px-4 block">
                    <span>Blog</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-full space-y-2 gap-2 pt-6 pb-4 lg:pb-0 border-t items-center flex flex-col lg:flex-row lg:space-y-0 lg:w-fit lg:border-l lg:border-t-0 lg:pt-0 lg:pl-2">
              <Suspense fallback={<SignInFallback />}>
                <SignInButton />
              </Suspense>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
