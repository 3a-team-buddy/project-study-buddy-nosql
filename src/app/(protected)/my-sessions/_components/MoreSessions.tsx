import { SessionCard } from "./SessionCard";

const moreMock = [
  { name: "Session Name", members: "8/15" },
  { name: "Session Name", members: "8/15" },
  { name: "Session Name", members: "8/15" },
];

export const MoreSessions = () => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl text-white">More sessions to join</h2>

      <div className="flex flex-col gap-3">
        {moreMock.map((session, i) => (
          <SessionCard
            key={i}
            name={session.name}
            members={session.members}
            showJoin
          />
        ))}
      </div>
    </div>
  );
};
