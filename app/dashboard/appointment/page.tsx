"use client";

import GetAppointments from "@/actions/get-appointment";
import CalendarView from "@/app/dashboard/appointment/calendar-view";
import Loading from "@/app/dashboard/loading";
import { Appointment } from "@/types/index";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";

type EventColor = "default" | "blue" | "green" | "pink" | "purple";

export default function AppointmentPage() {
  const [appointments, setAppointments] = useState<Appointment[] | undefined>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { appointments, error } = await GetAppointments();
        if (error) {
          toast.error(error);
        }
        setAppointments(appointments);
      } catch (e) {
        toast.error("Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [router]);

  const events =
    appointments?.map((apt) => ({
      id: apt.id,
      start: apt.startTime,
      end: apt.endTime,
      title: apt.title,
      color: (apt.color.toLowerCase() as EventColor) || "default",
    })) || [];

  if (loading) {
    return <Loading />;
  }

  return <CalendarView events={events} />;
}
