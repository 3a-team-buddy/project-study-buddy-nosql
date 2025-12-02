import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { CreateSessionType } from "@/lib/types";
import {
  ParticipantsList,
  SessionDetails,
} from "@/app/(protected)/create-session/_components";

export const SessionInfoDialogContent = ({
  session,
}: {
  session: CreateSessionType;
}) => {
  return (
    <div>
      <DialogContent className="px-8 py-6 gap-10 bg-gray-700 border-0 rounded-2xl text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl leading-7">
            {session.sessionTopicTitle}
          </DialogTitle>
          <DialogDescription className="text-white/60">
            {session.description}
          </DialogDescription>
        </DialogHeader>

        <SessionDetails session={session} />

        <ParticipantsList session={session} />
      </DialogContent>
    </div>
  );
};
