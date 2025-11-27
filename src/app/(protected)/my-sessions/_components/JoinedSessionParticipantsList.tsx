"use client";
import React from "react";
import { ParticipantItem } from "./ParticipantItem";
import { useSession } from "@/app/_hooks/use-session";
import { useUser } from "@clerk/nextjs";
import { CreateSessionType } from "@/lib/types";

export const JoinedSessionParticipantsList = ({
  session,
}: {
  session: CreateSessionType;
}) => {
  //   const { allSessions } = useSession();
  const { user } = useUser();

  return (
    <div className="mt-6">
      <h3 className="text-white font-semibold mb-3">Participants</h3>

      <div className="flex flex-col gap-3">
        <ParticipantItem key={session._id} name={user?.firstName} />
      </div>
    </div>
  );
};
