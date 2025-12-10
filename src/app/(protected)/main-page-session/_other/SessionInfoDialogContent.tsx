import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { CreateSessionType, JoinedStudentType } from "@/lib/types";
import { ParticipantsList, SessionDetails } from "../_components";

export const SessionInfoDialogContent = ({
  session,
  joinedStudents,
}: {
  session: CreateSessionType;
  joinedStudents: JoinedStudentType[];
}) => {
  return (
    <DialogContent className="px-8 py-6 gap-10 bg-gray-700 border-0 rounded-2xl text-white">
      <DialogHeader>
        <DialogTitle className="text-2xl leading-7">
          {session.sessionTopicTitle}
        </DialogTitle>
        <DialogDescription className="text-white/60">
          {session.description}
        </DialogDescription>
      </DialogHeader>
      <div>hooson ustgah</div>

      <SessionDetails session={session} />

      <ParticipantsList session={session} joinedStudents={joinedStudents} />
    </DialogContent>
  );
};
