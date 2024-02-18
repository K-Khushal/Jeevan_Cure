import React from "react";

export default function page() {
  return (
    <main className="min-h-screen bg-white text-black flex flex-col justify-around items-start gap-5 p-5">
      <h2 className="text-4xl mt-4 font-bold tracking-[5px] font-serif">Nearby Hospitals</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29354.751412366473!2d72.5778432!3d23.1211008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1708248487990!5m2!1sen!2sin"
        width="100%"
        height="600"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </main>
  );
}
