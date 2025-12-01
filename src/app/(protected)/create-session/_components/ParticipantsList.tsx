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
  console.log({ joinedStudents });

  const getSelectedSessionJoinedStudents = async () => {
    const result = await fetch("api/get-joined-students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: session._id,
      }),
    });

    if (!result.ok) {
      toast.error("Failed to join the session");
    }

    const { data } = await result.json();
    setJoinedStudents(data);
    toast.success(
      "You have successfully joined the session, View your joined session on My Study Buddies"
    );
  };

  useEffect(() => {
    getSelectedSessionJoinedStudents();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-base text-white font-semibold">Participants</h3>

      <div className="flex gap-3 items-center">
        <div className="text-sm text-gray-300 flex flex-col gap-3">
          {joinedStudents.map((joinedStudent) => (
            <div key={joinedStudent._id} className="flex gap-3 items-center">
              <img
                src={joinedStudent.studentId.studentImage}
                className="w-6 h-6 rounded-full bg-gray-300"
              />
              <div>{joinedStudent.studentId.studentName}</div>
            </div>
          ))}
        </div>
        {/* session-d joined hiisen students info orj ireh */}
      </div>
    </div>
  );
};
