"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { SelectedTutorType } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export const CreateBtn = ({
  sessionTopicTitle,
  description,
  minMember,
  maxMember,
  value,
  time,
  selectedSessionType,
  selectedTutors,
}: {
  sessionTopicTitle: string;
  description: string;
  minMember: number;
  maxMember: number;
  value: string;
  time: string;
  selectedSessionType: string;
  selectedTutors: SelectedTutorType[];
}) => {
  const [creatorId, setCreatorId] = useState<string>("");
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setCreatorId(user.id);
    }
  }, [user]);

  const CreateSession = async () => {
    if (
      !sessionTopicTitle ||
      !description ||
      !minMember ||
      !maxMember ||
      !value ||
      !time ||
      !selectedSessionType ||
      !selectedTutors
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
        creatorId,
      }),
    });

    if (!response.ok) {
      toast.error("Failed to create session!");
    }

    toast.success("New session created successfully");
  };
  return (
    <div>
      <Button
        size={"lg"}
        className="w-full rounded-full bg-[#2563EB] hover:bg-[#1d4ed8]"
        onClick={CreateSession}
      >
        Create Session
      </Button>
    </div>
  );
};
