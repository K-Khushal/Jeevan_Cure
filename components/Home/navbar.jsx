"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { nav_items } from "@/constants";

export default function Navbar() {
  const path = usePathname();
  return (
    <nav className="flex justify-between items-center h-24 px-32 bg-white text-blue-950 shadow">
      <div>
        <img src="/logo.png" alt="JeevanCare" className="h-16 mx-4" />
      </div>
      <div className="flex items-center gap-10">
        {nav_items.map((link, index) => (
          <a href={link.href} key={index}
          className={`${path === link.href ? 'font-bold' : ''}`}>
            {link.label}
          </a>
        ))}
          <a href="/Dashboard" className="bg-blue-600 px-8 py-2 rounded-xl font-bold text-white">Login</a>
      </div>
    </nav>
  );
}
