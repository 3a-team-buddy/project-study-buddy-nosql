"use client";

import React from "react";
import { Button, Separator } from "@/components/ui";
import { CreateSessionType, JoinedStudentType } from "@/lib/types";
import {
  JoinBtn,
  ParticipantsList,
  SessionDetails,
} from "../../create-session/_components";
import { SessionDeleteBtn } from "./SessionDeleteBtn";
import { SessionLeaveBtn } from "./SessionLeaveBtn";

export const SessionCardDetails = ({
  session,
  selectedType,
  joinedStudents,
}: {
  session: CreateSessionType;
  selectedType: "created" | "joined" | "other" | undefined;
  joinedStudents: JoinedStudentType[];
}) => {
  return (
    <div className="flex flex-col gap-10">
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

      {selectedType === "created" ? (
        <div className="w-fit flex gap-2 justify-between">
          <Button
            variant={"secondary"}
            className="w-full text-accent-foreground cursor-pointer"
          >
            Edit
          </Button>

          <div>
            <SessionDeleteBtn session={session} />
          </div>
        </div>
      ) : selectedType === "joined" ? (
        <SessionLeaveBtn session={session} />
      ) : (
        <JoinBtn session={session} />
      )}
    </div>
  );
};
