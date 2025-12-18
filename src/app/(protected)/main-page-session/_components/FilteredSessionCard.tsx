import React from "react";
import { useSessionDuetime } from "@/app/_hooks/use-session-duetime";
import { CreateSessionType } from "@/lib/types";
import { SessionCard } from "./SessionCard";

export const FilteredSessionCard = ({
  session,
  sessionListType,
}: {
  session: CreateSessionType;
  sessionListType: "created" | "joined" | "other";
}) => {
  const { isDuetime } = useSessionDuetime(session.value, session.time);

  const shouldHide =
    (isDuetime && ["WAITING", "CANCELED"].includes(session.status)) ||
    (session.status === "COMPLETED" && session.isRated);

  if (shouldHide) return null;

  return <SessionCard session={session} sessionListType={sessionListType} />;
};
