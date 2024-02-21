"use client";

import React from "react";
import { useState, useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";

export default function page() {
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  const URL = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29354.751412366473!2d${position.longitude}!3d${position.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1708264827983!5m2!1sen!2sin`;

  return (
    <main className="min-h-screen relative mx-16 my-10 bg-white text-black flex flex-col justify-around items-start gap-5 p-5">
      {/* <input type="text" value="search" placeholder="search" className="bg-gray-600"/> */}

      <div className="flex w-full items-center">
        <span className="absolute top-9.5 left-7 pl-3 flex items-center text-slate-500">
          <RiSearchLine className="h-5 w-5 text-slate-500 " />
        </span>
        <input
          type="text"
          placeholder={`Search Hospitals`}
          className="w-full text-lg py-4 pl-12 pr-4 rounded-xl bg-gray-200 placeholder:text-slate-500
          text-slate-500 focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>
      <div className="w-full ">
        <iframe
          src={URL}
          width="100%"
          height="400"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl"
        ></iframe>
      </div>
      <h2 className="text-3xl mt-4 font-extrabold">Nearby Hospitals</h2>
      <div className="flex flex-col gap-8 py-4">
        <div>
          <h3 className="font-semibold">California Pacific Medical Center</h3>
          <p className="text-slate-600">
            Hospital <span className="px-2"> 1.5 miles </span>
          </p>
        </div>
        <div>
          <h3 className="font-semibold">UCSF Medical Center</h3>
          <p className="text-slate-600">
            Hospital <span className="px-2"> 3.2 miles </span>
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Saint Francis Memorial Hospital</h3>
          <p className="text-slate-600">
            Hospital <span className="px-2"> 2.1 miles </span>
          </p>
        </div>
        <div>
          <h3 className="font-semibold">
            Zuckerberg San Francisco General Hospital
          </h3>
          <p className="text-slate-600">
            Hospital <span className="px-2"> 0.9 miles </span>
          </p>
        </div>
        <div>
          <h3 className="font-semibold">
            Dignity Health - Saint Mary's Medical Center
          </h3>
          <p className="text-slate-600">
            Hospital <span className="px-2"> 1.7 miles </span>
          </p>
        </div>
      </div>
      {/* <div>
        <h2>My Current Location</h2>
        {position.latitude && position.longitude ? (
          <p className="text-black bg-white">
            Latitude: {position.latitude}, Longitude: {position.longitude}
          </p>
        ) : (
          <p className="text-black bg-white">
            Loading...Allow Location Permission
          </p>
        )}
      </div> */}
    </main>
  );
}
