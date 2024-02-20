"use client"

import React from "react";
import { useState, useEffect } from 'react';

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

    const URL = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29354.751412366473!2d${position.longitude}!3d${position.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1708264827983!5m2!1sen!2sin`


    return (
        <main className="min-h-screen bg-white text-black flex flex-col justify-around items-start gap-5 p-5">
            <h2 className="text-4xl mt-4 font-bold tracking-[5px] font-serif">Nearby Hospitals</h2>
            <div>
                <h2>My Current Location</h2>
                {position.latitude && position.longitude ? (
                    <p>
                        Latitude: {position.latitude}, Longitude: {position.longitude}
                    </p>
                ) : (
                    <p>Loading...Allow Location Permission</p>
                )}
            </div>
            <iframe
                src={URL}
                width="100%"
                height="600"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </main>
    );
}