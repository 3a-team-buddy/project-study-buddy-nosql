"use client";

import { useEffect, useState } from "react";
import { CreateSessionType } from "@/lib/types";
import { toast } from "sonner";
import { ablyClient } from "@/lib/ably";
import type * as Ably from "ably";
import { useAuth } from "@clerk/nextjs";

export const useSession = () => {
  const { getToken } = useAuth();

  const [sessions, setSessions] = useState<{
    createdSessions: CreateSessionType[];
    joinedSessions: CreateSessionType[];
    otherSessions: CreateSessionType[];
    allSessions: CreateSessionType[];
    userId: string | null;
  }>({
    createdSessions: [],
    joinedSessions: [],
    otherSessions: [],
    allSessions: [],
    userId: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getSessions = async () => {
    setIsLoading(true);

    const token = await getToken();

    const result = await fetch("/api/get-all-sessions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!result) {
      toast.error("No sessions!");
    }

    const { data } = await result.json();

    setSessions({
      createdSessions: data?.createdSessions,
      joinedSessions: data.joinedSessions,
      otherSessions: data.otherSessions,
      allSessions: data.allSessions,
      userId: data.userId,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    getSessions();

    const channel = ablyClient.channels.get("sessions");

    const handleCreated = (message: Ably.Message) => {
      if (message.name !== "session-created") return;

      const newSession = message.data;

      setSessions((prev) => ({
        ...prev,
        allSessions: [newSession, ...prev.allSessions],
        createdSessions:
          newSession.creatorId === prev.userId
            ? [newSession, ...prev.createdSessions]
            : prev.createdSessions,

        otherSessions:
          newSession.creatorId !== prev.userId
            ? [newSession, ...prev.otherSessions]
            : prev.otherSessions,
      }));

      // return [newSession, ...prev].sort(
      //   (a, b) =>
      //     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      // );
    };

    const handleJoined = (message: Ably.Message) => {
      if (message.name !== "session-joined") return;

      const { sessionId, userId } = message.data;

      setSessions((prev) => {
        const update = (sessions: CreateSessionType[]) =>
          sessions.map((session) =>
            session._id === sessionId
              ? {
                  ...session,
                  studentCount: [...(session.studentCount ?? []), userId],
                }
              : session
          );

        return {
          ...prev,
          allSessions: update(prev.allSessions),
          createdSessions: update(prev.createdSessions),
          joinedSessions: update(prev.joinedSessions),
          otherSessions: update(prev.otherSessions),
        };
      });
    };

    const handleRemoved = (message: Ably.Message) => {
      if (message.name !== "student-removed") return;

      const { sessionId, userId } = message.data;

      setSessions((prev) => {
        const update = (sessions: CreateSessionType[]) =>
          sessions.map((session) =>
            session._id === sessionId
              ? {
                  ...session,
                  studentCount: session.studentCount?.filter(
                    (id) => id !== userId
                  ),
                }
              : session
          );

        return {
          ...prev,
          allSessions: update(prev.allSessions),
          createdSessions: update(prev.createdSessions),
          joinedSessions:
            prev.userId === userId
              ? prev.joinedSessions.filter(
                  (session) => session._id !== sessionId
                )
              : update(prev.joinedSessions),
          otherSessions: update(prev.otherSessions),
        };
      });
    };

    const handleDeleted = (message: Ably.Message) => {
      if (message.name !== "session-deleted") return;

      const { sessionId } = message.data;

      setSessions((prev) => {
        const filter = (sessions: CreateSessionType[]) =>
          sessions.filter((session) => session._id !== sessionId);

        return {
          ...prev,
          allSessions: filter(prev.allSessions),
          createdSessions: filter(prev.createdSessions),
          joinedSessions: filter(prev.joinedSessions),
          otherSessions: filter(prev.otherSessions),
        };
      });
    };

    channel.subscribe("session-created", handleCreated);
    channel.subscribe("session-joined", handleJoined);
    channel.subscribe("student-removed", handleRemoved);
    channel.subscribe("session-deleted", handleDeleted);

    return () => {
      channel.unsubscribe("session-created", handleCreated);
      channel.unsubscribe("session-joined", handleJoined);
      channel.unsubscribe("student-removed", handleRemoved);
      channel.unsubscribe("session-deleted", handleDeleted);
    };
  }, []);

  return { ...sessions, isLoading, setIsLoading };
};
