import React from "react";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";
import { ParticipantsList } from "./ParticipantsList";
import { Button } from "@/components/ui/button";
import { CreateSessionType } from "@/lib/types";
import { JoinedSessionParticipantsList } from "./JoinedSessionParticipantsList";

export const SideJoinedSessionDetail = ({ i }: { i: number }) => {
  return (
    <div className="max-w-[480px] rounded-xl px-8 py-6 bg-[#0E1B2EFF] shadow-xl">
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
      </div>

      {/* <JoinedSessionParticipantsList session={session} /> */}

      <Button variant={"destructive"} className="w-full  mt-6">
        Leave Session
      </Button>
    </div>
  );
};
