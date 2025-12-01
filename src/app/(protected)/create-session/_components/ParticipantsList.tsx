import React from "react";
import { CreateSessionType } from "@/lib/types";

export const ParticipantsList = ({
  session,
}: {
  session: CreateSessionType;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-base text-white font-semibold">Participants</h3>

      <div className="flex gap-3 items-center">
        <div className="w-9 h-9 rounded-full bg-gray-300"></div>
        <div className="text-sm text-gray-300">{session._id}</div>
        {/* session-d joined hiisen students info orj ireh */}
      </div>
    </div>
  );
};
