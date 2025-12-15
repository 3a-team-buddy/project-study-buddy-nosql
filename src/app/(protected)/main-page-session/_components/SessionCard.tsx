"use client";

import React, { useEffect, useState } from "react";
import { CreateSessionType, JoinedStudentType } from "@/lib/types";
import { Button, Label, Textarea } from "@/components/ui";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
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

  const handleRate = (sessionId: string) => {};

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
            <p>{session.sessionTopicTitle}</p>

            <p className="flex gap-1 text-xs text-gray-400 text-start animate-pulse">
              <span>{formatToMonthDay(session.value)}</span>
              <span>{session.time}</span>
            </p>
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

          {canRate && (
            <Dialog>
              <DialogTrigger>
                <Button className="text-sm text-orange-400 hover:text-orange-300 animate-pulse bg-transparent hover:bg-transparent cursor-pointer">
                  Үнэлгээ
                </Button>
              </DialogTrigger>

              <DialogContent className="p-8 gap-5 border-0 rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="flex justify-around items-center">
                    <Label className="text-lg">
                      {session.sessionTopicTitle}
                    </Label>
                    <div className="flex gap-2 text-sm ">
                      {session.value} {session.time}
                    </div>
                  </DialogTitle>
                  <DialogDescription aria-hidden />
                </DialogHeader>

                <div className="flex flex-col gap-5 text-gray-500">
                  <div className="flex gap-20 items-center">
                    <Label className="text-base">Давтлага үнэлэх: </Label>
                    <div className="flex gap-10 justify-center text-black">
                      <Button className="bg-transparent hover:bg-transparent text-black cursor-pointer">
                        <PiHeartStraightBreakFill />
                      </Button>
                      <Button className="bg-transparent hover:bg-transparent text-black cursor-pointer">
                        <RiPokerHeartsFill />
                      </Button>
                      <Button className="bg-transparent hover:bg-transparent text-black cursor-pointer">
                        <BsHearts />
                      </Button>
                    </div>
                  </div>

                  <div className=" flex gap-20 items-center">
                    <Label className="text-base">Ментор үнэлэх: </Label>
                    <div className="flex gap-10 justify-center ml-2">
                      <Button className="bg-transparent hover:bg-transparent text-black cursor-pointer">
                        <PiHeartStraightBreakFill />
                      </Button>
                      <Button className="bg-transparent hover:bg-transparent text-black cursor-pointer">
                        <RiPokerHeartsFill />
                      </Button>
                      <Button className="bg-transparent hover:bg-transparent text-black cursor-pointer">
                        <BsHearts />
                      </Button>
                    </div>
                  </div>

                  <div className=" flex flex-col gap-1">
                    <Label className="text-base">Сэтгэгдэл үлдээх: </Label>
                    <Textarea />
                  </div>
                </div>

                <DialogFooter className="sm:justify-end">
                  <DialogClose asChild>
                    <Button variant="secondary" className="cursor-pointer">
                      Хаах
                    </Button>
                  </DialogClose>

                  <Button
                    onClick={() => handleRate(session._id)}
                    className="cursor-pointer"
                  >
                    Үнэлгээ өгөх
                  </Button>
                </DialogFooter>
              </DialogContent>
              <DialogClose />
            </Dialog>
          )}

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

          {session.selectedSessionType === "TUTOR-LED" && (
            <span className="text-sm">
              {session.assignedTutor?.mockUserName?.split(" ")[0]}
            </span>
          )}

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
