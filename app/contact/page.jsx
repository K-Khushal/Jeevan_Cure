import React from "react";
import Navbar from "@/components/Home/navbar";
import Footer from "@/components/Home/Footer";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaAddressCard } from "react-icons/fa6";

export default function page() {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-white text-black flex flex-col justify-start items-center pt-20 gap-20">
        <h2 className="text-5xl font-bold font-serif">Get in Touch with us!</h2>
        {/* contact details */}
        <div className="flex justify-between gap-20">
          <FaAddressCard size={350} className="text-sky-700" />
          <div className="mt-8">
            {/* <p className="text-lg font-semibold">Contact Details:</p> */}
            <ul className="flex flex-col gap-20 justify-between p-8">
              <li className="flex gap-5 items-center text-3xl">
                <MdEmail /> info@example.com
              </li>
              <li className="flex gap-5 items-center text-3xl">
                <FaPhoneAlt /> +1 (123) 456-7890
              </li>
              <li className="flex gap-5 items-center text-3xl">
                <FaLocationDot /> 123 Main Street, Cityville
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
