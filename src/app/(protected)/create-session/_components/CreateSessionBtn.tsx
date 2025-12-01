"use client";

import React, { Dispatch } from "react";
import { Button } from "@/components/ui";
import { SelectedTutorType } from "@/lib/types";
import { toast } from "sonner";

export const CreateSessionBtn = ({
  sessionTopicTitle,
  setSessionTopicTitle,
  description,
  setDescription,
  minMember,
  setMinMember,
  maxMember,
  setMaxMember,
  value,
  time,
  selectedSessionType,
  selectedTutors,
  userId,
}: {
  sessionTopicTitle: string;
  setSessionTopicTitle: Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<React.SetStateAction<string>>;
  minMember: number;
  setMinMember: Dispatch<React.SetStateAction<number>>;
  maxMember: number;
  setMaxMember: Dispatch<React.SetStateAction<number>>;
  value: string;
  time: string;
  selectedSessionType: string;
  selectedTutors: SelectedTutorType[];
  userId: string;
}) => {
  const createSession = async () => {
    if (
      !sessionTopicTitle ||
      !description ||
      !minMember ||
      !maxMember ||
      !value ||
      !time ||
      !selectedSessionType ||
      !selectedTutors ||
      !userId
    ) {
      toast.warning("All fields are required!");
      return;
    }

    const response = await fetch("api/create-new-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionTopicTitle,
        description,
        minMember,
        maxMember,
        value,
        time,
        selectedSessionType,
        creatorId: userId,
        selectedTutors,
      }),
    });

    if (!response.ok) {
      toast.error("Failed to create study session!");
    }

    toast.success("Study session created successfully");
    setSessionTopicTitle("");
    setDescription("");
    setMinMember(0);
    setMaxMember(0);
  };

  return (
    <Button
      size={"lg"}
      onClick={createSession}
      className="w-full rounded-full bg-[#2563EB] hover:bg-[#1d4ed8] cursor-pointer"
    >
      Create Session
    </Button>
  );
};
