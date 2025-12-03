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
import { useSession } from "@/app/_hooks/use-session";

export const DateAndTimePicker = ({
  value,
  setValue,
  time,
  setTime,
  date,
  setDate,
  today,
  formatDate,
}: {
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
  time: string;
  setTime: Dispatch<React.SetStateAction<string>>;
  date: Date | undefined;
  setDate: Dispatch<React.SetStateAction<Date | undefined>>;
  today: Date;
  formatDate: (date: Date | undefined) => string;
}) => {
  const tomorrow = new Date();
  const { allSessions, isLoading } = useSession();
  const [disabledValue, setDisabledValue] = useState(formatDate(date));

  tomorrow.setDate(today.getDate() + 1);
  const [isWeekend, setIsWeekend] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date);
  const [month, setMonth] = useState<Date | undefined>(date);

  function isValidDate(date: Date | undefined) {
    if (!date) {
      return false;
    }
    return !isNaN(date.getTime());
  }

  const schedule = [
    { time: "12:00" },
    { time: "13:00" },
    { time: "14:00" },
    { time: "15:00" },
    { time: "16:00" },
    { time: "17:00" },
  ];

  function isWorkingDay(date: Date) {
    const day = date.getDay();

    const isWeekend = day === 0 || day === 6;

    if (isWeekend) {
      setIsWeekend(true);
    } else {
      setIsWeekend(false);
    }
  }

  const date1 = allSessions.filter((session) => session.value === value);

  const time1 = date1.map((date) => {
    return date.time;
  });
  const selectedDateAndTime = schedule.filter((schedule) => {
    return !time1.includes(schedule.time);
  });

  const workday = selectedDateAndTime.filter(
    (schedule) => schedule.time >= "13:00"
  );
  const weekday = selectedDateAndTime.filter(
    (schedule) => schedule.time <= "16:00"
  );
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    if (date) isWorkingDay(date);
    if (value === "") {
      setValue(formatDate(today));
    }
    if (workday.length === 0 || weekday.length === 0) {
      return setEmpty(true), setDisabledValue(value);
    } else if (workday.length !== 0 || weekday.length !== 0) {
      setEmpty(false);
    }
  }, [value, date]);
  console.log({ workday });
  console.log({ weekday });
  console.log({ empty });
  console.log({ disabledValue });
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
              if (isValidDate(date)) {
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
                <>
                  <CalendarRange />
                </>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0 bg-[black] text-white"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                className="bg-[#0F2343] "
                disabled={[
                  (day) => day < tomorrow,
                  (day) => formatDate(day) === disabledValue,
                ]}
                mode="single"
                selected={date}
                captionLayout="dropdown"
                month={month}
                onMonthChange={setMonth}
                onSelect={(date) => {
                  setDate(date);
                  setValue(formatDate(date));
                  setOpen(false);
                  if (date !== undefined) {
                    isWorkingDay(date);
                  }
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
              {time ? (
                <div className="flex items-center gap-2">{time}</div>
              ) : (
                <div className="text-muted-foreground">Цаг сонгоно уу...</div>
              )}
              <Clock />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit h-fit py-5 px-5 rounded-[26px] border-[#323743FF] bg-black">
            {isWeekend ? (
              <div className="flex flex-col justify-center">
                {weekday.map((day, index) => {
                  return (
                    <button
                      onClick={() => {
                        setTime(day.time), setIsOpen(false);
                      }}
                      key={index}
                      className="text-white text-[14px] px-2 py-1"
                    >
                      {day.time}
                    </button>
                  );
                })}
              </div>
            ) : (
              <>
                <div className="flex flex-col justify-center">
                  {workday.map((day, index) => {
                    return (
                      <button
                        onClick={() => {
                          setTime(day.time);
                          setIsOpen(false);
                        }}
                        key={index}
                        className="text-white text-[14px] px-2 py-1"
                      >
                        {day.time}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
