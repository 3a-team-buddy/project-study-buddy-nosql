"use cLient";

import React from "react";
import { useSession } from "@/app/_hooks/use-session";
import { InviteBtnDialog, JoinBtn, SessionListSkeleton } from "../_components";
import { SessionInfoDialog } from "./SessionInfoDialog";

export const SessionList = () => {
  const { allSessions, isLoading } = useSession();

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl leading-7 font-semibold">Sessions</h2>

      {isLoading ? (
        <SessionListSkeleton />
      ) : allSessions.length === 0 ? (
        <div className="rounded-2xl px-8 py-6 bg-[#0E1B2EFF] shadow-xl text-sm opacity-70 text-center">
          No sessions created yet - create one to get started!
        </div>
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
