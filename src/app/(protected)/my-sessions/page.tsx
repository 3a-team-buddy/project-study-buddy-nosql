"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui";
import { useJoinedSession } from "@/app/_hooks/use-joined-session";
import { useCreatedSession } from "@/app/_hooks/use-created-session";
import { useSession } from "@/app/_hooks/use-session";
import { useOtherSession } from "@/app/_hooks/use-other-session";
import { SessionCard } from "./_components/SessionCard";
import { SessionCardDetails } from "./_components/SessionCardDetails";
import { SessionListSkeleton } from "../create-session/_components";
import { JoinedStudentType } from "@/lib/types";
import { toast } from "sonner";

const MySessionPage = () => {
  const { joinedSessions } = useJoinedSession();
  const { createdSessions } = useCreatedSession();
  const { otherSessions } = useOtherSession();
  const { isLoading, allSessions } = useSession();
  const [selectedSessionId, setSelectedSessionId] = useState<string>("");
  const [selectedType, setSelectedType] = useState<
    "created" | "joined" | "other"
  >();
  const [joinedStudents, setJoinedStudents] = useState<JoinedStudentType[]>([]);

  const filteredSession = allSessions.filter(
    (session) => session._id === selectedSessionId
  );

  const getSessionType = (name: string): "created" | "joined" | "other" => {
    if (name === "Created Sessions") return "created";
    if (name === "Joined Sessions") return "joined";
    return "other";
  };

  const handleSessionOnClick = async (
    sessionId: string,
    type: "created" | "joined" | "other"
  ) => {
    setSelectedSessionId(sessionId);
    setSelectedType(type);

    const result = await fetch("/api/get-joined-students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: sessionId,
      }),
    });

    if (!result.ok) {
      toast.error("Failed to get joined students!");
    }

    const { data } = await result.json();
    setJoinedStudents(data);
  };

  const sessionLists = [
    {
      name: "Created Sessions",
      sessions: createdSessions,
    },
    {
      name: "Joined Sessions",
      sessions: joinedSessions,
    },
    {
      name: "More Sessions to join",
      sessions: otherSessions,
    },
  ];

  return (
    <div className="w-full min-h-screen flex gap-8 py-10 text-white">
      <div className="flex-1">
        <div className="flex flex-col gap-10">
          {sessionLists.map((sessionList) => (
            <div key={sessionList.name} className="flex flex-col gap-3">
              <div className="text-2xl leading-7 font-semibold">
                {sessionList.name}
              </div>

              {isLoading ? (
                <SessionListSkeleton />
              ) : sessionList.sessions?.length ? (
                <div className="flex flex-col gap-3">
                  {sessionList.sessions?.map((session) => (
                    <SessionCard
                      key={session._id}
                      session={session}
                      sessionListType={getSessionType(sessionList.name)}
                      handleSessionId={() =>
                        handleSessionOnClick(
                          session._id,
                          getSessionType(sessionList.name)
                        )
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl px-8 py-6 bg-[#0E1B2EFF] shadow-xl">
                  <p className="text-sm opacity-70 text-center">
                    {sessionList.name === "Created Sessions" &&
                      "You haven't created any sessions yet."}
                    {sessionList.name === "Joined Sessions" &&
                      "You haven't joined any sessions yet."}
                    {sessionList.name === "More Sessions to join" &&
                      "No more sessions are available to join."}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[480px] w-full h-full rounded-2xl px-8 py-6 bg-[#0E1B2EFF] shadow-xl">
        {filteredSession.length > 0 ? (
          <div>
            {filteredSession.map((session) => (
              <div key={session._id}>
                <SessionCardDetails
                  session={session}
                  selectedType={selectedType}
                  joinedStudents={joinedStudents}
                />
              </div>
            ))}
          </div>
        ) : (
          <Label className="text-md flex justify-center font-semibold pt-100">
            Please click on the session title to check its details.
          </Label>
        )}
      </div>
    </div>
  );
};

export default MySessionPage;
