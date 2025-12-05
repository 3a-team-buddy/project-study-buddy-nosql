"use client";

import { useEffect, useState } from "react";
import { CreateSessionType } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { useSession } from "./use-session";

export const useOtherSession = () => {
  const { getToken } = useAuth();
  const { setIsLoading } = useSession();
  const [otherSessions, setOtherSessions] = useState<CreateSessionType[]>([]);

  const getOtherSessions = async () => {
    setIsLoading(true);

    const token = await getToken();

    const result = await fetch("/api/get-other-sessions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!result) {
      toast.error("No other sessions!");
    }

    const { data } = await result.json();
    setOtherSessions(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getOtherSessions();
  }, []);

  return { otherSessions };
};
