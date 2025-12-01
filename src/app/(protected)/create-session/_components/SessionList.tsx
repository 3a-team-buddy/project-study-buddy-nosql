"use cLient";

import React from "react";
import { Button } from "@/components/ui";
import { BsFillPeopleFill, BsLink } from "react-icons/bs";
import { useSession } from "@/app/_hooks/use-session";
import { toast } from "sonner";
import { SessionInfoDialog } from "@/app/(protected)/create-session/_components";
import { useRouter } from "next/navigation";

export const SessionList = ({ userId }: { userId: string }) => {
  const { allSessions } = useSession();
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
      <>
        You have successfully joined the session.
        <br /> View your joined session on My Study Buddies.
      </>
    );
    // router.push("/my-sessions");
  };

  // console.log({ allSessions });

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl leading-7 font-semibold">Sessions</h2>

      <div className="flex flex-col gap-3">
        {allSessions.map((session) => (
          <div
            key={session._id}
            className="flex justify-between items-center p-4 rounded-2xl bg-[linear-gradient(180deg,#1E2648FF_0%,#122136FF_100%)]"
          >
            <SessionInfoDialog session={session} />

            <div className="flex justify-center gap-2">
              <Button
                disabled={session.studentCount.length === session.maxMember}
                onClick={() => {
                  joinedStudentHandler(session._id);
                }}
                className="rounded-full bg-[#2563EB] hover:bg-[#1d4ed8] gap-1 cursor-pointer text-white/80 hover:text-white disabled:cursor-not-allowed disabled:bg-white/40  disabled:hover:bg-white/40"
              >
                <BsFillPeopleFill />
                <div>
                  {session.studentCount.length}
                  <span>/{session.maxMember}</span>
                </div>
                <div>JOIN</div>
              </Button>

              <Button className="rounded-full bg-[#2563EB17] hover:bg-[#2563EB33] gap-1 cursor-pointer font-bold text-[#1d4ed8] hover:text-[#2563EB]">
                <BsLink />
                <div>Invite</div>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
