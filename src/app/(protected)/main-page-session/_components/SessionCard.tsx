"use client";

import React, { useState } from "react";
import { CreateSessionType, JoinedStudentType } from "@/lib/types";
import { Button } from "@/components/ui";
import {
  InviteBtnDialog,
  JoinBtn,
  SessionCardDetails,
} from "@/app/(protected)/main-page-session/_components";

export const SessionCard = ({
  session,
  sessionListType,
}: {
  session: CreateSessionType;
  sessionListType: "created" | "joined" | "other";
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [joinedStudents, setJoinedStudents] = useState<JoinedStudentType[]>([]);

  const handleSessionCardDetail = async () => {
    setOpen(!open);

    const result = await fetch("/api/get-joined-students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: session._id }),
    });

    const { data } = await result.json();
    setJoinedStudents(data);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full rounded-2xl px-6 py-4 bg-linear-to-b from-[#1E2648]/90 to-[#122136]/20 flex gap-3 justify-between items-center relative ">
        <Button
          onClick={handleSessionCardDetail}
          variant={"ghost"}
          className="text-base leading-5 hover:bg-white/4 text-white/80 hover:text-white rounded-full flex-1 justify-start cursor-pointer"
        >
          {session.sessionTopicTitle}
        </Button>

        <div className="flex gap-4 items-center">
          {(sessionListType === "created" || sessionListType === "joined") && (
            <span
              className={`text-sm font-medium cursor-pointer ${
                session.status === "WAITING"
                  ? "text-amber-200 hover:text-amber-100"
                  : session.status === "ACCEPTED"
                  ? "text-green-400 hover:text-green-300"
                  : session.status === "CANCELED"
                  ? "text-gray-500 hover:text-gray-400"
                  : ""
              }`}
            >
              {session.status && session.status.toLowerCase()}
            </span>
          )}

          <p className="text-sm font-medium text-white/80 hover:text-white cursor-pointer">
            {session.studentCount?.length}/{session.maxMember}
          </p>
          <p
            className={`text-sm cursor-pointer ${
              session.selectedSessionType === "TUTOR-LED"
                ? "text-purple-300 hover:text-purple-200"
                : "text-purple-500 hover:text-purple-400"
            }`}
          >
            {session.selectedSessionType.toLowerCase()}
          </p>
          {sessionListType === "other" ? <JoinBtn session={session} /> : ""}
          <InviteBtnDialog session={session} />
        </div>
      </div>
      {open && (
        <SessionCardDetails
          session={session}
          sessionListType={sessionListType}
          joinedStudents={joinedStudents}
        />
      )}
    </div>
  );
};
