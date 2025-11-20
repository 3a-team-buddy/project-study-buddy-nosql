import React from "react";
import { Firstsvg } from "./svg-folder/Firstsvg";
import { Secondsvg } from "./svg-folder/Secondsvg";
import { Thirdsvg } from "./svg-folder/Thirdsvg";

export const AcademicCalendar = () => {
  return (
    <div
      className="rounded-lg border text-card-foreground shadow-sm bg-[#092B4F66] border-none"
      data-cy="profile-calendar-card"
    >
      <div className="p-6 relative  h-[210px]">
        <div className="flex items-center justify-between">
          <p className="text-sm text-primary-foreground">Академик Календар</p>
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 text-primary-foreground rounded-full py-2 px-6 -mr-3 hover:bg-[#FFFFFF14] hover:text-primary-foreground">
            View all
          </button>
        </div>
        <div className="h-1 w-full bg-secondary mt-16">
          <div
            className="h-1 bg-green-600"
            data-testid="progress-bar"
            style={{ width: "30%" }}
          ></div>
        </div>
        <div className="absolute bottom-4 flex justify-between w-[93%]">
          <div className="flex flex-col items-center w-[70px]">
            <p className="pb-3 text-xs text-primary-foreground">06.09</p>
            <div className="bg-[#18BA51] border-2 border-white w-9 h-9 flex items-center justify-center rounded-full">
              <Firstsvg />
            </div>
            <div className="h-8 w-1 border border-dashed border-black"></div>
            <p className="text-[10px] text-primary-foreground">Хичээл эхлэх</p>
          </div>
          <div className="w-[60%] flex justify-end">
            <div className="flex flex-col items-center w-20">
              <p className="pb-3 text-xs text-primary-foreground">12.22</p>
              <div className="bg-[#18BA51] border-2 border-white w-9 h-9 flex items-center justify-center rounded-full">
                <Secondsvg />
              </div>
              <div className="h-8 w-1 border border-dashed border-black"></div>
              <p className="text-[10px] text-primary-foreground">
                Дадлага эхлэх
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center w-20">
            <p className="pb-3 text-xs text-primary-foreground">02.20</p>
            <div className="flex items-center justify-center rounded-full w-9 h-9">
              <Thirdsvg />
            </div>
            <div className="h-8 w-1 border border-dashed border-black"></div>
            <p className="text-[10px] text-primary-foreground">Хичээл дуусах</p>
          </div>
        </div>
      </div>
    </div>
  );
};
