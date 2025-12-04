"use client";

import { Button } from "@/components/ui";
import { CreateSessionType } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import React from "react";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";

export const DetailJoinedSession = ({
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
    <div>
      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">
          {session.sessionTopicTitle}
        </h2>

        <p className="text-sm text-gray-300 mb-6 leading-relaxed">
          {session.description}
        </p>

        <h3 className="text-white font-semibold mb-2">Session Details</h3>

        <div className="space-y-3 text-gray-300">
          <p className="flex items-center gap-2">
            <FiCalendar /> Date: {session.value}
          </p>
          <p className="flex items-center gap-2">
            <FiClock /> Time: {session.time} (2 hours)
          </p>
          <p className="flex items-center gap-2">
            <FiUser /> Session type:{" "}
            <span className="text-purple-300">
              {session.selectedSessionType}
            </span>
          </p>
        </div>

        <Button
          variant={"destructive"}
          className="w-full  mt-6"
          onClick={() => leaveSession(session._id)}
        >
          Leave Session
        </Button>
      </div>
    </div>
  );
};
