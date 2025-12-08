import React from "react";

import { Label } from "@/components/ui";
import { CreateSessionType } from "@/lib/types";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";

export const SessionDetails = ({ session }: { session: CreateSessionType }) => {
  return (
    <div className="flex flex-col gap-3">
      <Label className="text-white text-base font-semibold">
        Session Details
      </Label>

      <div className="space-y-2 text-white/60 text-sm">
        <p className="flex items-center gap-2">
          <FiCalendar /> Date:
          <span className="font-semibold text-purple-300">{session.value}</span>
        </p>
        <p className="flex items-center gap-2">
          <FiClock /> Start time:{" "}
          <span className="font-semibold text-purple-300">{session.time}</span>{" "}
          (1 hour)
        </p>
        <p className="flex items-center gap-2">
          <FiUser /> Session type:
          <span className="text-purple-300 font-semibold">
            {session.selectedSessionType}
          </span>
        </p>
      </div>
    </div>
  );
};
