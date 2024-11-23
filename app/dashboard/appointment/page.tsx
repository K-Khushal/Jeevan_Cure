import GetAppointments from "@/actions/get-appointment";
import { AddAppointment } from "@/components/dashboard/appointment/add-appointment";
import {
  Calendar,
  CalendarDayView,
  CalendarMonthView,
  CalendarNextTrigger,
  CalendarPrevTrigger,
  CalendarTodayTrigger,
  CalendarViewTrigger,
  CalendarWeekView,
} from "@/components/dashboard/appointment/full-calender";
import { getSession } from "@/lib/auth";
import { ChevronLeft, ChevronRight } from "lucide-react";

type EventColor = "default" | "blue" | "green" | "pink" | "purple";

export default async function AppointmentPage() {
  const session = await getSession();
  const userId = session?.user.id;

  const { appointments, error } = await GetAppointments(userId);

  const events =
    appointments?.map((apt) => ({
      id: apt.id,
      start: apt.startTime,
      end: apt.endTime,
      title: apt.title,
      color: (apt.color.toLowerCase() as EventColor) || "default",
    })) || [];

  return (
    <Calendar events={events}>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex px-6 items-center gap-2">
          <CalendarViewTrigger
            className="aria-[current=true]:bg-accent"
            view="day"
          >
            Day
          </CalendarViewTrigger>
          <CalendarViewTrigger
            view="week"
            className="aria-[current=true]:bg-accent"
          >
            Week
          </CalendarViewTrigger>
          <CalendarViewTrigger
            view="month"
            className="aria-[current=true]:bg-accent"
          >
            Month
          </CalendarViewTrigger>

          <span className="flex-1" />

          <AddAppointment />
        </div>
        <div className="flex px-6 items-center justify-end gap-2 mb-6">
          {/*<CalendarCurrentDate />*/}

          <CalendarPrevTrigger>
            <ChevronLeft size={20} />
            <span className="sr-only">Previous</span>
          </CalendarPrevTrigger>

          <CalendarTodayTrigger>Today</CalendarTodayTrigger>

          <CalendarNextTrigger>
            <ChevronRight size={20} />
            <span className="sr-only">Next</span>
          </CalendarNextTrigger>
        </div>

        <div className="flex-1 px-6 overflow-hidden">
          <CalendarDayView />
          <CalendarWeekView />
          <CalendarMonthView />
        </div>
      </div>
    </Calendar>
  );
}
