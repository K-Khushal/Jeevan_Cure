"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PopoverTrigger } from "@/components/ui/popover";
import { Popover } from "@/components/ui/popover";
import { PopoverContent } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { CalendarPlus } from "lucide-react";
import { useState } from "react";

export function AddAppointment() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState<string>();
  const [endtime, setEndTime] = useState<string>();

  function generateTimeOptions() {
    return Array.from({ length: 96 }).map((_, i) => {
      const hour = Math.floor(i / 4)
        .toString()
        .padStart(2, "0");
      const minute = ((i % 4) * 15).toString().padStart(2, "0");
      return (
        <SelectItem key={i} value={`${hour}:${minute}`}>
          {hour}:{minute}
        </SelectItem>
      );
    });
  }

  const colorOptions = [
    {
      value: "default",
      label: "Default",
    },
    {
      value: "pink",
      label: "Pink",
    },
    {
      value: "blue",
      label: "Blue",
    },
    {
      value: "green",
      label: "Green",
    },
    {
      value: "purple",
      label: "Purple",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CalendarPlus />
          Add Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Appointment</DialogTitle>
          <DialogDescription>
            Add a new appointment and click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name">Title</Label>
            <Input
              id="title"
              required={true}
              placeholder="Enter a title"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "font-normal col-span-3 px-3 py-2 justify-between",
                    !date && "text-muted-foreground",
                  )}
                >
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                  <CalendarIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  required={true}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startTime">Start Time</Label>
            <Select
              defaultValue={startTime!}
              required={true}
              onValueChange={(e) => {
                setStartTime(e);
                if (date) {
                  const [hours, minutes] = e.split(":");
                  const newDate = new Date(date.getTime());
                  newDate.setHours(parseInt(hours), parseInt(minutes));
                  setDate(newDate);
                }
              }}
            >
              <SelectTrigger className="font-normal focus:ring-0 col-span-3">
                <SelectValue placeholder="Select a start time" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-[15rem]">
                  {generateTimeOptions()}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endTime">End Time</Label>
            <Select defaultValue={startTime!} required={true}>
              <SelectTrigger className="font-normal focus:ring-0 col-span-3">
                <SelectValue placeholder="Select a end time" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-[15rem]">
                  {generateTimeOptions()}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color">Color</Label>
            <Select>
              <SelectTrigger className="font-normal focus:ring-0 col-span-3">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    {color.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={(data) => {
              console.log(
                `Date: ${date}, StartTime: ${startTime}, EndTime: ${endtime}`,
              );
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
