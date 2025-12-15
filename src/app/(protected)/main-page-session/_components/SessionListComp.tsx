"use client";

import React from "react";
import { useSession } from "@/app/_hooks/use-session";
import {
  SessionCard,
  SessionListSkeleton,
} from "@/app/(protected)/main-page-session/_components";
import { CreateSessionType, SessionListType } from "@/lib/types";
import { CubeReflectionMapping } from "three";

export const SessionListComp = () => {
  const { createdSessions, joinedSessions, otherSessions, isLoading } =
    useSession();

  // const date = updatedSession.value;
  // const time = updatedSession.time;

  // const date = createdSessions.
  // const current = new Date();
  // const currentDate = current.toString();
  // console.log({ createdSessions });
  // console.log({ currentDate }, "dates");

  const sessionLists: {
    title: string;
    type: SessionListType;
    sessions: CreateSessionType[];
  }[] = [
    {
      title: "Created Sessions",
      type: "created",
      sessions: createdSessions,
    },
    {
      title: "Joined Sessions",
      type: "joined",
      sessions: joinedSessions,
    },
    {
      title: "More Sessions to join",
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
                  {sessionList.type === "created" &&
                    "You haven't created any sessions yet."}
                  {sessionList.type === "joined" &&
                    "You haven't joined any sessions yet."}
                  {sessionList.type === "other" &&
                    "No more sessions are available to join."}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
