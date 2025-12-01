"use cLient";

import React, { Dispatch, useState } from "react";
import { Button } from "@/components/ui";
import { BsFillPeopleFill, BsLink } from "react-icons/bs";
import { useSession } from "@/app/_hooks/use-session";
import { toast } from "sonner";
import { SessionInfoDialog } from "@/app/(protected)/create-session/_components";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export const SessionList = ({
  userId,
}: {
  userId: string;
  maxMember: number;
  setMaxMember: Dispatch<React.SetStateAction<number>>;
}) => {
  const { allSessions, isLoading } = useSession();
  const router = useRouter();

  const joinedStudentHandler = async (sessionId: string) => {
    const response = await fetch("api/joined-students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentClerkId: userId,
        sessionId,
      }),
    });

    if (!response.ok) {
      toast.error("Failed to join the session");
    }
    toast.success(
      "You have successfully joined the session, View your joined session on My Study Buddies"
    );
    router.push("/my-sessions");
  };

  console.log({ allSessions });

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl leading-7 font-semibold">Sessions</h2>

      <div>
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                className="max-w-138 h-28 rounded-3xl opacity-10"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {allSessions.map((session) => (
              <div
                key={session._id}
                className="flex justify-between items-center p-4 rounded-3xl bg-[linear-gradient(180deg,#1E2648_0%,#122136_100%)] hover:bg-white/10"
              >
                <SessionInfoDialog session={session} />

                <div className="flex flex-col justify-center gap-2">
                  <Button
                    disabled={allSessions.length === 10}
                    onClick={() => {
                      joinedStudentHandler(session._id);
                    }}
                    className="rounded-full bg-[#2563EB] hover:bg-[#1d4ed8] gap-1 cursor-pointer text-white/80 hover:text-white"
                  >
                    <BsFillPeopleFill />
                    <div>
                      <span>{allSessions.length}</span>
                      <span>/{session.maxMember}</span>
                    </div>
                    <div>JOIN</div>
                  </Button>

                  <Button className="rounded-full bg-[#2563EB17] hover:bg-[#2563EB33] gap-1 font-bold text-[#1d4ed8] hover:text-[#2563EB] cursor-pointer">
                    <BsLink />
                    <div>Invite</div>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
