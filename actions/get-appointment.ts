"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

async function GetAppointments(userId: string | undefined): Promise<{
  appointments?: Appointment[];
  error?: string;
}> {
  try {
    if (!userId) {
      return { error: "Not authenticated" };
    }

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
