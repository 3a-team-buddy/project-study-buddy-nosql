"use client";
import React, { useState } from "react";
import { DetailJoinedSession } from "./_components/DetailJoinedSession";
import { Label, Skeleton } from "@/components/ui";
import { useJoinedSession } from "@/app/_hooks/use-joined-session";
import { useCreatedSession } from "@/app/_hooks/use-created-session";
import { useSession } from "@/app/_hooks/use-session";
import { useOtherSession } from "@/app/_hooks/use-other-session";
import { SessionCard } from "./_components/SessionCard";

const MySessionPage = () => {
  const { joinedSessions } = useJoinedSession();
  const { createdSessions } = useCreatedSession();
  const { otherSessions } = useOtherSession();
  const { isLoading } = useSession();
  const [selectedSessionId, setSelectedSessionId] = useState<string>("");

  const filteredSession = joinedSessions.filter(
    (session) => session._id === selectedSessionId
  );

  const handleSessionId = (sessionId: string) => {
    setSelectedSessionId(sessionId);
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
    <div className="w-full min-h-screen flex gap-8 p-10 text-white">
      <div className="flex-1">
        <div className="flex flex-col gap-10">
          {sessionLists.map((sessionList) => (
            <div key={sessionList.name} className="flex flex-col gap-3">
              <div className="text-2xl leading-7 font-semibold">
                {sessionList.name}
              </div>

              {isLoading ? (
                <div className="flex flex-col gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className="max-w-138 h-14 rounded-xl opacity-10"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {sessionList.sessions?.map((session) => (
                    <div key={session._id}>
                      <SessionCard
                        session={session}
                        handleSessionId={() => handleSessionId(session._id)}
                      />
                    </div>
                  ))}
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
                <DetailJoinedSession session={session} />
              </div>
            ))}
          </div>
        ) : (
          <Label className="text-md text-center font-semibold pt-100">
            Please click on the session title to check its details.
          </Label>
        )}
      </div>
    </div>
  );
};
export default MySessionPage;
