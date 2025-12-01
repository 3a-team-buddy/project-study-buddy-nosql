"use client";

import { useSession } from "@/app/_hooks/use-session";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { FiLink } from "react-icons/fi";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { SessionInfoDialog } from "@/app/(protected)/create-session/_components/SessionInfoDialog";

interface SessionCardProps {
  showJoin?: boolean;
}

const MoreSessionCard: React.FC<SessionCardProps> = ({ showJoin = false }) => {
  const { allSessions } = useSession();

  return (
    <div className="flex flex-col gap-3">
      {allSessions.map((session) => (
        <div key={session._id}>
          <div className="w-full rounded-xl px-6 py-4 bg-linear-to-b from-[#1E2648] to-[#122136] flex justify-between items-center">
            <Dialog>
              <DialogTrigger>
                <h3 className="text-white font-semibold">
                  {session.sessionTopicTitle}
                </h3>
              </DialogTrigger>
              <DialogContent className="p-0 bg-transparent">
                <VisuallyHidden>
                  <DialogTitle />
                </VisuallyHidden>
                <SessionInfoDialog session={session} />
              </DialogContent>
            </Dialog>

            <div className="flex items-center gap-4">
              {!showJoin && (
                <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded-md">
                  1/{session.maxMember} JOIN
                </button>
              )}
              <button className="flex items-center text-sm text-blue-300 hover:text-blue-400">
                <FiLink className="mr-1" /> invite
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoreSessionCard;
