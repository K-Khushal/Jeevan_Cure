"use server";

interface AppointmentData {
  title: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  color?: string;
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
  // const { userId } = auth();
  // if (!userId) {
  //   return { error: "User not authenticated" };
  // }

  try {
    //   // Parse date and combine with times
    //   const date = new Date(date);
    //   const [startHour, startMinute] = startTime.split(":").map(Number);
    //   const [endHour, endMinute] = endTime.split(":").map(Number);
    //
    //   const startDateTime = new Date(date);
    //   startDateTime.setHours(startHour, startMinute);
    //
    //   const endDateTime = new Date(date);
    //   endDateTime.setHours(endHour, endMinute);
    //
    //   // Create appointment
    //   const appointmentData = await prisma.appointment.create({
    //     data: {
    //       title,
    //       date,
    //       startTime: startDateTime,
    //       endTime: endDateTime,
    //       color,
    //       userId, // Assuming you want to associate with user
    //     },
    //   });
    //
    //   // Revalidate path to refresh data
    //   revalidatePath("/");
    //
    //   return { data: appointmentData };
    console.log("Appointment created:", title, date, startTime, endTime, color);
    return {
      data: { title, date: new Date(date), startTime, endTime, color },
    };
  } catch (error) {
    console.error("Appointment creation error:", error);
    return { error: "Failed to create appointment" };
  }
}
