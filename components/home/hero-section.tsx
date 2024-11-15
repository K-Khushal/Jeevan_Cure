"use client";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import React from "react";

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="relative pt-24 lg:pt-28">
        <div className="mx-auto px-6 max-w-7xl md:px-12">
          <div className="text-center sm:mx-auto sm:w-10/12 lg:mr-auto lg:mt-0 lg:w-4/5">
            <div className="mb-8 flex justify-center">
              <a
                href="#"
                className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-gray-600 dark:text-gray-50 ring-1 ring-inset ring-gray-900/10 dark:ring-gray-300 hover:ring-gray-900/20 group"
              >
                <span className="text-title text-sm flex gap-6">
                  Introducing New Jeevan Cure !
                  <div className="flex items-center -space-x-3 group-hover:-translate-x-1 transition-transform duration-300">
                    <span className="w-2.5 translate-y-[-0.3px] -translate-x-px opacity-0 h-[1.5px] rounded bg-gray-950 dark:bg-white origin-left scale-x-0 transition duration-300 group-hover:opacity-100 group-hover:scale-x-100"></span>
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-gray-950 dark:text-white -translate-x-2 transition duration-300 group-hover:translate-x-px"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </div>
                </span>
              </a>
            </div>
            <h1 className="mt-8 text-wrap text-4xl md:text-5xl font-semibold text-title xl:text-5xl xl:[line-height:1.125]">
              Tame the Wild West <br className="hidden sm:block" /> of Frontend
              Development
            </h1>
            <p className="text-wrap mx-auto mt-8 max-w-2xl text-lg">
              Tailwindcss highly customizable components for building modern
              websites and applications that look and feel the way you mean it.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4">
              <Button
                className="rounded-full font-medium text-[16px]"
                size="lg"
              >
                <Rocket />
                Start Building
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
