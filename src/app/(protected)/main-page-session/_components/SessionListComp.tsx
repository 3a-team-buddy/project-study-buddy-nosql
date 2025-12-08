import { useCreatedSession } from "@/app/_hooks/use-created-session";
import { useJoinedSession } from "@/app/_hooks/use-joined-session";
import { useOtherSession } from "@/app/_hooks/use-other-session";
import { useSession } from "@/app/_hooks/use-session";
import { JoinedStudentType } from "@/lib/types";
import React, { useState } from "react";
import { toast } from "sonner";
import { SessionListSkeleton } from "../../create-session/_components";
import { SessionCard } from "../../my-sessions/_components/SessionCard";
import { Accordion } from "@/components/ui/accordion";

const SessionListComp = () => {
  const { joinedSessions } = useJoinedSession();
  const { createdSessions } = useCreatedSession();
  const { otherSessions } = useOtherSession();
  const { isLoading, allSessions } = useSession();
  const [selectedSessionId, setSelectedSessionId] = useState<string>("");
  const [selectedType, setSelectedType] = useState<
    "created" | "joined" | "other"
  >();

  const filteredSession = allSessions.filter(
    (session) => session._id === selectedSessionId
  );

  const getSessionType = (name: string): "created" | "joined" | "other" => {
    if (name === "Created Sessions") return "created";
    if (name === "Joined Sessions") return "joined";
    return "other";
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
    <div>
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
    </div>
  );
};

export default SessionListComp;
