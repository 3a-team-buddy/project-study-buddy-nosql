"use client";

import { useEffect, useState } from "react";
import { useSession } from "./use-session";
import { ablyClient } from "@/lib/ably";
import { CreateSessionType } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import type * as Ably from "ably";

export const useJoinedSession = () => {
  const { getToken } = useAuth();
  const { setIsLoading } = useSession();
  const [joinedSessions, setJoinedSessions] = useState<CreateSessionType[]>([]);

  const getJoinedSessions = async () => {
    setIsLoading(true);

    const token = await getToken();

    const result = await fetch("/api/get-joined-sessions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!result.ok) {
      toast.error("No joined sessions!");
    }

    const { data } = await result.json();
    setJoinedSessions(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getJoinedSessions();

    const channel = ablyClient.channels.get("sessions");

    // const handleCreated = (message: any) => {
    //   if (message.name !== "session-created") return;
    //   if (!message.data) return;

    //   setJoinedSessions((prev) => {
    //     if (prev.some((session) => session._id === message.data._id))
    //       return prev;
    //     return [message.data, ...prev];
    //   });
    // };

    const handleJoined = (message: Ably.Message) => {
      if (message.name !== "session-joined") return;
      if (!message.data) return;
      const { sessionId, userId } = message.data;

      setJoinedSessions((prev) =>
        prev.map((session) =>
          session._id === sessionId
            ? {
                ...session,
                studentCount: [...session.studentCount, userId],
              }
            : session
        )
      );
    };

    // channel.subscribe("session-created", handleCreated);
    channel.subscribe("session-joined", handleJoined);

    return () => {
      //   channel.unsubscribe("session-created", handleCreated);
      channel.unsubscribe("session-joined", handleJoined);
    };
  }, []);

  return { joinedSessions };
};
