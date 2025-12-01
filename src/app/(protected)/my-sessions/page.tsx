"use client";
import { useSession } from "@/app/_hooks/use-session";
import React, { useState } from "react";
import JoinedSessionCard from "./_components/JoinedSessionCard";
import MoreSessions from "./_components/MoreSessions";
import { DetailJoinedSession } from "./_components/DetailJoinedSession";

const MySessionPage = () => {
  const { allSessions } = useSession();
  const [selectedSessionId, setSelectedSessionId] = useState<string>("");

  const filteredSession = allSessions.filter(
    (session) => session._id === selectedSessionId
  );

  const handleSessionId = (sessionId: string) => {
    setSelectedSessionId(sessionId);
  };

  return (
    <div className="w-full min-h-screen flex gap-8 p-10 text-white">
      <div className="flex-1">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl text-white">Joined sessions</h2>
            {allSessions.map((session) => (
              <div key={session._id}>
                <JoinedSessionCard
                  session={session}
                  handleSessionId={() => handleSessionId(session._id)}
                />
              </div>
            ))}
          </div>
          <div>
            <MoreSessions />
          </div>
        </div>
      </div>

      <div className="max-w-[480px] w-full">
        {filteredSession.length > 0 ? (
          <div>
            {filteredSession.map((session) => (
              <div key={session._id}>
                <DetailJoinedSession session={session} />
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-[480px] rounded-xl px-8 bg-[#0E1B2EFF] shadow-xl h-200 flex items-center justify-center">
            <h2 className="text-md font-semibold text-white mb-4">
              {" "}
              Please choose your session to check the details.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySessionPage;
