"use client";

import React, { Dispatch } from "react";
import { Label } from "@/components/ui";

export const MemberLimitSelector = ({
  minMember,
  setMinMember,
  maxMember,
  setMaxMember,
}: {
  minMember: number;
  setMinMember: Dispatch<React.SetStateAction<number>>;
  maxMember: number;
  setMaxMember: Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="w-full flex flex-col gap-5 text-white">
      <div className="flex flex-col gap-3">
        <Label>Minimum Member</Label>
        <select
          className="bg-black border-white/2 rounded-full px-3 py-2 focus:outline-none focus:ring-0"
          value={minMember}
          onChange={(e) => setMinMember(Number(e.target.value))}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <option key={i} value={5 + i}>
              {5 + i}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3">
        <Label>Maximum Member</Label>
        <select
          className="bg-[#0F2343] border-white/2 rounded-full px-3 py-2 focus:outline-none focus:ring-0"
          value={maxMember}
          onChange={(e) => setMaxMember(Number(e.target.value))}
        >
          {Array.from({ length: 11 }).map((_, i) => (
            <option key={i} value={5 + i}>
              {5 + i}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
