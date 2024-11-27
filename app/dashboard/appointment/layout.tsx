"use client";

import { fetchAppointments } from "@/app/dashboard/appointment/fecth-appointments";
import Loading from "@/app/dashboard/loading";
import { AppointmentsContext } from "@/lib/appointment-context";
import { Appointment } from "@/types/index";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

interface LayoutProps {
  children: ReactNode;
}

export default function AppointmentLayout({ children }: LayoutProps) {
  const [appointments, setAppointments] = useState<Appointment[] | undefined>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointmentsData = async () => {
      try {
        const appointments = await fetchAppointments();
        setAppointments(appointments?.appointments);
      } catch (error) {
        toast.error("Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentsData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <AppointmentsContext.Provider value={appointments}>
      {children}
    </AppointmentsContext.Provider>
  );
}
