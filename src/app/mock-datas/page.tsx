"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const MockDatasPage = () => {
  const [mockTitle, setMockTitle] = useState<string>("");
  const [mockDescription, setMockDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  console.log({ mockTitle });
  console.log({ mockDescription });

  const createMockTitleAndDescription = async () => {
    if (!mockTitle || !mockDescription) {
      toast.warning("All fields are required!");
    }

    setLoading(true);

    const response = await fetch("api/create");
  };

  return (
    <div className="w-full h-screen text-white flex flex-col bg-white/10 rounded-2xl p-5 gap-6">
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
          onClick={createMockTitleAndDescription}
          className="w-full bg-[#2563EB] hover:bg-[#1d4ed8]"
        >
          Save Mock Data
        </Button>
      </div>

      <div></div>
    </div>
  );
};
export default MockDatasPage;
