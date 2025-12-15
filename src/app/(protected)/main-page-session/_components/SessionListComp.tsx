"use client";

import React from "react";
import { useSession } from "@/app/_hooks/use-session";
import {
  SessionCard,
  SessionListSkeleton,
} from "@/app/(protected)/main-page-session/_components";
import { CreateSessionType, SessionListType } from "@/lib/types";

export const SessionListComp = () => {
  const { createdSessions, joinedSessions, otherSessions, isLoading } =
    useSession();

  const sessionLists: {
    title: string;
    type: SessionListType;
    sessions: CreateSessionType[];
  }[] = [
    {
      title: "Үүсгэсэн давтлагууд",
      type: "created",
      sessions: createdSessions,
    },
    {
      title: "Миний давтлагууд",
      type: "joined",
      sessions: joinedSessions,
    },
    {
      title: "Бусад давтлагууд",
      type: "other",
      sessions: otherSessions,
    },
  ];

  return (
    <div className="flex-1">
      <div className="flex flex-col gap-10">
        {sessionLists.map((sessionList) => (
          <div key={sessionList.title} className="flex flex-col gap-3">
            <div className="text-xl flex-1 leading-7 font-semibold">
              {sessionList.title}
            </div>

            {isLoading ? (
              <SessionListSkeleton />
            ) : sessionList.sessions?.length ? (
              <div className="flex flex-col gap-3">
                {sessionList.sessions?.map((session) => (
                  <SessionCard
                    key={session._id}
                    session={session}
                    sessionListType={sessionList.type}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl px-8 py-6 bg-linear-to-b from-[#1E2648]/40 to-[#122136]/40 shadow-xl">
                <p className="text-sm opacity-70 text-center">
                  {sessionList.type === "created" && "Хоосон байна."}
                  {sessionList.type === "joined" && "Хоосон байна."}
                  {sessionList.type === "other" && "Хоосон байна."}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
