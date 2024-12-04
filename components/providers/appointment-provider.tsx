"use client";

import { AppointmentsContext } from "@/lib/appointment-context";
import { Appointment } from "@/types";
import { ReactNode } from "react";

interface AppointmentProviderProps {
  appointments?: Appointment[];
  children: ReactNode;
}

export function AppointmentProvider({ appointments, children }: AppointmentProviderProps) {
  return (
    <AppointmentsContext.Provider value={appointments}>
      {children}
    </AppointmentsContext.Provider>
  );
}
