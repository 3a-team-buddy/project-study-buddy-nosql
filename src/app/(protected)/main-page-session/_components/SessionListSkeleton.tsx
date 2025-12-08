import React from "react";
import { Skeleton } from "@/components/ui";

export const SessionListSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="max-w-158 h-17 rounded-2xl opacity-10" />
      ))}
    </div>
  );
};
