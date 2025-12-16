"use client";

import React, { Dispatch, useState } from "react";
import { Button } from "@/components/ui";
import { SelectedTutorType } from "@/lib/types";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

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
  setValue,
  room,
  setRoom,
  time,
  setTime,
  selectedSessionType,
  setSelectedSessionType,
  selectedTutors,
  setSelectedTutors,
  selectedReward,
  setSelectedReward,
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
  setValue: Dispatch<React.SetStateAction<string>>;
  room: string;
  setRoom: Dispatch<React.SetStateAction<string>>;
  time: string;
  setTime: Dispatch<React.SetStateAction<string>>;
  selectedSessionType: string;
  setSelectedSessionType: Dispatch<React.SetStateAction<string>>;
  selectedTutors: SelectedTutorType[];
  setSelectedTutors: Dispatch<React.SetStateAction<SelectedTutorType[]>>;
  selectedReward: string;
  setSelectedReward: Dispatch<React.SetStateAction<string>>;
}) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCreateSession = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      if (
        !sessionTopicTitle ||
        !description ||
        !minMember ||
        !maxMember ||
        !value ||
        !room ||
        !time ||
        !selectedSessionType ||
        !selectedTutors ||
        !token ||
        !selectedReward
      ) {
        toast.warning("All fields are required!");
        return;
      }

      const response = await fetch("/api/create-new-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sessionTopicTitle,
          description,
          minMember,
          maxMember,
          value,
          room,
          time,
          selectedSessionType,
          selectedTutors,
          selectedReward,
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
      setValue("");
      setRoom("");
      setTime("");
      setSelectedSessionType("");
      setSelectedTutors([]);
      setSelectedReward("");
    } catch (error) {
      console.error("Error", error);
      toast.error("Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size={"lg"}
      disabled={loading}
      onClick={handleCreateSession}
      className="w-full rounded-full bg-[#2563EB] hover:bg-[#1d4ed8] cursor-pointer"
    >
      Давтлага оруулах
    </Button>
  );
};
