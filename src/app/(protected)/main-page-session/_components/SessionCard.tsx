"use client";

import React, { useEffect, useState } from "react";
import { CreateSessionType, JoinedStudentType } from "@/lib/types";
import { Button } from "@/components/ui";
import {
  InviteBtnDialog,
  JoinBtn,
  SessionCardDetails,
  SessionRatingDialog,
} from "@/app/(protected)/main-page-session/_components";
import {
  SESSION_STATUS_MN_MAP,
  SESSION_TYPE_MN_MAP,
} from "@/lib/constants/sessionLabels";

import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { useSessionExpired } from "@/app/_hooks/use-session-expired";

export const SessionCard = ({
  session,
  sessionListType,
}: {
  session: CreateSessionType;
  sessionListType: "created" | "joined" | "other";
}) => {
  const [open, setOpen] = useState(false);
  const [joinedStudents, setJoinedStudents] = useState<JoinedStudentType[]>([]);
  const { isExpired } = useSessionExpired(session.value, session.time);

  const handleSessionCardDetail = async () => {
    setOpen((prev) => !prev);

    const result = await fetch("/api/get-joined-students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: session._id }),
    });

    const { data } = await result.json();
    setJoinedStudents(data);
  };

  function formatToMonthDay(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    });
  }

  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 60_000);
    return () => clearInterval(interval);
  }, []);

  function getSessionStatusFlags(date: string, time: string) {
    const sessionDate = new Date(date);
    const [hours, minutes] = time.split(":").map(Number);
    sessionDate.setHours(hours, minutes, 0, 0);

    const sessionStart = sessionDate.getTime();
    const sessionEnd = sessionStart + 60 * 60 * 1000;

    return {
      ongoing: currentTime >= sessionStart && currentTime < sessionEnd,
      completed: currentTime >= sessionEnd,
    };
  }

  const isAccepted = session.status === "ACCEPTED";

  const { ongoing, completed } = isAccepted
    ? getSessionStatusFlags(session.value, session.time)
    : { ongoing: false, completed: false };

  const canRate = completed && sessionListType === "created";
  console.log("date:", session.value);
  console.log("time:", session.time);
  console.log(
    "sessionDateTime:",
    new Date(`${session.value}T${session.time}00`)
  );
  console.log("now:", new Date());
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full rounded-2xl px-6 py-4 bg-linear-to-b from-[#1E2648]/90 to-[#122136]/20 flex gap-3 justify-between items-center">
        <Button
          asChild
          onClick={handleSessionCardDetail}
          variant="ghost"
          className="text-base leading-5 hover:bg-white/4 text-white/80 hover:text-white rounded-full flex-1 justify-start cursor-pointer"
        >
          <div className="flex justify-between items-center gap-5">
            <p className="bg-[#2563EB] hover:bg-[#1d4ed8] px-3 py-2 rounded-full text-xl">
              {session.sessionTopicTitle}
            </p>

            {/* {!completed && ( */}
            <p className="flex gap-1 text-xs text-gray-400 text-start animate-pulse">
              <span>{formatToMonthDay(session.value)}</span>
              <span>{session.time}</span>
              <span>@{session.room}</span>
            </p>
            {/* )} */}
          </div>
        </Button>

        <div className="flex gap-4 items-center">
          <span
            className={`text-sm font-medium cursor-pointer ${
              ongoing
                ? "text-blue-400 hover:text-blue-300"
                : completed
                ? "text-orange-400 hover:text-orange-300"
                : session.status === "WAITING"
                ? "text-amber-200 hover:text-amber-100"
                : session.status === "ACCEPTED"
                ? "text-green-400 hover:text-green-300"
                : session.status === "CANCELED"
                ? "text-gray-500 hover:text-gray-400"
                : ""
            }`}
          >
            {ongoing
              ? "Үргэлжилж буй"
              : completed
              ? "Дууссан"
              : SESSION_STATUS_MN_MAP[session.status]}
          </span>

          {canRate && <SessionRatingDialog session={session} />}

          {(sessionListType === "created" || sessionListType === "joined") && (
            <p className="text-sm font-medium text-white/80 hover:text-white cursor-pointer">
              {!ongoing && (
                <span>
                  {session.studentCount?.length}/{session.maxMember}
                </span>
              )}
            </p>
          )}

          {
            <p
              className={`text-sm cursor-pointer ${
                session.selectedSessionType === "TUTOR-LED"
                  ? "text-purple-300 hover:text-purple-200"
                  : "text-purple-500 hover:text-purple-400"
              }`}
            >
              {SESSION_TYPE_MN_MAP[session.selectedSessionType]}
            </p>
          }

          {session.selectedSessionType === "TUTOR-LED" && (
            <span className="text-sm">
              {session.assignedTutor?.mockUserName?.split(" ")[0]}
            </span>
          )}

          {sessionListType === "other" && (
            <JoinBtn session={session} isExpired={isExpired} />
          )}
          <InviteBtnDialog session={session} isExpired={isExpired} />
        </div>
      </div>

      {open && (
        <SessionCardDetails
          session={session}
          sessionListType={sessionListType}
          joinedStudents={joinedStudents}
          isExpired={isExpired}
        />
      )}
    </div>
  );
};
