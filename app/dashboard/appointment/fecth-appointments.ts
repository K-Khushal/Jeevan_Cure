"use server";

import GetAppointments from "@/actions/get-appointment";

export const fetchAppointments = async () => {
  try {
    return await GetAppointments();
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    return;
  }
};
