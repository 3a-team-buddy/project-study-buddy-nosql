"use client";

import * as React from "react";
import {
  CalendarDays,
  CalendarRange,
  ChevronDown,
  ChevronDownIcon,
  Clock,
} from "lucide-react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DateAndTime() {
  const today = new Date();
  const n2 = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  n2.setDate(today.getDate() + 2);
  const [isWeekend, setIsWeekend] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(n2);
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(date));
  const [time, setTime] = React.useState<String>("");

  function formatDate(date: Date | undefined) {
    if (!date) {
      return "";
    }
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }
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
    { time: "18:00" },
  ];
  // React.useEffect(() => {
  //   function isWorkingDay(date: Date) {
  //     const day = date.getDay();
  //     const isWeekend = 0 || 6;
  //     if (day === isWeekend) {
  //       setIsWeekend(true);
  //     }
  //   }
  // }, [value]);
  function isWorkingDay(date: Date) {
    const day = date.getDay();

    const isWeekend = day === 0 || day === 6;

    if (isWeekend) {
      setIsWeekend(true);
    } else {
      setIsWeekend(false);
    }
  }
  //12-4-amraltiin udur 45min *2
  //1-6-ajiiln udur session
  //{#0F2343}
  //border-[#323743FF]
  const workday = schedule.filter((schedule) => schedule.time >= "13:00");
  const weekday = schedule.filter((schedule) => schedule.time <= "16:00");

  React.useEffect(() => {
    isWorkingDay;
    console.log({ workday });
  }, [value]);

  return (
    <div className="flex gap-4 flex-col ">
      <>
        <div className="flex flex-col gap-3">
          <Label className="px-1  text-white">Date</Label>
          <div className="relative flex gap-2">
            <Input
              id="date"
              value={value}
              placeholder="June 01, 2025"
              className="w-[225px] h-10 rounded-[26px] text-white border-[#000000FF] bg-black hover:text-neutral-200 "
              onChange={(e) => {
                const date = new Date(e.target.value);
                setValue(e.target.value);
                if (isValidDate(date)) {
                  setDate(date);
                  setMonth(date);
                }
                console.log("DATE", value);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setOpen(true);
                }
              }}
            />
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="date-picker"
                  variant="ghost"
                  className="absolute hover:text-neutral-200 hover:bg-black   top-1/2 right-2 size-6 -translate-y-1/2 text-white"
                >
                  <>
                    <CalendarRange />
                  </>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0 bg-[black] text-white "
                align="end"
                alignOffset={-8}
                sideOffset={10}
              >
                <Calendar
                  className="bg-[#0F2343] "
                  disabled={(day) => day < tomorrow}
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
      </>
      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="text-white px-1 ">
          Session period
        </Label>
        <div className="absolute"></div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="w-[225px] h-10 rounded-[26px] text-white flex justify-between items-center hover  border-[#000000FF] bg-black hover:bg-black hover:text-neutral-200"
              variant="outline"
            >
              {time ? (
                <div className="flex items-center gap-2">{time}</div>
              ) : (
                <>13:00 </>
              )}

              <Clock className="hover:bg-black  text-white  hover:text-neutral-200 " />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit  h-fit  py-5 px-5 rounded-[26px]  border-[#323743FF] bg-black ">
            {isWeekend ? (
              <div className="flex flex-col justify-center">
                {weekday.map((day, index) => {
                  return (
                    <div
                      key={index}
                      className="text-white text-[14px] px-2 py-1 "
                    >
                      {day.time}
                    </div>
                  );
                })}
              </div>
            ) : (
              <>
                <div className="flex flex-col justify-center">
                  {workday.map((day, index) => {
                    return (
                      <div
                        key={index}
                        className="hover:text-white text-[14px] px-2 py-1  text-neutral-400"
                      >
                        {day.time}
                      </div>
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
}
