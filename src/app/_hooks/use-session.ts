"use client";

import { useEffect, useState } from "react";
import { CreateSessionType } from "@/lib/types";

export const useSession = () => {
  const [allSessions, setAllSessions] = useState<CreateSessionType[]>([]);

  console.log({ allSessions });

  const getSessions = async () => {
    const result = await fetch("/api/create-new-session");
    const { data } = await result.json();

    if (!result.ok) {
      alert("No sessions found!");
    }

    setAllSessions(data);
  };

  useEffect(() => {
    getSessions();
  }, []);

  return { allSessions };
};
