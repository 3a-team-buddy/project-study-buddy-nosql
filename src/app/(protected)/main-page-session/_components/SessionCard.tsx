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
    <div className="flex flex-col gap-3 hover:cursor-pointer">
      <div className="w-full rounded-2xl px-6 py-4 bg-linear-to-b from-[#1E2648]/90 to-[#122136]/20 flex gap-3 justify-between items-center relative ">
        <Button
          onClick={handleSessionCardDetail}
          variant={"ghost"}
          className="hover:bg-white/3 text-white/80 hover:text-white rounded-full flex-1 justify-start"
        >
          {session.sessionTopicTitle}
        </Button>

        <div className="flex gap-4 items-center">
          {(sessionListType === "created" || sessionListType === "joined") && (
            <span
              className={`text-sm font-medium ${
                session.status === "WAITING"
                  ? "text-orange-300"
                  : session.status === "ACCEPTED"
                  ? "text-green-600"
                  : session.status === "CANCELED"
                  ? "text-red-700"
                  : ""
              }`}
            >
              {session.status && session.status.toLowerCase()}
              <JoinBtn session={session} />
            </span>
          )}
          {sessionListType === "other" && <JoinBtn session={session} />}
          <InviteBtnDialog />
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
