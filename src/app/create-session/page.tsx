import React from "react";
import {
  DateAndTime,
  MemberLimit,
  SessionDescription,
  Sessions,
  SessionTitle,
  SessionType,
} from "./_components";
import { Button } from "@/components/ui/button";

const CreateSessionPage = () => {
  return (
    <div className="w-full h-screen text-white flex justify-between mt-[47px] mb-[219px]">
      <div className="max-w-[457px] w-full bg-white/10 flex flex-col gap-5">
        <div className="text-[48px] leading-14 font-semibold">Sessions</div>
        <Sessions />
      </div>
      <div className="max-w-[621px] w-full h-full bg-white/10 px-12 py-[57px] flex flex-col gap-5">
        <div>
          <div className="text-[32px] leading-9 font-semibold">
            Create New Session
          </div>
          <div className="text-sm leading-5 text-neutral-200">
            Define the details for your next learning session.
          </div>
        </div>
        <SessionTitle />
        <SessionDescription />
        <div className="w-full flex justify-between">
          <MemberLimit />
          <DateAndTime />
        </div>

        <SessionType />
        <Button className="w-full h-[46px] rounded-full bg-[#2563EB]">
          Create Session
        </Button>
      </div>
    </div>
  );
};
export default CreateSessionPage;
