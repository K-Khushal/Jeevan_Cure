"use client";

import { Chart as ChartJS, registerables } from "chart.js";
import YearlyReport from "@/components/dashboard/YearlyReport";
import HealthGraphs from "@/components/dashboard/HealthGraphs";
import EmergencyContact from "@/components/dashboard/EmergencyContact";

ChartJS.register(...registerables);

export default function Home() {
  const date = new Date();
  //formatted date
  const fDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-white text-black  py-2">
      <div className="pt-3 flex flex-col m-20">
        <h1 className="font-medium font-serif text-4xl">Health Overview</h1>
        <p className="text-slate-700">{fDate}</p>
        {/* Graphs */}
        <HealthGraphs/>
        <YearlyReport />
        <EmergencyContact/>
      </div>
    </main>
  );
}