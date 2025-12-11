"use client";

import React, { useState } from "react";
import { SelectedTutorType } from "@/lib/types";
import { useSession } from "@/app/_hooks/use-session";
import {
  CreateSessionBtn,
  CreateSessionHeading,
  DateAndTimePicker,
  MemberLimitSelector,
  SessionListComp,
  SessionTypeSelector,
  StudySessionTitleAndDescription,
} from "./_components";

const SessionPage = () => {
  const [sessionTopicTitle, setSessionTopicTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [minMember, setMinMember] = useState<number>(0);
  const [maxMember, setMaxMember] = useState<number>(0);
  const [date, setDate] = useState<Date | undefined>();
  const [value, setValue] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [selectedSessionType, setSelectedSessionType] = useState<string>("");
  const [selectedTutors, setSelectedTutors] = useState<SelectedTutorType[]>([]);
  const { allSessions } = useSession();

  return (
    <div className="w-[1440px] min-h-screen text-white flex gap-8 m-auto py-10 ">
      <div className="flex-1">
        <SessionListComp />
      </div>

      <div className="max-w-[480px] w-full h-fit flex flex-col gap-8 rounded-2xl px-8 py-6 bg-linear-to-b from-[#1E2648]/50 to-[#122136]/50 backdrop-blur-3xl border border-white/10 shadow-2xl sticky top-36">
        <CreateSessionHeading />

        <StudySessionTitleAndDescription
          sessionTopicTitle={sessionTopicTitle}
          setSessionTopicTitle={setSessionTopicTitle}
          description={description}
          setDescription={setDescription}
        />
        <div className="w-full flex gap-8">
          <MemberLimitSelector
            minMember={minMember}
            setMinMember={setMinMember}
            maxMember={maxMember}
            setMaxMember={setMaxMember}
          />
          <DateAndTimePicker
            value={value}
            setValue={setValue}
            time={time}
            setTime={setTime}
            date={date}
            setDate={setDate}
            allSessions={allSessions}
          />
        </div>
        <SessionTypeSelector
          selectedSessionType={selectedSessionType}
          setSelectedSessionType={setSelectedSessionType}
          selectedTutors={selectedTutors}
          setSelectedTutors={setSelectedTutors}
        />
        <CreateSessionBtn
          sessionTopicTitle={sessionTopicTitle}
          setSessionTopicTitle={setSessionTopicTitle}
          description={description}
          setDescription={setDescription}
          minMember={minMember}
          setMinMember={setMinMember}
          maxMember={maxMember}
          setMaxMember={setMaxMember}
          value={value}
          setValue={setValue}
          time={time}
          setTime={setTime}
          selectedSessionType={selectedSessionType}
          setSelectedSessionType={setSelectedSessionType}
          selectedTutors={selectedTutors}
          setSelectedTutors={setSelectedTutors}
        />
      </div>
    </div>
  );
};

export default SessionPage;
