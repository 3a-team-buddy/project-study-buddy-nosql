"use client";

import React, { ChangeEvent, Dispatch } from "react";
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
  const maxMemberHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const newMaxValue = Number(e.target.value);
    if (newMaxValue >= minMember) {
      setMaxMember(newMaxValue);
    }
  };
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <Label>Minimum Member</Label>
        <select
          value={minMember}
          onChange={(e) => setMinMember(Number(e.target.value))}
          className="bg-black/50 border border-border/20 rounded-md text-sm text-white/80 px-3 py-2 focus:outline-none focus:ring-0"
        >
          <option value="0" disabled className="bg-black">
            Select members
          </option>

          {Array.from({ length: 4 }).map((_, i) => (
            <option key={i} value={5 + i} className="bg-black">
              {5 + i}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3">
        <Label>Maximum Member</Label>
        <select
          value={maxMember}
          onChange={maxMemberHandler}
          className="bg-black/50 border border-border/20 rounded-md text-sm text-white/80 px-3 py-2 focus:outline-none focus:ring-0"
        >
          <option value="0" disabled className="bg-black">
            Select members
          </option>

          {Array.from({ length: 11 }).map((_, i) => {
            const selectableNum = 5 + i;
            if (selectableNum < minMember) {
              return null;
            }
            return (
              <option
                key={selectableNum}
                value={selectableNum}
                className="bg-black"
              >
                {selectableNum}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
