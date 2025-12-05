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
  selectedType,
}: {
  session: CreateSessionType;
  selectedType: "created" | "joined" | "other" | undefined;
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

      {selectedType === "created" ? (
        <div className="w-fit flex gap-2">
          <Button
            variant={"secondary"}
            className="w-full text-accent-foreground cursor-pointer"
          >
            Edit
          </Button>
          <Button variant={"destructive"} className="w-full cursor-pointer">
            Delete Session
          </Button>
        </div>
      ) : selectedType === "joined" ? (
        <Button
          variant={"destructive"}
          onClick={() => leaveSession(session._id)}
          className="w-full cursor-pointer"
        >
          Leave Session
        </Button>
      ) : (
        <Button className="w-full bg-[#2563EB]">Join</Button>
      )}
    </div>
  );
};
