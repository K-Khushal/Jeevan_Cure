import GetAppointments from "@/actions/get-appointment";
import CalendarView from "@/app/dashboard/appointment/calendar-view";
import { getSession } from "@/lib/auth";

type EventColor = "default" | "blue" | "green" | "pink" | "purple";

export default async function AppointmentPage() {
  const session = await getSession();
  console.log(session);
  const { appointments, error } = await GetAppointments();

  const events =
    appointments?.map((apt) => ({
      id: apt.id,
      start: apt.startTime,
      end: apt.endTime,
      title: apt.title,
      color: (apt.color.toLowerCase() as EventColor) || "default",
    })) || [];

  return <CalendarView events={events} />;
}
