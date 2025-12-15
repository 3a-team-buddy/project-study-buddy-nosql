"use client";

import React, { useEffect, useState } from "react";
import { CreateSessionType, JoinedStudentType } from "@/lib/types";
import { Button, Textarea } from "@/components/ui";
import {
  InviteBtnDialog,
  JoinBtn,
  SessionCardDetails,
} from "@/app/(protected)/main-page-session/_components";
import {
  SESSION_STATUS_MN_MAP,
  SESSION_TYPE_MN_MAP,
} from "@/lib/constants/sessionLabels";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PiHeartStraightBreakFill } from "react-icons/pi";
import { RiPokerHeartsFill } from "react-icons/ri";
import { BsHearts } from "react-icons/bs";

export const SessionCard = ({
  session,
  sessionListType,
}: {
  session: CreateSessionType;
  sessionListType: "created" | "joined" | "other";
}) => {
  const [open, setOpen] = useState(false);
  const [joinedStudents, setJoinedStudents] = useState<JoinedStudentType[]>([]);
  const [sessionRate, setSessionRate] = useState<string>("");
  const [review, setReview] = useState<string>("");

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

    const now = Date.now();
    const sessionStart = sessionDate.getTime();
    const sessionEnd = sessionStart + 60 * 60 * 1000;

    return {
      ongoing: now >= sessionStart && now < sessionEnd,
      completed: now >= sessionEnd,
    };
  }

  const { ongoing, completed } = getSessionStatusFlags(
    session.value,
    session.time
  );
  console.log(session.assignedTutor, "EIJHEOIUHEOI");
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full rounded-2xl px-6 py-4 bg-linear-to-b from-[#1E2648]/90 to-[#122136]/20 flex gap-3 justify-between items-center relative">
        <Button
          asChild
          onClick={handleSessionCardDetail}
          variant="ghost"
          className="text-base leading-5 hover:bg-white/4 text-white/80 hover:text-white rounded-full flex-1 justify-start cursor-pointer"
        >
          <div className="flex justify-between items-center gap-5 relative">
            {session.sessionTopicTitle}
            <p>{session.assignedTutor?.mockUserName.split(" ")[0]}</p>

            <div className="flex gap-1 text-xs text-gray-400 text-start animate-pulse">
              {formatToMonthDay(session.value)}
              <p>{session.time}</p>
            </div>
            {!completed ? (
              <div className="flex gap-1 text-xs text-gray-400 text-start animate-pulse">
                {formatToMonthDay(session.value)}
                <div>{session.time}</div>
              </div>
            ) : (
              <>
                <Dialog>
                  <DialogTrigger>
                    <Button className="text-sm text-orange-400 text-start animate-pulse bg-transparent hover:bg-transparent absolute z-50 left-25 bottom-0.5">
                      Үнэлгээ
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex justify-between p-2 items-center">
                        <div>{session.sessionTopicTitle}</div>
                        <div className="flex gap-2 text-sm ">
                          {session.value} {session.time}
                        </div>
                      </DialogTitle>
                      <DialogDescription></DialogDescription>
                      <div className="flex flex-col gap-4 text-gray-500">
                        <div className=" flex gap-20 items-center">
                          <p>Давтлага үнэлэх: </p>
                          <div className="flex gap-10 justify-center text-black">
                            <Button className="bg-transparent hover:bg-transparent text-black">
                              <PiHeartStraightBreakFill />
                            </Button>
                            <Button className="bg-transparent hover:bg-transparent text-black">
                              <RiPokerHeartsFill />
                            </Button>
                            <Button className="bg-transparent hover:bg-transparent text-black">
                              <BsHearts />
                            </Button>
                          </div>
                        </div>
                        <div className=" flex gap-20 items-center">
                          <p>Ментор үнэлэх: </p>
                          <div className="flex gap-10 justify-center ml-2 ">
                            <Button className="bg-transparent hover:bg-transparent text-black">
                              <PiHeartStraightBreakFill />
                            </Button>
                            <Button className="bg-transparent hover:bg-transparent text-black">
                              <RiPokerHeartsFill />
                            </Button>
                            <Button className="bg-transparent hover:bg-transparent text-black">
                              <BsHearts />
                            </Button>
                          </div>
                        </div>
                        <div className=" flex flex-col gap-4">
                          <p>Сэтгэгдэл үлдээх: </p>
                          <Textarea />
                        </div>
                      </div>
                    </DialogHeader>
                  </DialogContent>
                  <DialogClose />
                </Dialog>
              </>
            )}
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

          {(sessionListType === "created" || sessionListType === "joined") && (
            <p className="text-sm font-medium text-white/80 hover:text-white cursor-pointer">
              {session.studentCount?.length}/{session.maxMember}
            </p>
          )}

          <p
            className={`text-sm cursor-pointer ${
              session.selectedSessionType === "TUTOR-LED"
                ? "text-purple-300 hover:text-purple-200"
                : "text-purple-500 hover:text-purple-400"
            }`}
          >
            {SESSION_TYPE_MN_MAP[session.selectedSessionType]}
          </p>

          {sessionListType === "other" && <JoinBtn session={session} />}
          <InviteBtnDialog session={session} />
        </div>
      </div>

      {open && (
        <SessionCardDetails
          session={session}
          sessionListType={sessionListType}
          joinedStudents={joinedStudents}
        />
      )}
    </div>
  );
};
