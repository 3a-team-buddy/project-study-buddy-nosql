"use client";

import React from "react";
import { useSession } from "@/app/_hooks/use-session";
import { CreateSessionType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { InviteBtnDialog, JoinBtn } from "../../create-session/_components";
import { Button } from "@/components/ui";

export const SessionCard = ({
  session,
  handleSessionId,
  sessionListType,
}: {
  session: CreateSessionType;
  handleSessionId: () => void;
  sessionListType: "created" | "joined" | "other";
}) => {
  return (
    <div className="flex flex-col gap-3 hover:cursor-pointer">
      <div key={session._id}>
        <div className="w-full rounded-xl px-6 py-4 bg-linear-to-b from-[#1E2648] to-[#122136] flex gap-3 justify-between items-center">
          <Button
            onClick={handleSessionId}
            variant={"ghost"}
            className="flex-1 justify-start text-xl hover:text-white/80 font-semibold hover:bg-accent/5 cursor-pointer rounded-full"
          >
            {session.sessionTopicTitle}
          </Button>

          <div className="flex items-center gap-4">
            {(sessionListType === "created" ||
              sessionListType === "joined") && (
              <span
                className={`text-sm font-medium ${
                  session.status === "WAITING"
                    ? "text-orange-300"
                    : session.status === "ACCEPTED"
                    ? "text-green-400"
                    : "text-orange-300"
                }`}
              >
                {session.status && session.status.toLowerCase()}
              </span>
            )}
            {sessionListType === "other" && <JoinBtn session={session} />}
            <InviteBtnDialog />
          </div>
        </div>
      </div>
    </div>
  );
};
