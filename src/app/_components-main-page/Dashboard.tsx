"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { StudyBuddy } from "./StudyBuddy";

export const Dashboard = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleMenuItem = (item: string) => {
    if (item === "Study Buddy") {
      setOpen(!open);
    }
  };

  return (
    <div className="max-w-[272px] w-full min-h-[700px] flex flex-col bg-[#092B4F66] rounded-lg shadow-sm text-white px-6 py-4 gap-4">
      <div className="text-xl font-semibold">Dashboard</div>

      <div className="flex flex-col gap-3">
        {[
          "Home",
          "Academic",
          "Challenge",
          "Career Development",
          "Personal space",
          "Study Buddy",
        ].map((item) => (
          <Button
            key={item}
            onClick={() => handleMenuItem(item)}
            size={"sm"}
            className="bg-transparent px-2 justify-between cursor-pointer"
          >
            {item}
            {item !== "Home" && <ChevronDown />}
          </Button>
        ))}
      </div>
      {open && <StudyBuddy open={open} />}
    </div>
  );
};
