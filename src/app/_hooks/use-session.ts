"use client";

import { useEffect, useState } from "react";
import { CreateSessionType } from "@/lib/types";
import { toast } from "sonner";

export const useSession = () => {
  const [allSessions, setAllSessions] = useState<CreateSessionType[]>([]);

  console.log({ allSessions });

  const getSessions = async () => {
    const result = await fetch("/api/get-sessions");
    const { data } = await result.json();

    if (!result.ok) {
      toast.error("No sessions found!");
    }

    setAllSessions(data);
  };

  useEffect(() => {
    getSessions();
  }, []);

  return { allSessions, reFetchSessions: getSessions };
};
