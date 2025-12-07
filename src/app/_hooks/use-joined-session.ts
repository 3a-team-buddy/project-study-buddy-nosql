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
  }, []);

  return { joinedSessions };
};
