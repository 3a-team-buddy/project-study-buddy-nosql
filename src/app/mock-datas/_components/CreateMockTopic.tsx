"use client";

import React, { Dispatch, useState } from "react";
import { Label, Textarea, Button } from "@/components/ui";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export const CreateMockTopic = ({
  setLoading,
  loading,
}: {
  setLoading: Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}) => {
  const [mockTitle, setMockTitle] = useState<string>("");
  const [mockDescription, setMockDescription] = useState<string>("");

  const createMockTopic = async () => {
    if (!mockTitle || !mockDescription) {
      toast.warning("All fields are required!");
      return;
    }
    setLoading(true);
    const response = await fetch("api/mock-datas/create-mock-topic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mockTitle, mockDescription }),
    });
    if (!response.ok) {
      toast.error("Failed to create mock topic!");
    }
    toast.success("Mock topic created successfully");
    setMockTitle("");
    setMockDescription("");
    setLoading(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="text-xl leading-6 font-semibold">
          Study Session Title and Description Mock Data Maker
        </div>

        <div className="flex flex-col gap-1">
          <Label>Study Session Title</Label>
          <Textarea
            value={mockTitle}
            onChange={(e) => setMockTitle(e.target.value)}
            placeholder="Type session title here..."
            className="min-h-9"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Study Session Description</Label>
          <Textarea
            value={mockDescription}
            onChange={(e) => setMockDescription(e.target.value)}
            placeholder="Type session description here..."
          />
        </div>

        <Button
          onClick={createMockTopic}
          className="w-full bg-[#2563EB] hover:bg-[#1d4ed8]"
        >
          {loading && <LoaderCircle className="animate-spin" />}{" "}
          <p>Save Mock Data</p>
        </Button>
      </div>
    </div>
  );
};
