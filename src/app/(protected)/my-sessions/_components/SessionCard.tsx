"use client";

import React from "react";
import { useSession } from "@/app/_hooks/use-session";
import { CreateSessionType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { MySessionInviteBtn } from "./MySessionInviteBtn";
import { InviteBtnDialog, JoinBtn } from "../../create-session/_components";
import { Button } from "@/components/ui";

export const SessionCard = ({
  selectedType,
  session,
  handleSessionId,
}: {
  selectedType: "created" | "joined" | "other" | undefined;
  session: CreateSessionType;
  handleSessionId: () => void;
}) => {
  const { allSessions } = useSession();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3 hover:cursor-pointer">
      <div key={session._id}>
        <div className="w-full rounded-xl px-6 py-4 bg-linear-to-b from-[#1E2648] to-[#122136] flex gap-3 justify-between items-center">
          <h3 onClick={handleSessionId} className="text-white font-semibold">
            {session.sessionTopicTitle}
          </h3>

          <div className="flex items-center gap-4">
            {selectedType === "created" || "joined" ? (
              <div>
                <Button>{session.status}</Button>
                <MySessionInviteBtn />
              </div>
            ) : selectedType === "other" ? (
              <div>
                <JoinBtn session={session} />
                <InviteBtnDialog />
              </div>
            ) : (
              ""
            )}

            {session.status && (
              <span
                className={`text-xs ${
                  status === "accepted" ? "text-green-400" : "text-orange-300"
                }`}
              >
                {session.status}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
