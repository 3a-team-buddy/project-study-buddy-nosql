import React from "react";
import { ParticipantItem } from "./ParticipantItem";

const participants = [
  { name: "Alice Johnson" },
  { name: "Bob Smith" },
  { name: "Charlie Brown" },
  { name: "Diana Prince" },
  { name: "Diana Prince" },
];

export const ParticipantsList = () => {
  return (
    <div className="mt-6">
      <h3 className="text-white font-semibold mb-3">Participants</h3>

      <div className="flex flex-col gap-3">
        {participants.map((p, i) => (
          <ParticipantItem key={i} name={p.name} />
        ))}
      </div>
    </div>
  );
};
