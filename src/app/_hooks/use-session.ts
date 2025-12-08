"use client";

import { useEffect, useState } from "react";
import { CreateSessionType } from "@/lib/types";
import { toast } from "sonner";
import { ablyClient } from "@/lib/ably";
import type * as Ably from "ably";

export const useSession = () => {
  const [allSessions, setAllSessions] = useState<CreateSessionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getSessions = async () => {
    setIsLoading(true);
    const result = await fetch("/api/get-sessions");

    if (!result.ok) {
      toast.error("No sessions!");
    }

    const { data } = await result.json();
    setAllSessions(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getSessions();

    const channel = ablyClient.channels.get("sessions");

    const handleCreated = (message: Ably.Message) => {
      if (message.name !== "session-created") return;
      const newSession = message.data;

      setAllSessions((prev) => {
        if (prev.some((session) => session._id === message.data._id))
          return prev;

        return [newSession, ...prev].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    };

    const handleJoined = (message: Ably.Message) => {
      if (message.name !== "session-joined") return;

      const { sessionId, userId } = message.data;

      setAllSessions((prev) =>
        prev.map((session) =>
          session._id === sessionId
            ? {
                ...session,
                studentCount: [...(session.studentCount ?? []), userId],
              }
            : session
        )
      );
    };

    const handleRemoved = (message: Ably.Message) => {
      if (message.name !== "student-removed") return;

      const { sessionId, userId } = message.data;

      setAllSessions((prev) =>
        prev.map((session) =>
          session._id === sessionId
            ? {
                ...session,
                studentCount: session.studentCount?.filter(
                  (id) => id !== userId
                ),
              }
            : session
        )
      );
    };

    const handleDeleted = (message: Ably.Message) => {
      if (message.name !== "session-deleted") return;

      const { sessionId } = message.data;

      setAllSessions((prev) =>
        prev.filter((session) => session._id !== sessionId)
      );
    };

    channel.subscribe("session-created", handleCreated);
    channel.subscribe("session-joined", handleJoined);
    channel.subscribe("student-removed", handleRemoved);
    channel.subscribe("session-deleted", handleDeleted);

    return () => {
      channel.unsubscribe("session-created", handleCreated);
      channel.unsubscribe("session-joined", handleJoined);
      channel.unsubscribe("student-removed", handleRemoved);
      channel.unsubscribe("session-deleted", handleDeleted);
    };
  }, []);

  return { allSessions, isLoading, setIsLoading };
};
