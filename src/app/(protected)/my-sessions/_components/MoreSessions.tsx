import { MoreSessionCard } from "./MoreSessionCard";

export const MoreSessions = () => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl text-white">More sessions to join</h2>

      <div>
        <MoreSessionCard />
      </div>
    </div>
  );
};
