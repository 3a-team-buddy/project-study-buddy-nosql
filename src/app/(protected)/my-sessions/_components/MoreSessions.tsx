import { SessionCard } from "./SessionCard";

const moreMock = [
  { name: "Session Name", members: "8/15" },
  { name: "Session Name", members: "8/15" },
  { name: "Session Name", members: "8/15" },
];

export const MoreSessions = () => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl text-white">More sessions to join</h2>

      <div className="flex flex-col gap-3">
        {moreMock.map((s, i) => (
          <SessionCard key={i} name={s.name} members={s.members} showJoin />
        ))}
      </div>
    </div>
  );
};
