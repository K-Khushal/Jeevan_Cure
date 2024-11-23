"use client";

import { AddAppointment } from "@/components/dashboard/appointment/add-appointment";
import { CalendarEvent } from "@/components/dashboard/appointment/full-calender";
import { Calendar } from "@/components/dashboard/appointment/full-calender";
import { CalendarMonthView } from "@/components/dashboard/appointment/full-calender";
import { CalendarWeekView } from "@/components/dashboard/appointment/full-calender";
import { CalendarDayView } from "@/components/dashboard/appointment/full-calender";
import { CalendarNextTrigger } from "@/components/dashboard/appointment/full-calender";
import { CalendarTodayTrigger } from "@/components/dashboard/appointment/full-calender";
import { CalendarPrevTrigger } from "@/components/dashboard/appointment/full-calender";
import { CalendarViewTrigger } from "@/components/dashboard/appointment/full-calender";
import { useUser } from "@/lib/user-context";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";

export default function CalendarView(props: { events: CalendarEvent[] }) {
  const { user } = useUser();

  console.log("User:", user);

  return (
    <Calendar events={props.events}>
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
