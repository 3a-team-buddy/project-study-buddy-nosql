import React from "react";
import { Label } from "@/components/ui";
import { CreateSessionType } from "@/lib/types";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";

export const SessionDetails = ({ session }: { session: CreateSessionType }) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-white text-base font-semibold">
        Session Details
      </Label>

      <div className="space-y-3 text-gray-300">
        <p className="flex items-center gap-2">
          <FiCalendar /> Date: {session.value}
        </p>
        <p className="flex items-center gap-2">
          <FiClock /> Start time: {session.time} (1 hour)
        </p>
        <p className="flex items-center gap-2">
          <FiUser /> Session type:
          <span className="text-purple-300">{session.selectedSessionType}</span>
        </p>
      </div>
    </div>
  );
};
