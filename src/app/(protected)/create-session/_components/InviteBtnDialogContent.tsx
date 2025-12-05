"use client";

import React, { useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,
} from "@/components/ui";
import { IoPersonAdd } from "react-icons/io5";
import { toast } from "sonner";
import { SelectedStudentType } from "@/lib/types";

export const InviteBtnDialogContent = () => {
  const [selectedStudents, setSelectedStudents] = useState<
    SelectedStudentType[]
  >([]);
  const [emailInputValue, setEmailInputValue] = useState<string>("");

  const handleAddStudentEmail = () => {
    if (!emailInputValue) return;
    if (!emailInputValue.includes("@")) {
      toast.error("Invalid email");
      return;
    }

    const newList = [...selectedStudents, { email: emailInputValue }];
    setSelectedStudents(newList);
    setEmailInputValue("");
  };

  const deleteSelectedStudent = (studentEmail: string) => {
    setSelectedStudents((prev) => prev.filter((s) => s.email !== studentEmail));
  };

  const handleSendInvites = async () => {
    if (selectedStudents.length === 0) {
      alert("No emails selected");
      return;
    }

    const emails = selectedStudents.map((s) => s.email);
    const link = "http://localhost:3000/create-session"; // 🔗 invitation link

    try {
      const res = await fetch("/api/send-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emails, link }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to send");
        return;
      }

      alert("Invites sent successfully!");
      setSelectedStudents([]);
    } catch (e) {
      alert("Server error");
    }
  };

  return (
    <DialogContent className="px-8 py-6 gap-10 border-0 rounded-2xl">
      <DialogHeader>
        <DialogTitle>Invite students</DialogTitle>
        <DialogDescription />
      </DialogHeader>

      {/* Email input */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <div className="flex gap-3 items-center">
          <Input
            type="email"
            placeholder="Enter student email..."
            value={emailInputValue}
            onChange={(e) => setEmailInputValue(e.target.value)}
          />
          <Button
            disabled={selectedStudents.length > 10}
            onClick={handleAddStudentEmail}
          >
            <IoPersonAdd />
          </Button>
        </div>
      </div>

      {/* Selected students list */}
      {selectedStudents.length > 0 && (
        <div className="flex flex-col gap-2">
          {selectedStudents.map((student, index) => (
            <div key={index} className="flex justify-between items-center">
              <span>{student.email}</span>
              <Button
                variant="ghost"
                onClick={() => deleteSelectedStudent(student.email)}
              >
                x
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Link field */}
      <div className="flex flex-col gap-2">
        <Label>Link to send</Label>
        <Input value="http://localhost:3000/create-session" readOnly />
      </div>

      <DialogFooter className="sm:justify-end">
        <DialogClose asChild>
          <Button variant="secondary">Close</Button>
        </DialogClose>

        <Button onClick={handleSendInvites}>Invite</Button>
      </DialogFooter>
    </DialogContent>
  );
};
