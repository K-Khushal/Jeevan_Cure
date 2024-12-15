"use client";

import GetAppointments from "@/actions/get-appointment";
import Loading from "@/app/dashboard/loading";
import { AppointmentsContext } from "@/lib/appointment-context";
import { Appointment } from "@/types/index";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

interface LayoutProps {
  children: ReactNode;
}

export default function AppointmentLayout({ children }: LayoutProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { appointments, error } = await GetAppointments();
        if (error) {
          toast.error(error);
        } else {
          setAppointments(appointments || []);
        }
      } catch (e) {
        toast.error("Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
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
