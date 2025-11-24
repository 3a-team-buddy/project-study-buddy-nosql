"use client";

import { Label } from "@/components/ui/label";
import React, { useState } from "react";

export default function MemberLimitSelector({
  minMember,
  setMinMember,
  setMaxMember,
  maxMember,
}: {
  minMember: number;
  setMinMember: (minMember: number) => void;
  maxMember: number;
  setMaxMember: (maxMember: number) => void;
}) {
  const handleChange1 = (type: "min", value: number) => {
    if (type === "min") setMinMember(value);

    console.log("Min:", type === "min" ? value : minMember);
  };
  const handleChange = (type: "max", value: number) => {
    if (type === "max") setMaxMember(value);

    console.log("Max:", type === "max" ? value : maxMember);
  };

  return (
    <div className="flex flex-col gap-3 text-white w-full max-w-sm">
      <Label>Member Limit</Label>

      <div className="flex flex-col gap-3">
        <select
          className="
            bg-[#0F2343] 
            border-white/2 
            rounded-lg px-3 py-2 
            focus:outline-none focus:ring-0
          "
          value={minMember}
          onChange={(e) => handleChange1("min", Number(e.target.value))}
        >
          {Array.from({ length: 8 - 4 + 1 }, (_, i) => 4 + i).map((n) => (
            <option key={n} value={n}>
              Min: {n}
            </option>
          ))}
        </select>

        <select
          className="
            bg-[#0F2343] 
             border-white/2
            rounded-lg px-3 py-2 
            focus:outline-none focus:ring-0
          "
          value={maxMember}
          onChange={(e) => handleChange("max", Number(e.target.value))}
        >
          {Array.from({ length: 15 - 5 + 1 }, (_, i) => 5 + i).map((n) => (
            <option key={n} value={n}>
              Max: {n}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
function setMinMember(value: number) {
  throw new Error("Function not implemented.");
}
