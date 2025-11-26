import React from "react";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";
import { ParticipantsList } from "../../my-sessions/_components/ParticipantsList";

export const CreateSessionInfoDialog = () => {
  return (
    <div className="w-full rounded-xl px-8 py-6 bg-gray-700 shadow-xl">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Advanced UI/UX Design Principles
      </h2>

      <p className="text-sm text-gray-300 mb-6 leading-relaxed">
        Dive deep into modern UI/UX design, exploring advanced concepts...
      </p>

      <h3 className="text-white font-semibold mb-2">Session Details</h3>

      <div className="space-y-3 text-gray-300">
        <p className="flex items-center gap-2">
          <FiCalendar /> Date: October 26, 2024
        </p>
        <p className="flex items-center gap-2">
          <FiClock /> Time: 10:00 AM - 12:00 PM (2 hours)
        </p>
        <p className="flex items-center gap-2">
          <FiUser /> Session type: <span className="text-purple-300">SELF</span>
        </p>
        <ParticipantsList />
      </div>
    </div>
  );
};
