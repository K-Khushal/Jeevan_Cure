import { fetchAppointments } from "@/app/dashboard/appointment/fecth-appointments";
import { AppointmentProvider } from "@/components/providers/appointment-provider";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default async function AppointmentLayout({ children }: LayoutProps) {
  const { appointments, error } = await fetchAppointments();

  if (error) {
    throw new Error(error);
  }

  return (
    <AppointmentProvider appointments={appointments}>
      {children}
    </AppointmentProvider>
  );
}
