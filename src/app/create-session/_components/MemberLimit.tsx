"use client";

import React, { useState } from "react";

export default function MemberLimit() {
  const [minMember, setMinMember] = useState(4);
  const [maxMember, setMaxMember] = useState(5);

  return (
    <div className="flex gap-4">
      <select
        className="bg-[#0D203A] border border-white/20 rounded-lg px-3 py-2"
        value={minMember}
        onChange={(e) => setMinMember(Number(e.target.value))}
      >
        {Array.from({ length: 8 - 4 + 1 }, (_, i) => 4 + i).map((n) => (
          <option key={n} value={n}>
            Min: {n}
          </option>
        ))}
      </select>

      <select
        className="bg-[#0D203A] border border-white/20 rounded-lg px-3 py-2"
        value={maxMember}
        onChange={(e) => setMaxMember(Number(e.target.value))}
      >
        {Array.from({ length: 15 - 5 + 1 }, (_, i) => 5 + i).map((n) => (
          <option key={n} value={n}>
            Max: {n}
          </option>
        ))}
      </select>
    </div>
  );
}
