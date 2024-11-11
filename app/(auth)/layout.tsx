"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthLayout(props: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full dark:bg-black bg-white flex justify-center items-center">
      <div className="absolute top-8 left-8">
        <button onClick={() => router.back()} className="flex items-center">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </button>
      </div>
      <div className="lg:w-7/12 w-full">{props.children}</div>
    </div>
  );
}
