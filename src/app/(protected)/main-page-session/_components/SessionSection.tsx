"use client";

import React, { useMemo } from "react";
import { useSessionDuetime } from "@/app/_hooks/use-session-duetime";
import { CreateSessionType, SessionListType } from "@/lib/types";
import {
  SessionCard,
  SessionListSkeleton,
} from "@/app/(protected)/main-page-session/_components";

export const SessionSection = ({
  title,
  type,
  sessions,
  statusFilter,
  isLoading,
}: {
  title: string;
  type: SessionListType;
  sessions: CreateSessionType[];
  statusFilter: string;
  isLoading: boolean;
}) => {
  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      const { isOngoing, isCompleted, isStarted } = useSessionDuetime(
        session.value,
        session.time
      );

      const computedStatus = isOngoing
        ? "ONGOING"
        : isCompleted
        ? "COMPLETED"
        : session.status;

      if (statusFilter === "ALL" && session.status === "WAITING" && isStarted) {
        return false;
      }

      if (statusFilter === "ALL") return true;

      return computedStatus === statusFilter;
    });
  }, [sessions, statusFilter]);

  return (
    <div className="flex flex-col gap-3">
      <div className="text-xl leading-6 font-semibold">{title}</div>

      {isLoading ? (
        <SessionListSkeleton />
      ) : filteredSessions.length ? (
        filteredSessions.map((session) => (
          <SessionCard
            key={session._id}
            session={session}
            sessionListType={type}
          />
        ))
      ) : (
        <p className="text-sm opacity-60 text-center py-6">Хоосон байна</p>
      )}
    </div>
  );
};
// <div className="flex-1">
//   <div className="flex flex-col gap-10">
//     {sessionLists.map((sessionList) => (
//       <div key={sessionList.title} className="flex flex-col gap-3">
//         <div className="text-xl flex-1 leading-7 font-semibold">
//           {sessionList.title}
//         </div>

//         {isLoading ? (
//           <SessionListSkeleton />
//         ) : sessionList.sessions?.length ? (
//           <div className="flex flex-col gap-3">
//             {sessionList.sessions?.map((session) => (
//               <SessionCard
//                 key={session._id}
//                 session={session}
//                 sessionListType={sessionList.type}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="rounded-2xl px-8 py-6 bg-linear-to-b from-[#1E2648]/40 to-[#122136]/40 shadow-xl">
//             <p className="text-sm opacity-70 text-center">
//               {sessionList.type === "created" && "Хоосон байна."}
//               {sessionList.type === "joined" && "Хоосон байна."}
//               {sessionList.type === "other" && "Хоосон байна."}
//             </p>
//           </div>
//         )}
//       </div>
//     ))}
//   </div>
// </div>
