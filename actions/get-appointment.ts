"use server";

import { prisma } from "@/lib/db";

export interface Appointment {
  id: string;
  title: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

async function GetAppointments(): Promise<{
  appointments?: Appointment[];
  error?: string;
}> {
  try {
    // const session = await getSession();
    //
    // if (!session) {
    //   return { error: "Not authenticated" };
    // }
    //
    // const userId = session.user.id;
    // console.log("User ID:", userId);

    // Get appointments for user
    const appointments = await prisma.appointment.findMany({
      where: {
        userId: "GZ_R5I_3w7ymvbZmX_4pN",
      },
    });

    return { appointments };
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return { error: "Failed to fetch appointments" };
  }
}

export default GetAppointments;
