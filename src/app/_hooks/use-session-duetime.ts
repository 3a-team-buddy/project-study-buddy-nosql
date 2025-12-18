"use client";

import { isSessionDuetime } from "@/lib/session-duetime";
import { useEffect, useState } from "react";

export const useSessionDuetime = (
  date: string,
  time: string,
  intervalMs: number = 60000
) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return { isDuetime: isSessionDuetime(date, time, now), now };
};
