"use client";

import React, { useEffect, useState } from "react";
import {
  SessionList,
  StudySessionTitleAndDescription,
  MemberLimitSelector,
  DateAndTimePicker,
  SessionTypeSelector,
  CreateSessionBtn,
  CreateSessionHeading,
} from "./_components";
import { SelectedTutorType } from "@/lib/types";
import { useUser, useAuth } from "@clerk/nextjs";

const CreateSessionPage = () => {
  const [sessionTopicTitle, setSessionTopicTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [minMember, setMinMember] = useState<number>(0);
  const [maxMember, setMaxMember] = useState<number>(0);
  const today = new Date();
  const n2 = new Date();
  n2.setDate(today.getDate() + 2);
  const [date, setDate] = useState<Date | undefined>();
  const [value, setValue] = useState(formatDate(date));
  const [time, setTime] = useState<string>("");
  const [selectedSessionType, setSelectedSessionType] = useState<string>("");
  const [selectedTutors, setSelectedTutors] = useState<SelectedTutorType[]>([]);
  const [userId, setUserId] = useState<string>("");
  const { user } = useUser();
  const { getToken } = useAuth();
  const [studentCount, setStudentCount] = useState<number[]>([]);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  function formatDate(date: Date | undefined) {
    if (!date) {
      return "";
    }
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  console.log({ value });
  console.log({ time });
  console.log({ userId });

  return (
    <div className="w-full min-h-screen text-white flex gap-8 p-10">
      <div className="flex-1">
        <SessionList userId={userId} />
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
            today={today}
            formatDate={formatDate}
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
          userId={userId}
          studentCount={studentCount}
        />
      </div>
    </div>
  );
};
export default CreateSessionPage;
