import React from "react";

export const IgLeaderBoard = () => {
  return (
    <div className="w-100 h-fit bg-blue-950 rounded-xl px-5 py-5  my-10 mx-10">
      <div className="flex items-center justify-between text-md font-bold text-white">
        <div className="flex gap-1">
          <p className="text-green-700">ılııl</p>
          <p>IG Leaderboard</p>
        </div>

        <p>View all</p>
      </div>
      <div className="flex flex-col gap-4 mt-10 text-20 text-white ">
        <div className="flex justify-between items-center ">
          <p className="font-bold">🥇 3D</p>
          <p>20693.1PT</p>
        </div>
        <div className="flex justify-between items-center ">
          <p className="font-bold">🥈 3B</p>
          <p>3223.1PT</p>
        </div>
        <div className="flex justify-between items-center ">
          <p className="font-bold">🥉 3E</p>
          <p>573.PT</p>
        </div>
      </div>
    </div>
  );
};
