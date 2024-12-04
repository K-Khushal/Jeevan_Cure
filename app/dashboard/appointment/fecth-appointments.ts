"use server";

import GetAppointments from "@/actions/get-appointment";
import { Appointment } from "@/types/index";

export const fetchAppointments = async (): Promise<{
  appointments?: Appointment[];
  error?: string;
}> => {
  try {
    const result = await GetAppointments();
    return {
      appointments: result.appointments,
      error: result.error
    };
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    return {
      error: "Failed to fetch appointments"
    };
  }
};
