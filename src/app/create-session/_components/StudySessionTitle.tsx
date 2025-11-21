"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TextSearch } from "lucide-react";

const sweTopics = [
  {
    value: "useConrext",
    label: "useContext",
  },
  {
    value: "jwt token",
    label: "JWT Token",
  },
  {
    value: "express js",
    label: "Express JS",
  },
  {
    value: "error handling",
    label: "Error Handling",
  },
];

export const StudySessionTitle = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [studySessionTitleValue, setStudySessionTitleValue] =
    useState<string>("");

  console.log(studySessionTitleValue);

  return (
    <div className="w-full flex flex-col gap-5">
      <Label>Study Session Title</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <div className="w-full flex items-center">
            <TextSearch className="pl-2" />
            <Input
              value={studySessionTitleValue}
              onChange={(e) => setStudySessionTitleValue(e.target.value)}
              placeholder="Type here..."
              className="w-full -ml-6 pl-8"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          side="bottom"
          align="center"
          sideOffset={2}
        >
          <div></div>Place content for the popover here.
        </PopoverContent>
      </Popover>
    </div>
  );
};
