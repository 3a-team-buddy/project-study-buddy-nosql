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
import { CreateSessionType, SelectedStudentType } from "@/lib/types";

export const InviteBtnDialogContent = ({
  session,
}: {
  session: CreateSessionType;
}) => {
  const [emailInputValue, setEmailInputValue] = useState<string>("");
  const [selectedStudents, setSelectedStudents] = useState<
    SelectedStudentType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const link = "https://project-study-buddy-nosql.vercel.app/";

  const handleAddStudentEmail = () => {
    if (!emailInputValue) return;
    if (!emailInputValue.includes("@")) {
      toast.warning("Имэйл буруу байна");
      return;
    }

    if (
      selectedStudents.some(
        (selectedStudent) => selectedStudent.email === emailInputValue
      )
    ) {
      toast.warning("Имэйл давхардсан байна!");
      return;
    }

    const newList = [...selectedStudents, { email: emailInputValue }];
    setSelectedStudents(newList);
    setEmailInputValue("");
  };

  const deleteSelectedStudent = (studentEmail: string) => {
    setSelectedStudents((prev) => prev.filter((s) => s.email !== studentEmail));
  };

  const handleSendInviteLink = async (sessionId: string) => {
    setLoading(true);

    if (selectedStudents.length === 0) {
      toast.warning("Илгээх имэйл байхгүй байна!");
      return;
    }

    const emails = selectedStudents.map((s) => s.email);

    try {
      const res = await fetch(`/api/send-link/${sessionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emails, link }),
      });

      if (!res.ok) {
        toast.error("Илгээж чадсангүй!");
        return;
      }

      toast.success("Урилгын холбоос амжилттай илгээгдлээ!");
      setSelectedStudents([]);
    } catch (error) {
      console.error("Error", error);
      toast.error("Серверийн алдаа!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="p-8 gap-10 border-0 rounded-2xl">
      <DialogHeader>
        <DialogTitle>Суралцагч урих</DialogTitle>
        <DialogDescription aria-hidden />
      </DialogHeader>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Имэйл</Label>
        <div className="flex gap-3 items-center">
          <Input
            type="email"
            value={emailInputValue}
            onChange={(e) => setEmailInputValue(e.target.value)}
            placeholder="Сурагчийн имэйл оруулна уу..."
            className="border border-black/70"
          />
          <Button
            disabled={selectedStudents.length > 5}
            onClick={handleAddStudentEmail}
            className="cursor-pointer"
          >
            <IoPersonAdd />
          </Button>
        </div>
      </div>

      {selectedStudents.length > 0 && (
        <div className="flex flex-col gap-0.5">
          {selectedStudents.map((student, index) => (
            <div key={index} className="flex justify-between items-center">
              <Label>{student.email}</Label>
              <Button
                variant="ghost"
                disabled={loading}
                onClick={() => deleteSelectedStudent(student.email)}
                className="cursor-pointer"
              >
                x
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label>Илгээх холбоос</Label>
        <Input value={link} readOnly className="border border-black/20" />
      </div>

      <DialogFooter className="sm:justify-end">
        <DialogClose asChild>
          <Button variant="secondary" className="cursor-pointer">
            Хаах
          </Button>
        </DialogClose>

        <Button
          onClick={() => handleSendInviteLink(session._id)}
          className="cursor-pointer"
        >
          Урилга илгээх
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
