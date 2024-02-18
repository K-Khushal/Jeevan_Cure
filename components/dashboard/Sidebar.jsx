import Image from "next/image";
import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { FaMapLocationDot } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

export default function Sidebar() {
  return (
    <section className="h-full fixed bg-black text-white">
      <div className="flex flex-col items-center justify-between pb-10 h-full">
        <div className="flex flex-col items-center gap-16 p-4">
          <Link href={"/"}>
            <Image src="/logo.png" alt="Logo" height={80} width={80} />
          </Link>
          <div className="flex flex-col gap-10">
            <Link href={"/dashboard"}>
              <LuLayoutDashboard
                size={40}
                className="cursor-pointer bg-white p-1 text-black rounded-md"
              />
            </Link>

            <Link href={"/dashboard/appointments"}>
              <SlCalender size={40} className="cursor-pointer hover:text-yellow-500" />
            </Link>

            <Link href={"/dashboard/nearby-hospitals"}>
              <FaMapLocationDot
                size={40}
                className="cursor-pointer hover:text-yellow-500"
              />
            </Link>

            <Link href={"/dashboard/profile"}>
              <FaUser 
                size={40}
                className="cursor-pointer hover:text-yellow-500"
              />
            </Link>

          </div>
        </div>
        <Link href={"/"}>
        <SignOutButton>
        <TbLogout2 size={40} className="cursor-pointer hover:text-yellow-500" />
        </SignOutButton>
        </Link>
      </div>
    </section>
  );
}
