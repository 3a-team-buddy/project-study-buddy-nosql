"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SessionType = () => {
  const [sessionType, setSessionType] = useState<string>("");

  const handleChangeSessionType = (e: string) => {
    setSessionType(e);
    if (e === "tutor-led") console.log("Tutor-led Session");
    if (e === "self-led") console.log("Self-led Session");
  };

  return (
    <div className="flex flex-col gap-5">
      <RadioGroup
        value={sessionType}
        onValueChange={handleChangeSessionType}
        className="flex justify-between mx-20"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="tutor-led"
            id="tutor-led"
            className="bg-white"
          />
          <Label htmlFor="tutor-led">Tutor-led Session</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="self-led" id="self-led" className="bg-white" />
          <Label htmlFor="self-led">Self-led Session</Label>
        </div>
      </RadioGroup>
      {sessionType === "tutor-led" && (
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Please select your tutor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Batmunkh.A@nest.edu.mn">
              Batmunkh.A@nest.edu.mn
            </SelectItem>
            <SelectItem value="erdenetsogt.a@pinecone.mn">
              erdenetsogt.a@pinecone.mn
            </SelectItem>
            <SelectItem value="Lkhagva-Erdene.B@nest.edu.mn">
              Lkhagva-Erdene.B@nest.edu.mn
            </SelectItem>
            <SelectItem value="bilguun.b@nest.edu.mn">
              bilguun.b@nest.edu.mn
            </SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
