"use client";

import React, { useState } from "react";
import { SelectedTutorType } from "@/lib/types";
import { useSession } from "@/app/_hooks/use-session";
import {
  CreateSessionBtn,
  CreateSessionHeading,
  DateAndTimePicker,
  MemberLimitSelector,
  SessionTypeSelector,
  StudySessionTitleAndDescription,
} from "./_components";
import SliderComponent from "./_components/SliderComponent";

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
    <div className="w-full min-h-screen text-white flex gap-8 py-10">
      <div className="flex-1">
        <SliderComponent />
      </div>

      <div className="max-w-[480px] w-full flex flex-col gap-8 rounded-2xl px-8 py-6 bg-[#0E1B2EFF] shadow-xl">
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
