"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  DateAndTime,
  StudySessionTitle,
  SessionType,
  SelectedTutorsType,
} from "./_components";
import { Button } from "@/components/ui/button";
import SessionList from "./_components/SessionList";
import MemberLimit from "./_components/MemberLimit";
import SessionDescription from "./_components/SessionDescription";

const CreateSessionPage = () => {
  const [studySessionTitleValue, setStudySessionTitleValue] =
    useState<string>("");
  const [minMember, setMinMember] = useState<number>(5);
  const [maxMember, setMaxMember] = useState<number>(5);
  const [topicTitle, setTopicTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedSessionType, setSelectedSessionType] = useState<string>("");
  const [selectedTutors, setSelectedTutors] = useState<SelectedTutorsType[]>(
    []
  );
  const [value, setValue] = React.useState(Date);
  const [time, setTime] = React.useState<string>("");
  return (
    <div className="w-full h-screen text-white flex justify-between mt-[47px] mb-[219px]">
      <div className="max-w-[457px] w-full  flex flex-col gap-8">
        <span className="font-bold text-5xl pl-5">Session</span>
        <SessionList />
      </div>

      <div className="max-w-[621px] w-full h-full px-[31px] py-[70px] flex flex-col gap-8 rounded-[10px] shadow-xs bg-[#0E1B2EFF]">
        <div>
          <div className="w-[290px] text-4xl leading-10 font-semibold text-neutral-200">
            Create New Session
          </div>
          <div className="text-sm leading-5 text-[#BDC1CAFF]">
            Define the details for your next learning session.
          </div>
        </div>

        <StudySessionTitle
          studySessionTitleValue={studySessionTitleValue}
          setStudySessionTitleValue={setStudySessionTitleValue}
        />
        <SessionDescription
          topicTitle={topicTitle}
          setTopicTitle={setTopicTitle}
          description={description}
          setDescription={setDescription}
        />
        <div className="w-full flex justify-between">
          <MemberLimit
            minMember={minMember}
            maxMember={maxMember}
            setMinMember={setMinMember}
            setMaxMember={setMaxMember}
          />
          <DateAndTime
            time={time}
            setTime={setTime}
            value={value}
            setValue={setValue}
          />
        </div>

        <SessionType
          selectedSessionType={selectedSessionType}
          setSelectedSessionType={setSelectedSessionType}
          selectedTutors={selectedTutors}
          setSelectedTutors={setSelectedTutors}
        />
        <Button className="w-full h-[46px] rounded-full bg-[#2563EB] hover:bg-[#1d4ed8]">
          Create Session
        </Button>
      </div>
    </div>
  );
};
export default CreateSessionPage;
