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
    <div className="w-full flex flex-col gap-5 text-white">
      <div className="flex flex-col gap-3">
        <Label>Minimum Member</Label>
        <select
          className="bg-black border border-border/20 rounded-md px-3 py-2 focus:outline-none focus:ring-0"
          value={minMember}
          onChange={(e) => setMinMember(Number(e.target.value))}
        >
          <option value="0" disabled>
            Select members
          </option>

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
          className="bg-black border border-border/20 rounded-md px-3 py-2 focus:outline-none focus:ring-0"
          value={maxMember}
          onChange={maxMemberHandler}
        >
          <option value="0" disabled>
            Select members
          </option>

          {Array.from({ length: 11 }).map((_, i) => {
            const selectableNum = 5 + i;
            if (selectableNum < minMember) {
              return null;
            }
            return (
              <option key={selectableNum} value={selectableNum}>
                {selectableNum}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
