"use client";

import { addAppointment } from "@/actions/add-appointment";
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
import { Loader2 } from "lucide-react";
import { CalendarIcon } from "lucide-react";
import { CalendarPlus } from "lucide-react";
import React from "react";
import { useState } from "react";
import { toast } from "sonner";

export function AddAppointment() {
  const [formData, setFormData] = useState({
    title: "",
    date: new Date(),
    startTime: "",
    endTime: "",
    color: "default",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    { value: "default", label: "Default" },
    { value: "pink", label: "Pink" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "purple", label: "Purple" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Extract and merge date and time
    const mergeDateTime = (date: Date | null, time: string): Date => {
      if (!date) throw new Error("Date is required");
      const [hours, minutes] = time.split(":").map(Number);
      const mergedDate = new Date(date); // Clone the date
      mergedDate.setHours(hours, minutes, 0, 0); // Set time
      return mergedDate;
    };

    try {
      const start = mergeDateTime(formData.date, formData.startTime);
      const end = mergeDateTime(formData.date, formData.endTime);

      // Validate that start is before end
      if (start >= end) {
        toast.error("Start time must be earlier than end time");
        return;
      }

      const newFormData = {
        title: formData.title,
        date: formData.date,
        startTime: start,
        endTime: end,
        color: formData.color,
      };

      // Submit to your backend
      const { data, error } = await addAppointment(newFormData);
      if (error) {
        toast.error(error);
      } else {
        toast.success("Appointment added successfully");
        console.log("Appointment created:", data);

        // Reset form
        setFormData({
          title: "",
          date: new Date(),
          startTime: "",
          endTime: "",
          color: "default",
        });
        setIsSubmitting(false);
        setIsOpen(false);
      }
    } catch (error) {
      toast.error("An error occurred while processing the form.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
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
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                required
                placeholder="Enter a title"
                className="col-span-3"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
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
                      !formData.date && "text-muted-foreground",
                    )}
                  >
                    {formData.date ? (
                      format(formData.date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) =>
                      setFormData({ ...formData, date: date! })
                    }
                    required
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startTime">Start Time</Label>
              <Select
                value={formData.startTime}
                onValueChange={(startTime) =>
                  setFormData({ ...formData, startTime })
                }
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
              <Select
                value={formData.endTime}
                onValueChange={(endTime) =>
                  setFormData({ ...formData, endTime })
                }
              >
                <SelectTrigger className="font-normal focus:ring-0 col-span-3">
                  <SelectValue placeholder="Select an end time" />
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
              <Select
                value={formData.color}
                onValueChange={(color) => setFormData({ ...formData, color })}
              >
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
            <Button type="submit">
              {isSubmitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
