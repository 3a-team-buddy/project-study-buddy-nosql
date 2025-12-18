"use client";

import React, { useState } from "react";
import { SelectedTutorType } from "@/lib/types";
import { useSession } from "@/app/_hooks/use-session";
import {
  CreateSessionBtn,
  CreateSessionHeading,
  DateRoomTimePicker,
  MemberLimitSelector,
  SessionListComp,
  SessionTypeSelector,
  StudySessionTitleAndDescription,
} from "./_components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";

const SessionPage = () => {
  const [sessionTopicTitle, setSessionTopicTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [minMember, setMinMember] = useState<number>(2);
  const [maxMember, setMaxMember] = useState<number>(0);
  const [date, setDate] = useState<Date | undefined>();
  const [value, setValue] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [selectedSessionType, setSelectedSessionType] = useState<string>("");
  const [selectedTutors, setSelectedTutors] = useState<SelectedTutorType[]>([]);
  const [selectedReward, setSelectedReward] = useState<string>("");

  const { allSessions } = useSession();

  return (
    <div className="w-[1440px] min-h-screen text-white flex gap-8 m-auto py-10 ">
      <div className="flex-1">
        <SessionListComp />
      </div>

      <div className="max-w-[480px] w-full h-fit rounded-2xl bg-black sticky top-36">
        <Tabs defaultValue="Давтлага" className="w-full h-full">
          <TabsList>
            <TabsTrigger value="Давтлага" className="cursor-pointer">
              Давтлага товлох
            </TabsTrigger>
            <TabsTrigger value="Түүх" className="cursor-pointer">
              Түүх харах
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Давтлага">
            <div className="max-w-[480px] w-full h-fit flex flex-col gap-10 rounded-2xl px-8 py-6 bg-linear-to-b from-[#1E2648]/50 to-[#122136]/50 backdrop-blur-3xl border border-white/10 shadow-2xl sticky top-36">
              <CreateSessionHeading />

              <StudySessionTitleAndDescription
                sessionTopicTitle={sessionTopicTitle}
                setSessionTopicTitle={setSessionTopicTitle}
                description={description}
                setDescription={setDescription}
              />
              <MemberLimitSelector
                minMember={minMember}
                setMinMember={setMinMember}
                maxMember={maxMember}
                setMaxMember={setMaxMember}
              />
              <DateRoomTimePicker
                value={value}
                setValue={setValue}
                room={room}
                setRoom={setRoom}
                time={time}
                setTime={setTime}
                date={date}
                setDate={setDate}
                allSessions={allSessions}
              />
              <SessionTypeSelector
                selectedSessionType={selectedSessionType}
                setSelectedSessionType={setSelectedSessionType}
                selectedTutors={selectedTutors}
                setSelectedTutors={setSelectedTutors}
                selectedReward={selectedReward}
                setSelectedReward={setSelectedReward}
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
                room={room}
                setRoom={setRoom}
                time={time}
                setTime={setTime}
                selectedSessionType={selectedSessionType}
                setSelectedSessionType={setSelectedSessionType}
                selectedTutors={selectedTutors}
                setSelectedTutors={setSelectedTutors}
                selectedReward={selectedReward}
                setSelectedReward={setSelectedReward}
              />
            </div>
          </TabsContent>
          <TabsContent value="Түүх">
            <div className="max-w-[480px] w-full h-fit flex flex-col gap-10 rounded-2xl px-8 py-6 bg-linear-to-b from-[#1E2648]/50 to-[#122136]/50 backdrop-blur-3xl border border-white/10 shadow-2xl sticky top-36">
              {allSessions
                .filter((s) => s.isRated && s.status === "COMPLETED")
                .map((session) => (
                  <div>
                    <div>{session.isRated}</div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SessionPage;
