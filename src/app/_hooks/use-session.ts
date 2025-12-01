"use client";

import { useEffect, useState } from "react";
import { CreateSessionType } from "@/lib/types";
import { toast } from "sonner";
import { ablyClient } from "@/lib/ably";

export const useSession = () => {
  const [allSessions, setAllSessions] = useState<CreateSessionType[]>([]);

  console.log({ allSessions });

  const getSessions = async () => {
    const result = await fetch("/api/get-sessions");
    const { data } = await result.json();

    if (!result.ok) {
      toast.error("No sessions!");
    }

    setAllSessions(data);
  };

  useEffect(() => {
    getSessions();

    const channel = ablyClient.channels.get("updatedSession");

    const handleMessage = (message: any) => {
      if (message.name !== "session-created") return;
      if (!message.data) return;

      setAllSessions((prev) => {
        if (prev.some((session) => session._id === message.data._id))
          return prev;
        return [message.data, ...prev];
      });
    };

    channel.subscribe("session-created", handleMessage);

    return () => {
      channel.unsubscribe("session-created", handleMessage);
    };
  }, []);

  return { allSessions };
};
