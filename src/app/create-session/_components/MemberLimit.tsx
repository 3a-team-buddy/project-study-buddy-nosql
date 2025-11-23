"use client";

import { Label } from "@/components/ui/label";
import React, { useState } from "react";

export default function MemberLimitSelector() {
  const [minMember, setMinMember] = useState(4);
  const [maxMember, setMaxMember] = useState(5);

  const handleChange = (type: "min" | "max", value: number) => {
    if (type === "min") setMinMember(value);
    else setMaxMember(value);

    console.log("Min:", type === "min" ? value : minMember);
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
          onChange={(e) => handleChange("min", Number(e.target.value))}
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
