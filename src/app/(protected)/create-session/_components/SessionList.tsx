"use cLient";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui";
import { BsFillPeopleFill, BsLink } from "react-icons/bs";
import { CreateSessionInfoDialog } from "./CreateSessionInfoDialog";
import { useSession } from "@/app/_hooks/use-session";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { toast } from "sonner";

type SessionListProps = {
  userId: string;
};
export const SessionList = (userId: SessionListProps) => {
  const { allSessions } = useSession();

  async function sendTutorEmail(session1: string) {
    const joinedStudentSessionId = session1;

    const response = await fetch("api/mock-datas/joined-students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        joinedStudentSessionId,
      }),
    });
    // console.log({ joinedStudentClerckId });

    if (!response.ok) {
      toast.error("Failed to create joined student");
    }
    toast.success("successfully");
  }
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl leading-7 text-white">Sessions</h2>

      <div className="flex flex-col gap-3">
        {allSessions.map((session) => (
          <div
            key={session._id}
            className="flex justify-between items-center p-4 rounded-3xl bg-[linear-gradient(180deg,#1E2648_0%,#122136_100%)] hover:bg-white/10"
          >
            <Dialog>
              <DialogTrigger>
                <span className="text-xl text-white font-bold cursor-pointer">
                  {session.sessionTopicTitle}
                </span>
              </DialogTrigger>

              <DialogContent className="p-0 bg-transparent">
                <VisuallyHidden>
                  <DialogTitle />
                </VisuallyHidden>
                <CreateSessionInfoDialog session={session} />
              </DialogContent>
            </Dialog>

            <div className="flex flex-col align-items-center justify-center gap-2">
              <Button
                onClick={() => {
                  const session1 = session._id;
                  sendTutorEmail(session1);
                }}
                className="rounded-3xl bg-[#2563EBFF] hover:[#1d4ed8] gap-1 cursor-pointer"
              >
                <BsFillPeopleFill />
                1/{session.maxMember}
                <p>JOIN</p>
              </Button>
              <Button className="rounded-3xl bg-[#2563EB17] hover:bg-[#2563EB33] gap-1 font-bold text-[#2563EBFF] cursor-pointer">
                <BsLink />
                <p>Invite</p>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
