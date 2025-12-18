"use client";

import React, { Dispatch, useState } from "react";
import { Button, DialogClose } from "@/components/ui";
import { CreateSessionType, SelectedTutorType } from "@/lib/types";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

export const EditSaveChangesBtn = ({
  session,
  sessionTopicTitle,
  description,
  minMember,
  maxMember,
  value,
  time,
  selectedSessionType,
  selectedTutors,
  room,
}: {
  room: string;
  session: CreateSessionType;
  sessionTopicTitle: string;
  description: string;
  minMember: number;
  maxMember: number;
  value: string;
  time: string;
  selectedSessionType: string;
  selectedTutors: SelectedTutorType[];
}) => {
  const [main, setMain] = useState();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const sessionId = session._id;

  const handleUpdateSession = async () => {
    setLoading(true);
    const token = await getToken();

    if (
      !room ||
      !session ||
      !sessionTopicTitle ||
      !description ||
      !minMember ||
      !maxMember ||
      !value ||
      !time ||
      !selectedSessionType ||
      !selectedTutors ||
      !token
    ) {
      toast.warning("All fields are required!");
      return;
    }

    const id = session._id;

    const updatedData = {
      room,
      sessionTopicTitle,
      description,
      minMember,
      maxMember,
      value,
      time,
      selectedSessionType,
      selectedTutors,
    };

    const response = await fetch(`/api/update-my-session/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      toast.error("Failed to update study session!");
    }

    toast.success("Study session updated successfully");
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <DialogClose asChild className="w-[421px] gap-3">
      <Button
        type="submit"
        className="w-1/2"
        size={"lg"}
        disabled={loading}
        onClick={handleUpdateSession}
      >
        Save changes
      </Button>
    </DialogClose>
  );
};
