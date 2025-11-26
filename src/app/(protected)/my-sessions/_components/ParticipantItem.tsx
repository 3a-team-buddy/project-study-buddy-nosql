import React from "react";
interface ParticipantProps {
  name: string;
}

export const ParticipantItem: React.FC<ParticipantProps> = ({ name }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-gray-500"></div>
      <p className="text-white">{name}</p>
    </div>
  );
};
