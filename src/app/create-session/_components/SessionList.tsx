import { Button } from "@/components/ui/button";
import { BsFillPeopleFill } from "react-icons/bs";
import { BsLink } from "react-icons/bs";
import React from "react";

const sessions = [
  {
    id: 1,
    name: "React Hooks Introduction",
    members: "8/15",
  },
  {
    id: 2,
    name: "Data Structures Study",
    members: "5/10",
  },
  {
    id: 3,
    name: "UI/UX Basics Group",
    members: "12/20",
  },
];

export default function SessionList() {
  return (
    <div className="p-4 ">
      <h2 className="p-2">Sessions</h2>

      {sessions.map((session) => (
        <div
          key={session.id}
          className="flex justify-between items-center p-4 mb-2 rounded-3xl bg-[linear-gradient(180deg,#1E2648_0%,#122136_100%)] hover:bg-white/10 cursor-pointer"
        >
          <span className="text-xl font-bold">{session.name}</span>

          <div className="flex flex-col align-items-center justify-center ">
            <Button className="rounded-3xl mb-2 bg-[#2563EBFF] hover:[#1d4ed8] gap-1 ">
              <BsFillPeopleFill />
              {session.members}
              JOIN
            </Button>
            <Button className=" bg-[#2563EB17] rounded-3xl gap-1 hover:bg-[#2563EB33] font-bold text-[#2563EBFF]">
              <BsLink />
              Invite
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
