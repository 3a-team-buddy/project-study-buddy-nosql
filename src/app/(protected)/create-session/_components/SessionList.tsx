"use cLient";

import React from "react";
import { useSession } from "@/app/_hooks/use-session";
import {
  InviteBtnDialog,
  JoinBtn,
  SessionInfoDialog,
  SessionListSkeleton,
} from "@/app/(protected)/create-session/_components";

export const SessionList = () => {
  const { allSessions, isLoading } = useSession();

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl leading-7 font-semibold">Sessions</h2>

      {isLoading ? (
        <SessionListSkeleton />
      ) : (
        <div className="flex flex-col gap-3">
          {allSessions.map((session) => (
            <div
              key={session._id}
              className="flex justify-between items-center p-4 rounded-2xl bg-[linear-gradient(180deg,#1E2648_0%,#122136_100%)]"
            >
              <SessionInfoDialog session={session} />

              <div className="flex items-center justify-center gap-2">
                <JoinBtn session={session} />

                <InviteBtnDialog />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
