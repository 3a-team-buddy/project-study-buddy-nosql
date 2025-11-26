import React from "react";
import { FiLink } from "react-icons/fi";

interface SessionCardProps {
  name: string;
  members?: string;
  status?: "accepted" | "waiting" | null;
  showJoin?: boolean;
}

export const SessionCard: React.FC<SessionCardProps> = ({
  name,
  members,
  status,
  showJoin = false,
}) => {
  return (
    <div className="w-full rounded-xl px-6 py-4 bg-linear-to-b from-[#1E2648] to-[#122136] flex justify-between items-center">
      <h3 className="text-white font-semibold">{name}</h3>

      <div className="flex items-center gap-4">
        {showJoin && (
          <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded-md">
            {members} JOIN
          </button>
        )}

        <button className="flex items-center text-sm text-blue-300 hover:text-blue-400">
          <FiLink className="mr-1" /> invite
        </button>

        {status && (
          <span
            className={`text-xs ${
              status === "accepted" ? "text-green-400" : "text-orange-300"
            }`}
          >
            {status}
          </span>
        )}
      </div>
    </div>
  );
};
