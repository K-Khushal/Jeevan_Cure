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
import { addHours } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Page() {
  return (
    <Calendar
      events={[
        {
          id: "1",
          start: new Date(),
          end: addHours(new Date(), 1),
          title: "event A",
          color: "pink",
        },
        {
          id: "2",
          start: addHours(new Date(), 1.5),
          end: addHours(new Date(), 1),
          title: "event B",
          color: "blue",
        },
      ]}
    >
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