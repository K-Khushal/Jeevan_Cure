"use server";

import { Session } from "@/lib/auth-types";
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

async function GetAppointments(session: Session): Promise<{
  appointments?: Appointment[];
  error?: string;
}> {
  try {
    if (!session) {
      return { error: "Not authenticated" };
    }

    const userId = session.user.id;
    console.log("User ID:", userId);

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
