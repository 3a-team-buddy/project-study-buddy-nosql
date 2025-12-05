import { Skeleton } from "@/components/ui";
import { CreateSessionType } from "@/lib/types";
import React from "react";

export const ParticipantsSkeleton = ({
  session,
}: {
  session: CreateSessionType;
}) => {
  return (
    <div>
      {session.studentCount?.map((i, index) => (
        <div key={index} className="flex gap-2 items-center">
          <Skeleton className="rounded-full h-6 w-6 opacity-10 mb-2" />
          <Skeleton className="flex-1 h-5 rounded-2xl opacity-10 mb-2" />
        </div>
      ))}
    </div>
  );
};
