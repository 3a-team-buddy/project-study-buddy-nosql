"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { CreateSessionType } from "@/lib/types";
import { toast } from "sonner";
import { useSession } from "./use-session";

export const useCreatedSession = () => {
  const { getToken } = useAuth();
  const { setIsLoading } = useSession();
  const [createdSessions, setCreatedSessions] = useState<CreateSessionType[]>(
    []
  );

  const getCreatedSessions = async () => {
    setIsLoading(true);

    const token = await getToken();

    const result = await fetch("/api/get-created-sessions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!result) {
      toast.error("No created sessions!");
    }

    const { data } = await result.json();
    setCreatedSessions(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getCreatedSessions();
  }, []);

  return { createdSessions };
};
