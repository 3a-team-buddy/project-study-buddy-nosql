import React, { useState } from "react";
import { Button } from "@/components/ui";
import { Textarea } from "@/components/ui";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateSessionType, SelectedTutorType } from "@/lib/types";
import { MemberLimitSelector } from "./MemberLimitSelector";
import { useSession } from "@/app/_hooks/use-session";
import { EditSaveChangesBtn } from "./EditSaveChangesBtn";
import { DateRoomTimePicker } from "./DateRoomTimePicker";
import { SessionTypeSelector } from "./SessionTypeSelector";
export function SessionEditBtn({ session }: { session: CreateSessionType }) {
  const [sessionTopicTitle, setSessionTopicTitle] = useState(
    session.sessionTopicTitle
  );
  const [description, setDescription] = useState(session.description);
  const [minMember, setMinMember] = useState(session.minMember);
  const [maxMember, setMaxMember] = useState(session.maxMember);
  const [date, setDate] = useState<Date | undefined>();
  const [value, setValue] = useState<string>(session.value);
  const [room, setRoom] = useState<string>(`${session.room}`);
  const [time, setTime] = useState<string>(session.time);
  const [selectedSessionType, setSelectedSessionType] = useState<string>(
    session.selectedSessionType
  );
  const [selectedTutors, setSelectedTutors] = useState<SelectedTutorType[]>([]);

  const { allSessions } = useSession();
  console.log({ session });
  return (
    <div>
      <form>
        <DialogContent className="w-[600px] h-fit text-white bg-[#09121f]">
          <DialogHeader>
            <DialogTitle>Edit My Session</DialogTitle>
          </DialogHeader>

          <div>
            <div className="grid grid-rows-2 gap-4">
              <div className="grid gap-3">
                <Label>Session title</Label>
                <Input
                  defaultValue={sessionTopicTitle}
                  onChange={(e) => setSessionTopicTitle(e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label>Description</Label>
                <Textarea
                  defaultValue={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className=" mt-10 mb-10">
              <MemberLimitSelector
                minMember={minMember}
                setMinMember={setMinMember}
                maxMember={maxMember}
                setMaxMember={setMaxMember}
              />
            </div>
            <div className="flex flex-col gap-10 mb-10">
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
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild className="w-[421px] gap-3">
              <Button className="text-black w-1/2" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <EditSaveChangesBtn
              session={session}
              sessionTopicTitle={sessionTopicTitle}
              description={description}
              minMember={minMember}
              maxMember={maxMember}
              room={room}
              value={value}
              time={time}
              selectedSessionType={selectedSessionType}
              selectedTutors={selectedTutors}
            />
          </DialogFooter>
        </DialogContent>
      </form>
    </div>
  );
}
