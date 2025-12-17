"use client";

import { isSessionExpired } from "@/lib/session-time-expired";
import { useEffect, useState } from "react";

export const useSessionExpired = (
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

  return { isExpired: isSessionExpired(date, time, now), now };
};
