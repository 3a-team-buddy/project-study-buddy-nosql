"use client";

import React, { Dispatch, useEffect, useState } from "react";
import { CalendarRange, Clock } from "lucide-react";
import { MdOutlineMeetingRoom } from "react-icons/md";
import {
  Button,
  Calendar,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { CreateSessionType } from "@/lib/types";

const schedules = ["13:00", "14:00", "15:00", "16:00", "17:00"];
const rooms = ["301", "302", "303", "304", "305"];

export const DateRoomTimePicker = ({
  value,
  setValue,
  room,
  setRoom,
  time,
  setTime,
  date,
  setDate,
  allSessions,
}: {
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
  room: string;
  setRoom: Dispatch<React.SetStateAction<string>>;
  time: string;
  setTime: Dispatch<React.SetStateAction<string>>;
  date: Date | undefined;
  setDate: Dispatch<React.SetStateAction<Date | undefined>>;
  allSessions: CreateSessionType[];
}) => {
  const [isWeekend, setIsWeekend] = useState<boolean>(false);
  const [openDate, setOpenDate] = useState<boolean>(false);
  const [openRoom, setOpenRoom] = useState<boolean>(false);
  const [openTime, setOpenTime] = useState<boolean>(false);
  const [month, setMonth] = useState<Date | undefined>(date);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

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

  const fullyBookedDates: string[] = [];

  allSessions.forEach((s) => {
    const sameDay = allSessions.filter((x) => x.value === s.value);

    if (sameDay.length === rooms.length * schedules.length) {
      if (!fullyBookedDates.includes(s.value)) {
        fullyBookedDates.push(s.value);
      }
    }
  });

  const availableRooms = rooms.filter((r) => {
    const sessionOfRoom = allSessions.filter(
      (s) => s.value === value && s.room === r
    );

    return sessionOfRoom.length < schedules.length;
  });

  let availableTimes = schedules.filter((t) => {
    return !allSessions.some(
      (s) => s.value === value && s.room === room && s.time === t
    );
  });

  if (isWeekend) {
    availableTimes = availableTimes.filter((t) => t <= "16:00");
  } else {
    availableTimes = availableTimes.filter((t) => t >= "14:00");
  }

  useEffect(() => {
    if (date) checkWeekend(date);
  }, [date]);

  return (
    <div className="w-full flex justify-between">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker">Он сар өдөр</Label>
        <Popover open={openDate} onOpenChange={setOpenDate}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="min-w-[175px] justify-between border-border/20 bg-black/50 hover:bg-black text-white/80 hover:text-white/80 cursor-pointer"
            >
              {value || (
                <span className="text-muted-foreground">Сонгох...</span>
              )}
              <CalendarRange />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto overflow-hidden p-0 border-[#323743FF] bg-[black] text-white">
            <Calendar
              className="bg-[#0F2343] cursor-pointer"
              mode="single"
              captionLayout="dropdown"
              fromYear={2014}
              toYear={2026}
              selected={date}
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
                setRoom("");
                setTime("");
                checkWeekend(date);
                setOpenDate(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="room-picker">Анги</Label>
        <Popover open={openRoom} onOpenChange={setOpenRoom}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              disabled={!value || availableRooms.length === 0}
              className="min-w-[75px] justify-between border-border/20 bg-black/50 hover:bg-black text-white/80 hover:text-white/80 cursor-pointer"
            >
              {room || <span className="text-muted-foreground">Сонгох...</span>}
              <MdOutlineMeetingRoom />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto border-[#323743FF] bg-[black] text-white">
            <div className="flex flex-col gap-0.5 text-sm">
              {availableRooms.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRoom(r);
                    setTime("");
                    setOpenRoom(false);
                  }}
                >
                  <p className="hover:bg-white hover:text-black rounded-md p-1 cursor-pointer">
                    {r}
                  </p>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {availableRooms.length === 0 && (
          <span className="text-xs text-muted-foreground">Анги байхгүй</span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker">Эхлэх цаг</Label>
        <Popover open={openTime} onOpenChange={setOpenTime}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              disabled={!room || availableTimes.length === 0}
              className="min-w-[85px] justify-between border-border/20 bg-black/50 hover:bg-black text-white/80 hover:text-white/80 cursor-pointer"
            >
              {time || <span className="text-muted-foreground">Сонгох...</span>}
              <Clock />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto h-fit border-[#323743FF] bg-black text-white">
            <div className="flex flex-col gap-0.5 text-sm">
              {availableTimes.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTime(t);
                    setOpenTime(false);
                  }}
                >
                  <p className="hover:bg-white hover:text-black rounded-md p-1 cursor-pointer">
                    {t}
                  </p>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
