"use server";

import { getCurrentSession } from "@/actions/get-active-session";
import prisma from "@/lib/db";
import { Appointment } from "@/types/index";

async function GetAppointments(): Promise<{
  appointments?: Appointment[];
  error?: string;
}> {
  try {
    const session = await getCurrentSession();

    if (!session) {
      return { error: "Not authenticated" };
    }

    const userId = session.user.id;

    // Get appointments for user
    const appointments = await prisma.appointment.findMany({
      where: {
        userId: userId,
      },
    });

    return { appointments };
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return { error: "Failed to fetch appointments" };
  }
}

export default GetAppointments;
