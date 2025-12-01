"use client";

import React, { useEffect, useState } from "react";
import { CreateSessionType, JoinedStudentType } from "@/lib/types";
import { toast } from "sonner";

export const ParticipantsList = ({
  session,
}: {
  session: CreateSessionType;
}) => {
  const [joinedStudents, setJoinedStudents] = useState<JoinedStudentType[]>([]);
  // console.log({ joinedStudents });

  const getSelectedSessionJoinedStudents = async () => {
    const result = await fetch("api/get-joined-students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: session._id,
      }),
    });

    if (!result.ok) {
      toast.error("No joined students!");
    }

    const { data } = await result.json();
    setJoinedStudents(data);
  };

  useEffect(() => {
    getSelectedSessionJoinedStudents();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-base text-white font-semibold">Participants</h3>

      <div className="flex gap-2 items-center">
        <div className="text-sm text-white/60 flex flex-col gap-2">
          {joinedStudents.map((joinedStudent) => (
            <div key={joinedStudent._id} className="flex gap-2 items-center">
              <img
                src={joinedStudent.studentId.studentImage}
                className="w-6 h-6 rounded-full bg-slate-900"
                alt=""
              />
              <div>{joinedStudent.studentId.studentName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
