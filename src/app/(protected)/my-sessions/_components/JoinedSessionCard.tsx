"use client";

import { useSession } from "@/app/_hooks/use-session";
import { CreateSessionType } from "@/lib/types";
import { useRouter } from "next/navigation";
import React from "react";
import { FiLink } from "react-icons/fi";
import { MySessionInviteBtn } from "./MySessionInviteBtn";

const JoinedSessionCard = ({
  session,
  handleSessionId,
}: {
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
            <MySessionInviteBtn />
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

export default JoinedSessionCard;
