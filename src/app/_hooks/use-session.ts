"use client";

import { useEffect, useState } from "react";
import { CreateSessionType } from "@/lib/types";
import { toast } from "sonner";
import { ablyClient } from "@/lib/ably";

export const useSession = () => {
  const [allSessions, setAllSessions] = useState<CreateSessionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log({ allSessions });

  const getSessions = async () => {
    setIsLoading(true);
    const result = await fetch("/api/get-sessions");
    const { data } = await result.json();

    if (!result.ok) {
      toast.error("No sessions!");
    }

    setAllSessions(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getSessions();

    const channel = ablyClient.channels.get("sessions");

    const handleCreated = async (message: any) => {
      if (message.name !== "session-created") return;
      if (!message.data) return;

      await getSessions();

      setAllSessions((prev) => {
        if (prev.some((session) => session._id === message.data._id))
          return prev;
        return [message.data, ...prev];
      });
    };

    const handleJoined = (message: any) => {
      if (message.name !== "session-joined") return;
      if (!message.data) return;
      const { sessionId, studentClerkId } = message.data;

      setAllSessions((prev) =>
        prev.map((session) =>
          session._id === sessionId
            ? {
                ...session,
                studentCount: [...session.studentCount, studentClerkId],
              }
            : session
        )
      );
    };

    channel.subscribe("session-created", handleCreated);
    channel.subscribe("session-joined", handleJoined);

    return () => {
      channel.unsubscribe("session-created", handleCreated);
      channel.unsubscribe("session-joined", handleJoined);
    };
  }, []);

  return { allSessions, isLoading };
};
