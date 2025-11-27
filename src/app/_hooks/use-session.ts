"use client";
import { CreateSessionType } from "@/lib/types";
import { useEffect, useState } from "react";

export const useSession = () => {
  const [allSessions, setAllSessions] = useState<CreateSessionType[]>([]);

  console.log({ allSessions });

  const getSessions = async () => {
    const result = await fetch("api/create-new-session");
    const { data } = await result.json();

    console.log({ data });

    if (!result.ok) {
      alert("ALDAA");
    }
    // const { data } = responseData;
    console.log({ result });
    setAllSessions(data);
  };

  useEffect(() => {
    getSessions();
  }, []);

  return { allSessions };
};
