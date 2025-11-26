"use client";

import React, { Dispatch, useState } from "react";
import { Button, Label, Textarea } from "@/components/ui";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

export const CreateMockTutor = ({
  setLoading,
  loading,
}: {
  setLoading: Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}) => {
  const [mockTutorName, setMockTutorName] = useState<string>("");
  const [mockTutorEmail, setMockTutorEmail] = useState<string>("");
  const [mockTutorImage, setMockTutorImage] = useState<string>("");

  const createMockTutor = async () => {
    if (!mockTutorName || !mockTutorEmail || !mockTutorImage) {
      toast.warning("All fields are required!");
      return;
    }
    setLoading(true);
    const response = await fetch("api/mock-datas/create-mock-tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mockTutorName, mockTutorEmail, mockTutorImage }),
    });
    if (!response.ok) {
      toast.error("Failed to create mock tutor!");
    }
    toast.success("Mock tutor created successfully");
    setMockTutorName("");
    setLoading(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="text-xl leading-6 font-semibold">
          Tutor Mock Data Maker
        </div>

        <div className="flex flex-col gap-1">
          <Label>Study Session Tutor Name</Label>
          <Textarea
            value={mockTutorName}
            onChange={(e) => setMockTutorName(e.target.value)}
            placeholder="Type session tutor name here..."
            className="min-h-9"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Study Session Tutor Email</Label>
          <Textarea
            value={mockTutorEmail}
            onChange={(e) => setMockTutorEmail(e.target.value)}
            placeholder="Type session tutor email here..."
            className="min-h-9"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Study Session Tutor Image</Label>
          <Textarea
            value={mockTutorImage}
            onChange={(e) => setMockTutorImage(e.target.value)}
            placeholder="Type session tutor image here..."
            className="min-h-9"
          />
        </div>
        <Button
          onClick={createMockTutor}
          className="w-full bg-[#2563EB] hover:bg-[#1d4ed8]"
        >
          {loading && <LoaderCircle className="animate-spin" />}{" "}
          <p>Save Mock Data</p>
        </Button>
      </div>
    </div>
  );
};
