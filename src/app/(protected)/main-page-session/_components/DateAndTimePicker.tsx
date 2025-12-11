"use client";

import React, { Dispatch, useEffect, useState } from "react";
import { CalendarRange, Clock } from "lucide-react";
import {
  Button,
  Calendar,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { CreateSessionType } from "@/lib/types";

export const DateAndTimePicker = ({
  value,
  setValue,
  time,
  setTime,
  date,
  setDate,
  allSessions,
}: {
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
  time: string;
  setTime: Dispatch<React.SetStateAction<string>>;
  date: Date | undefined;
  setDate: Dispatch<React.SetStateAction<Date | undefined>>;
  allSessions: CreateSessionType[];
}) => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const [isWeekend, setIsWeekend] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [month, setMonth] = useState<Date | undefined>(date);
  const schedules = ["13:00", "14:00", "15:00", "16:00", "17:00"];

  const formatDate = (date: Date | undefined): string => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const checkWeekend = (date: Date) => {
    setIsWeekend(date.getDay() === 0 || date.getDay() === 6);
  };

  const fullyBookedDates = [
    ...new Set(
      allSessions
        .filter(
          (session) =>
            allSessions.filter((s) => s.value === session.value).length ===
            schedules.length
        )
        .map((session) => session.value)
    ),
  ];

  const alreadyScheduled = allSessions
    .filter((session) => session.value === value)
    .map((session) => session.time);

  const availableTimes = schedules.filter(
    (schedule) => !alreadyScheduled.includes(schedule)
  );

  const weekdayTimes = availableTimes.filter((schedule) => schedule >= "13:00");
  const weekendTimes = availableTimes.filter((schedule) => schedule <= "16:00");

  useEffect(() => {
    if (date) checkWeekend(date);
  }, [value, date]);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <Label>Date</Label>
        <div className="relative flex gap-2">
          <Input
            id="date"
            value={value}
            placeholder="Өдрөө сонгоно уу"
            onChange={(e) => {
              const date = new Date(e.target.value);
              setValue(e.target.value);
              if (!isNaN(date.getDate())) {
                setDate(date);
                setMonth(date);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setOpen(true);
              }
            }}
            className="border-border/20 bg-black/50 hover:bg-black text-white/80"
          />

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id="date-picker"
                variant="ghost"
                className="absolute hover:bg-black top-1/2 right-2 size-6 -translate-y-1/2 text-white/80 hover:text-white/80"
              >
                <CalendarRange />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="w-auto overflow-hidden p-0 bg-[black] text-white"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                className="bg-[#0F2343]"
                mode="single"
                selected={date}
                captionLayout="dropdown"
                month={month}
                onMonthChange={setMonth}
                disabled={[
                  (day) => day < today,
                  (day) => day.toDateString() === today.toDateString(),
                  (day) => day.toDateString() === tomorrow.toDateString(),
                  (day) => fullyBookedDates.includes(formatDate(day)),
                ]}
                onSelect={(date) => {
                  if (!date) return;
                  setDate(date);
                  setValue(formatDate(date));
                  setOpen(false);
                  checkWeekend(date);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker">Start time</Label>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-between border-border/20 bg-black/50 hover:bg-black text-white/80 hover:text-white/80"
            >
              {time || (
                <span className="text-muted-foreground">Цаг сонгоно уу...</span>
              )}
              <Clock />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-full h-fit py-5 px-5 rounded-3xl border-[#323743FF] bg-black">
            <div className="flex flex-col gap-0.5 text-white text-sm">
              {(isWeekend ? weekendTimes : weekdayTimes).map((t, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setTime(t), setIsOpen(false);
                  }}
                  className="px-2 py-1"
                >
                  {t}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
