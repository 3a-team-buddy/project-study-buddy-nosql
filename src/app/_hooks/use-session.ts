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
      setIsLoading(false);
      return;
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

    ablyClient.connection.on("connected", () => {
      console.log("⚡ Ably connected!");
    });

    const channel = ablyClient.channels.get("sessions");

    const addIfNotExists = (arr: string[], id: string) =>
      arr.includes(id) ? arr : [...arr, id];

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
        const isUser = prev.userId === userId;

        const update = (sessions: CreateSessionType[]) =>
          sessions.map((session) =>
            session._id === sessionId
              ? {
                  ...session,
                  studentCount: addIfNotExists(
                    session.studentCount ?? [],
                    userId
                  ),
                }
              : session
          );

        let joinedSessions = prev.joinedSessions;
        let otherSessions = prev.otherSessions;

        if (isUser) {
          const joinedSession = prev.allSessions.find(
            (session) => session._id === sessionId
          );

          if (joinedSession) {
            joinedSessions = [
              {
                ...joinedSession,
                studentCount: addIfNotExists(
                  joinedSession.studentCount ?? [],
                  userId
                ),
              },
              ...prev.joinedSessions,
            ];
          }

          otherSessions = prev.otherSessions.filter(
            (session) => session._id !== sessionId
          );
        } else {
          joinedSessions = update(prev.joinedSessions);
          otherSessions = update(prev.otherSessions);
        }

        return {
          ...prev,
          allSessions: update(prev.allSessions),
          createdSessions: update(prev.createdSessions),
          joinedSessions,
          otherSessions,
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

        const isUser = prev.userId === userId;

        let joinedSessions = prev.joinedSessions;
        let otherSessions = prev.otherSessions;

        if (isUser) {
          joinedSessions = prev.joinedSessions.filter(
            (session) => session._id !== sessionId
          );

          const updatedSession = update(prev.allSessions).find(
            (session) => session._id === sessionId
          );

          if (updatedSession) {
            otherSessions = [updatedSession, ...prev.otherSessions];
          }
        } else {
          joinedSessions = update(prev.joinedSessions);
          otherSessions = update(prev.otherSessions);
        }

        return {
          ...prev,
          allSessions: update(prev.allSessions),
          createdSessions: update(prev.createdSessions),
          joinedSessions,
          otherSessions,
        };
      });
    };

    const handleDeleted = (message: Ably.Message) => {
      if (message.name !== "session-deleted") return;

      const { sessionId } = message.data;

      const filter = (arr: CreateSessionType[]) =>
        arr.filter((s) => s._id !== sessionId);

      setSessions((prev) => ({
        ...prev,
        allSessions: filter(prev.allSessions),
        createdSessions: filter(prev.createdSessions),
        joinedSessions: filter(prev.joinedSessions),
        otherSessions: filter(prev.otherSessions),
      }));
    };

    const handleRated = (message: Ably.Message) => {
      if (message.name !== "session-rated") return;

      const { sessionId, status, isRated } = message.data;

      setSessions((prev) => ({
        ...prev,
        createdSessions: prev.createdSessions.filter(
          (s) => s._id !== sessionId
        ),
        allSessions: prev.allSessions.map((s) =>
          s._id === sessionId ? { ...s, status, isRated } : s
        ),
      }));
    };

    channel.subscribe("session-created", handleCreated);
    channel.subscribe("session-joined", handleJoined);
    channel.subscribe("student-removed", handleRemoved);
    channel.subscribe("session-deleted", handleDeleted);
    channel.subscribe("session-rated", handleRated);

    return () => {
      channel.unsubscribe("session-created", handleCreated);
      channel.unsubscribe("session-joined", handleJoined);
      channel.unsubscribe("student-removed", handleRemoved);
      channel.unsubscribe("session-deleted", handleDeleted);
      channel.unsubscribe("session-rated", handleRated);
    };
  }, []);

  return { ...sessions, isLoading, setIsLoading };
};
