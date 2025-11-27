"use client";

import React, { useState } from "react";
import { JoinedSessions } from "./_components/JoinedSessions";
import { MoreSessions } from "./_components/MoreSessions";
import { useSession } from "@/app/_hooks/use-session";

const MySessionPage = () => {
  const [clicked, setCLicked] = useState(false);
  const { allSessions } = useSession();
  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-3">
        {allSessions.map((el) => (
          <div className="flex justify-between">
            <div
              onClick={() => {
                setCLicked(true);
              }}
              className="bg-white rounded-full"
            >
              <div>{el.sessionTopicTitle}</div>
            </div>

            {clicked && el._id ? (
              <div className="bg-red-400">{el.time}</div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>{" "}
      <div className="w-full min-h-screen p-10">
        {/* Left side session lists */}
        <div className="flex-1">
          <div className="flex flex-col gap-15">
            <JoinedSessions />

            <MoreSessions />
          </div>
        </div>
        {allSessions.map((session) => (
          <div key={session._id}>
            {/* Right panel */}
            {/* <SessionDetails session={session} /> */}
          </div>
        ))}
      </div>
      <div className="w-[600px] rounded-xl bg-[#0E1B2EFF] shadow-xl"></div>
    </div>
  );
};
export default MySessionPage;
