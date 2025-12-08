"use client";

import React from "react";
import { Separator } from "@/components/ui";
import { CreateSessionType, JoinedStudentType } from "@/lib/types";
import {
  JoinBtn,
  ParticipantsList,
  SessionDeleteBtn,
  SessionDetails,
  SessionEditBtn,
  SessionLeaveBtn,
} from "@/app/(protected)/main-page-session/_components";

export const SessionCardDetails = ({
  session,
  sessionListType,
  joinedStudents,
}: {
  session: CreateSessionType;
  sessionListType: "created" | "joined" | "other" | undefined;
  joinedStudents: JoinedStudentType[];
}) => {
  return (
    <div className="flex flex-col gap-10 p-5 bg-linear-to-b from-[#1E2648]/50 to-[#122136]/50 rounded-2xl">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl leading-7 font-semibold">
          {session.sessionTopicTitle}
        </h2>
        <p className="text-sm text-white/60 leading-5">{session.description}</p>
      </div>

      <div className="flex flex-col gap-2">
        <Separator className="bg-gray-800" />
        <SessionDetails session={session} />
      </div>

      <div className="flex flex-col gap-2">
        <Separator className="bg-gray-800" />
        <ParticipantsList session={session} joinedStudents={joinedStudents} />
      </div>

      {sessionListType === "created" ? (
        <div className="w-full flex gap-2">
          <SessionEditBtn />
          <SessionDeleteBtn session={session} />
        </div>
      ) : sessionListType === "joined" ? (
        <SessionLeaveBtn session={session} />
      ) : (
        <JoinBtn session={session} />
      )}
    </div>
  );
};
