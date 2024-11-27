"use client";

import CalendarView from "@/app/dashboard/appointment/calendar-view";
import { AppointmentsContext } from "@/lib/appointment-context";
import { useContext } from "react";

type EventColor = "default" | "blue" | "green" | "pink" | "purple";

export default function AppointmentPage() {
  const appointments = useContext(AppointmentsContext);

  const events =
    appointments?.map((apt) => ({
      id: apt.id,
      start: apt.startTime,
      end: apt.endTime,
      title: apt.title,
      color: (apt.color.toLowerCase() as EventColor) || "default",
    })) || [];

  return <CalendarView events={events} />;
}
