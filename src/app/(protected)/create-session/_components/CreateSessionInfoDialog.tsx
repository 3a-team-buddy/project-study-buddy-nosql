import React from "react";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";
import { ParticipantsList } from "../../my-sessions/_components/ParticipantsList";
import { useSession } from "@/app/_hooks/use-session";
import { CreateSessionType } from "@/lib/types";

export const CreateSessionInfoDialog = ({
  session,
}: {
  session: CreateSessionType;
}) => {
  // const { allSessions } = useSession();
  // console.log({ allSessions });
  return (
    <div className="w-full rounded-xl px-8 py-6 bg-gray-700 shadow-xl">
      <div key={session._id}>
        <h2 className="text-2xl font-semibold text-white mb-4">
          {session.sessionTopicTitle}
        </h2>
        <p className="text-sm text-gray-300 mb-6 leading-relaxed">
          {session.description}
        </p>
        <h3 className="text-white font-semibold mb-2">Session Details</h3>

        <div className="space-y-3 text-gray-300">
          <p className="flex items-center gap-2">
            <FiCalendar /> Date: {session.value}
          </p>
          <p className="flex items-center gap-2">
            <FiClock /> Time: {session.time} (2 hours)
          </p>
          <p className="flex items-center gap-2">
            <FiUser /> Session type:
            <span className="text-purple-300">
              {session.selectedSessionType}
            </span>
          </p>
          <ParticipantsList session={session} />
        </div>
      </div>
    </div>
  );
};
