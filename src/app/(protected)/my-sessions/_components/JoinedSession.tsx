import { SessionCard } from "./SessionCard";

const joinedMock = [
  { name: "Session Name", status: "accepted" },
  { name: "Session Name", status: "waiting" },
  { name: "Session Name", status: "accepted" },
  { name: "Session Name", status: "waiting" },
];

export const JoinedSessions = () => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl text-white mb-2">Joined sessions</h2>

      {joinedMock.map((session, i) => (
        <SessionCard
          key={i}
          name={session.name}
          status={session.status as "accepted" | "waiting"}
        />
      ))}
    </div>
  );
};
