import React from "react";
import MoreSessionCard from "./MoreSessionCard";

const MoreSessions = () => {
  return (
    <div>
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl text-white">More sessions to join</h2>
        <MoreSessionCard />
      </div>
    </div>
  );
};

export default MoreSessions;
