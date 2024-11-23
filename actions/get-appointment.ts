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
