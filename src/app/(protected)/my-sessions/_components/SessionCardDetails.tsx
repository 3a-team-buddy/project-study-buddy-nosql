"use client";

import React from "react";
import { Button, Separator } from "@/components/ui";
import { CreateSessionType } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import {
  ParticipantsList,
  SessionDetails,
} from "../../create-session/_components";

export const SessionCardDetails = ({
  session,
}: {
  session: CreateSessionType;
}) => {
  const { getToken } = useAuth();

  async function leaveSession(id: string) {
    const token = await getToken();

    await fetch(`/api/create-new-session/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl leading-7 font-semibold">
          {session.sessionTopicTitle}
        </h2>
        <p className="text-sm text-white/60 leading-5">{session.description}</p>
      </div>

      <div className="flex flex-col gap-2">
        <Separator className="bg-gray-800" />
        <SessionDetails session={session} />
      </div>

      <div className="flex flex-col gap-2">
        <Separator className="bg-gray-800" />
        <ParticipantsList session={session} />
      </div>

      <Button
        variant={"destructive"}
        onClick={() => leaveSession(session._id)}
        className="w-full"
      >
        Leave Session
      </Button>
    </div>
  );
};
