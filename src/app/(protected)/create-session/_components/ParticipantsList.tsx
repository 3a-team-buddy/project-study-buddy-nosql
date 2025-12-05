"use client";

import React, { useEffect, useState } from "react";
import { CreateSessionType, JoinedStudentType } from "@/lib/types";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { Button, Label } from "@/components/ui";

export const ParticipantsList = ({
  session,
}: {
  session: CreateSessionType;
}) => {
  const [joinedStudents, setJoinedStudents] = useState<JoinedStudentType[]>([]);

  const getSelectedSessionJoinedStudents = async () => {
    const result = await fetch("/api/get-joined-students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: session._id,
      }),
    });

    if (!result.ok) {
      toast.error("Failed to get joined students!");
    }

    const { data } = await result.json();
    setJoinedStudents(data);
  };

  useEffect(() => {
    getSelectedSessionJoinedStudents();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <Label className="text-base text-white font-semibold">
          Participants
        </Label>
        <Button
          variant={"secondary"}
          className="rounded-full font-semibold text-[#2563EB] hover:text-white bg-black/20 hover:bg-[#2563EB] border border-[#2563EB] hover:border-[#2563EB]"
        >
          {session.studentCount.length}
          <span>/{session.maxMember}</span>
        </Button>
      </div>

      <div className="text-sm text-white/60 flex flex-col gap-2">
        {joinedStudents.map((joinedStudent, i) => (
          <div key={joinedStudent._id} className="flex gap-2 items-center">
            <img
              src={joinedStudent.studentId.mockUserImage}
              className="w-6 h-6 rounded-full bg-slate-900"
              alt=""
            />
            <div>{joinedStudent.studentId.mockUserName}</div>
            {i === 0 && (
              <div className="flex gap-0.5 text-xs items-center text-amber-200">
                <Star
                  size={11}
                  className="text-amber-200 fill-amber-200 font-medium"
                />
                Creator
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
