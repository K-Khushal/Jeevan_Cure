"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

interface Appointment {
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
    // Get logged-in user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return { error: "Not authenticated" };
    }

    const userId = session.user.id;

    // Get appointments for user
    const appointments = await prisma.appointment.findMany({
      where: { userId },
      orderBy: {
        date: "asc", // Sort by date ascending
      },
    });

    return { appointments };
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return { error: "Failed to fetch appointments" };
  }
}

export default GetAppointments;
