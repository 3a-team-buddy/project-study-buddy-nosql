import React from "react";

import { Label } from "@/components/ui";
import { CreateSessionType } from "@/lib/types";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";
import { FaDoorOpen } from "react-icons/fa";
import { SESSION_TYPE_MN_MAP } from "@/lib/constants/sessionLabels";

export const SessionDetails = ({ session }: { session: CreateSessionType }) => {
  return (
    <div className="flex flex-col gap-3">
      <Label className="text-white/80 hover:text-white text-base font-semibold">
        Дэлгэрэнгүй мэдээлэл
      </Label>

      <div className="space-y-2 text-white/60 text-sm">
        <p className="flex items-center gap-2">
          <FiCalendar /> Он сар өдөр:
          <span className="font-semibold text-purple-300 hover:text-purple-200">
            {session.value}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <FiClock /> Эхлэх цаг:
          <span className="font-semibold text-purple-300 hover:text-purple-200">
            {session.time}
          </span>
          <span className="text-xs">Үргэлжлэх хугацаа (1 цаг)</span>
        </p>
        <p className="flex items-center gap-2">
          <FaDoorOpen /> Анги:
          <span className="font-semibold text-purple-300 hover:text-purple-200">
            #{session.room}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <FiUser />
          <span
            className={`${
              session.selectedSessionType === "TUTOR-LED"
                ? "text-purple-300 font-semibold hover:text-purple-200"
                : "text-purple-500 font-semibold hover:text-purple-400"
            }`}
          >
            {SESSION_TYPE_MN_MAP[session.selectedSessionType]}
          </span>
          {session.selectedSessionType === "TUTOR-LED" && (
            <span>{session?.assignedTutor?.mockUserName}</span>
          )}
        </p>
      </div>
    </div>
  );
};
