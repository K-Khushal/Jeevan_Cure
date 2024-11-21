"use server";

import { auth } from "@/lib/auth";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const prisma = new PrismaClient();

interface AppointmentData {
  title: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  color?: string;
  userId?: string;
}

export async function addAppointment(
  appointmentData: AppointmentData,
): Promise<{ data?: AppointmentData; error?: string }> {
  // Extract form values
  const {
    title,
    date,
    startTime,
    endTime,
    color = "default",
  } = appointmentData;

  // Validate inputs
  if (!title || !date || !startTime || !endTime) {
    return { error: "Missing required appointment details" };
  }

  // Get logged-in user
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return { error: "User not authenticated" };
  }

  const userId = session.user.id;

  try {
    // Create appointment
    const appointmentData = await prisma.appointment.create({
      data: {
        title,
        date,
        startTime,
        endTime,
        color,
        userId: userId, // Assuming you want to associate with user
      },
    });

    // Revalidate path to refresh data
    revalidatePath("/dashboard");

    return { data: appointmentData };
  } catch (error) {
    console.error("Appointment creation error:", error);
    return { error: "Failed to create appointment" };
  }
}
