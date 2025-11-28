"use client";
import React, { useEffect, useState } from "react";
import {
  SessionList,
  StudySessionTitleAndDescription,
  MemberLimitSelector,
  DateAndTimePicker,
  SessionTypeSelector,
  JoinedStudents,
} from "./_components";
import { Button } from "@/components/ui/button";
import { SelectedTutorType } from "@/lib/types";
import { CreateBtn } from "./_components/CreateBtn";
import { useUser } from "@clerk/nextjs";

const CreateSessionPage = () => {
  const [sessionTopicTitle, setSessionTopicTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [minMember, setMinMember] = useState<number>(5);
  const [maxMember, setMaxMember] = useState<number>(5);
  const today = new Date();
  const n2 = new Date();
  n2.setDate(today.getDate() + 2);
  const [date, setDate] = useState<Date | undefined>(n2);
  const [value, setValue] = useState(formatDate(date));
  const [time, setTime] = useState<string>("");
  const [selectedSessionType, setSelectedSessionType] = useState<string>("");
  const [selectedTutors, setSelectedTutors] = useState<SelectedTutorType[]>([]);
  const [userId, setUserId] = useState<string>("");
  const { user } = useUser();
  console.log({ userId });
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
  console.log({ sessionTopicTitle });
  console.log({ description });
  console.log({ minMember });
  console.log({ maxMember });
  console.log({ value });
  console.log({ time });
  console.log({ selectedSessionType });
  console.log("hhhhhhhhhhhh", userId);

  return (
    <div className="w-full min-h-screen text-white flex gap-8 p-10">
      <div className="flex-1">
        <SessionList userId={userId} />
      </div>

      <div className="max-w-[480px] w-full flex flex-col gap-8 rounded-xl px-8 py-6 bg-[#0E1B2EFF] shadow-xl">
        <div className="flex flex-col gap-1">
          <div className="text-2xl leading-7 font-semibold text-white">
            Create New Session
          </div>
          <div className="text-sm leading-5 text-muted-foreground">
            Define the details for your next learning session.
          </div>
        </div>
        <StudySessionTitleAndDescription
          sessionTopicTitle={sessionTopicTitle}
          setSessionTopicTitle={setSessionTopicTitle}
          description={description}
          setDescription={setDescription}
        />
        <div className="w-full flex gap-4">
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
        <CreateBtn
          sessionTopicTitle={sessionTopicTitle}
          description={description}
          minMember={minMember}
          maxMember={maxMember}
          value={value}
          time={time}
          selectedSessionType={selectedSessionType}
          selectedTutors={selectedTutors}
        />
        <Button
          size={"lg"}
          className="w-full rounded-full bg-[#2563EB] hover:bg-[#1d4ed8]"
        >
          JOINED STUDENTS
        </Button>
        <JoinedStudents />
      </div>
    </div>
  );
};
export default CreateSessionPage;
