import { Session } from "@/lib/auth-types";
import { prisma } from "@/lib/db";

interface Appointment {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  color: string;
  createdAt: string;
  updatedAt: string;
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
      where: {
        userId: userId,
      },
    });

    const serializedAppointments: Appointment[] = appointments.map((apt) => ({
      ...apt,
      date: apt.date.toISOString(),
      startTime: apt.startTime.toISOString(),
      endTime: apt.endTime.toISOString(),
      createdAt: apt.createdAt.toISOString(),
      updatedAt: apt.updatedAt.toISOString(),
    }));

    return { appointments: serializedAppointments };
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return { error: "Failed to fetch appointments" };
  }
}

export default GetAppointments;
