import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";
import React from "react";

export const Attendance = () => {
  return (
    <div className="w-full h-fit bg-[#092B4F66] p-6 box-border rounded-lg">
      <div className="text-sm text-primary-foreground flex justify-between items-center mb-4">
        <div>Attendance</div>
        <Button variant={"ghost"} className="rounded-full">
          View all
        </Button>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="w-10 h-10 p-1 rounded-full flex justify-center items-center bg-[#061e37]">
            <Flame className="text-[#E879F9]" />
          </div>
          <div className="flex flex-col gap-0">
            <p className="text-xl font-medium text-primary-foreground">
              111 Day
            </p>
            <p className="text-xs text-primary-foreground">Attendance streak</p>
          </div>
        </div>
        <div className="flex items-end lg:gap-4">
          <div className="flex flex-col gap-1">
            <div className="bg-[#092B4FB2] w-8 h-8 rounded-full flex justify-center items-center text-sm text-primary-foreground">
              16
            </div>
            <p className="text-xs font-semibold text-primary-foreground text-center">
              SUN
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="bg-[#092B4FB2] w-8 h-8 rounded-full flex justify-center items-center text-sm text-primary-foreground">
              <Flame className="text-[#E879F9] w-3 h-3" />
            </div>
            <p className="text-xs font-semibold text-primary-foreground text-center">
              MON
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="bg-[#092B4FB2] w-8 h-8 p-1 rounded-full flex justify-center items-center text-sm text-primary-foreground">
              <Flame className="text-[#E879F9] w-3 h-3" />
            </div>
            <p className="text-xs font-semibold text-primary-foreground text-center">
              TUE
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="bg-[#092B4FB2] w-8 h-8 p-1 rounded-full flex justify-center items-center text-sm text-primary-foreground">
              <Flame className="text-[#E879F9] w-3 h-3" />
            </div>
            <p className="text-xs font-semibold text-primary-foreground text-center">
              WED
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="bg-[#092B4FB2] w-8 h-8 p-1 rounded-full flex justify-center items-center text-sm text-primary-foreground border border-dashed border-[#E879F9]">
              20
            </div>
            <p className="text-xs font-semibold text-primary-foreground text-center">
              THU
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
