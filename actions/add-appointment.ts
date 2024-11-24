"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

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
  userId: string | undefined,
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

  // // Get logged-in user
  // const rawSession = await getSession();
  //
  // const session: Session = JSON.parse(JSON.stringify(rawSession));

  if (!userId) {
    return { error: "User not authenticated" };
  }

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
