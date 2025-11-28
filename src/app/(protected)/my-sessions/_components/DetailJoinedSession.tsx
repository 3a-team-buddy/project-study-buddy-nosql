"use client";

import { useSession } from "@/app/_hooks/use-session";
import { Button } from "@/components/ui";
import { CreateSessionType } from "@/lib/types";
import React from "react";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";

export const DetailJoinedSession = ({
  session,
}: {
  session: CreateSessionType;
}) => {
  return (
    <div className="w-full rounded-xl px-8 py-6 bg-[#0E1B2EFF] shadow-xl">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">
          {session.sessionTopicTitle}
        </h2>

        <p className="text-sm text-gray-300 mb-6 leading-relaxed">
          {session.description}
        </p>

        <h3 className="text-white font-semibold mb-2">Session Details</h3>

        <div className="space-y-3 text-gray-300">
          <p className="flex items-center gap-2">
            <FiCalendar /> Date: {session.value}
          </p>
          <p className="flex items-center gap-2">
            <FiClock /> Time: {session.time} (2 hours)
          </p>
          <p className="flex items-center gap-2">
            <FiUser /> Session type:{" "}
            <span className="text-purple-300">
              {session.selectedSessionType}
            </span>
          </p>
        </div>

        <Button variant={"destructive"} className="w-full  mt-6">
          Leave Session
        </Button>
      </div>
    </div>
  );
};
