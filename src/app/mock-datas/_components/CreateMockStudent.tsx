"use client";
import React, { Dispatch, useState } from "react";
import { Label, Textarea, Button } from "@/components/ui";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export const CreateMockStudent = ({
  setLoading,
  loading,
}: {
  setLoading: Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}) => {
  const [studentName, setStudentName] = useState<string>("");
  const [studentEmail, setStudentEmail] = useState<string>("");
  const [studentImage, setStudentImage] = useState<string>("");
  const [studentClerkId, setStudentClerkId] = useState<string>("");

  const createMockStudents = async () => {
    if (!studentClerkId || !studentImage || !studentName || !studentEmail) {
      toast.warning("All fields are required!");
      return;
    }

    setLoading(true);

    const response = await fetch("api/mock-datas/create-student-mock-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentClerkId,
        studentName,
        studentImage,
        studentEmail,
      }),
    });

    if (!response.ok) {
      toast.error("Failed to create mock topic!");
    }

    toast.success("Mock topic created successfully");
    setStudentName("");
    setStudentEmail("");
    setStudentClerkId("");
    setStudentImage("");
    setLoading(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="text-xl leading-6 font-semibold">
          Student Mock Data Maker
        </div>

        <div className="flex flex-col gap-1">
          <Label>Student Name</Label>
          <Textarea
            className="min-h-9 text-black "
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Type your name here..."
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Student Email </Label>
          <Textarea
            className="text-black "
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            placeholder="Type your email here..."
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Student Image</Label>
          <Textarea
            value={studentImage}
            onChange={(e) => setStudentImage(e.target.value)}
            placeholder="Type image here..."
            className="min-h-9 text-black"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Student ClerckID</Label>
          <Textarea
            className="text-black "
            value={studentClerkId}
            onChange={(e) => setStudentClerkId(e.target.value)}
            placeholder="Type clerk id here..."
          />
        </div>

        <Button
          onClick={createMockStudents}
          className="w-full bg-[#2563EB] hover:bg-[#1d4ed8]"
        >
          {loading && <LoaderCircle className="animate-spin" />}{" "}
          <p>Save Student Mock Data</p>
        </Button>
      </div>
    </div>
  );
};
