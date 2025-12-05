import { Textarea } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditMySessionDialogSessionType } from "./EditMySessionDialogSessionType";
import { useState } from "react";
import {
  CreateSessionType,
  SelectedTutorEmailType,
  SelectedTutorType,
  SelectedTutorType2,
} from "@/lib/types";

import * as React from "react";

import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { se } from "date-fns/locale";
import { useAuth } from "@clerk/nextjs";
import {
  DateAndTimePicker,
  MemberLimitSelector,
} from "../../create-session/_components";
import { toast } from "sonner";
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

export function SessionCardDetailsEditButton({
  session,
}: {
  session: CreateSessionType;
}) {
  //1. tutor section utga awdag boloh
  //2. data backend ruu ywuul\dag boloh
  //3. id gaarni session haigaad
  //4. baigaa utgiig ni update hiij backend eesee data base ruu hadgaldag
  const [selectedSessionType, setSelectedSessionType] = useState<string>("");
  const [selectedTutors, setSelectedTutors] = useState<SelectedTutorType[]>([]);
  const [emailSent, setEmailSent] = useState(false);
  const [minMember, setMinMember] = useState<number>(session.minMember);
  const [maxMember, setMaxMember] = useState<number>(session.maxMember);
  const today = new Date();
  const n2 = new Date();
  n2.setDate(today.getDate() + 2);
  const [date, setDate] = useState<Date | undefined>();
  const [value, setValue] = useState(formatDate(date));
  const [time, setTime] = useState<string>(session.time);

  // const [selectedSessionType, setSelectedSessionType] = useState<string>(
  //   session.selectedSessionType
  // );
  // const [selectedTutors, setSelectedTutors] = useState<SelectedTutorType2>();

  console.log({ session });
  // async function updateSession(id: string) {
  //   const { getToken } = useAuth();
  //   const token = await getToken();
  //   await fetch(`/api/create-new-session/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // }

  async function getTutors() {
    const sessionId = session._id;
    const tutorResponse = await fetch("/api/get-selected-tutors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    });

    if (!tutorResponse) {
      toast.error("Failed to get selected tutors email!");
    }
    const { data }: { data: SelectedTutorEmailType[] } =
      await tutorResponse.json();
    const tutorsEmails = data.map((tutor) => tutor.tutorId.mockUserEmail);

    const emailResponse = await fetch("/api/send-tutor-invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipients: "tutorsEmails",
        session,
      }),
    });

    if (!emailResponse.ok) {
      toast.error("Failed to sent email!");
    }

    toast.success("Email sent to selected tutors", {
      description: session.sessionTopicTitle,
    });
    // setSelectedTutors(tutorsEmails);
    setEmailSent(true);
    console.log({ tutorsEmails });
    console.log({ emailResponse });
    console.log({ tutorsEmails });
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            onClick={getTutors}
            variant="outline"
            className="w-full text-accent-foreground cursor-pointer"
          >
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="w-fit h-fit text-white  bg-[#09121f]">
          <DialogHeader>
            <DialogTitle>Edit My Session</DialogTitle>
            {/* <DialogDescription>
              Make changes to your session here. Click save when you&apos;re
              done.
            </DialogDescription> */}
          </DialogHeader>
          <div>
            <div className="grid grid-rows-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1 ">Session title</Label>
                <Input
                  id="name-1"
                  name="name"
                  defaultValue={session.sessionTopicTitle}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Description</Label>
                <Textarea
                  id="username-1"
                  name="username"
                  defaultValue={session.description}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-10">
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
            <EditMySessionDialogSessionType
              session={session}
              selectedSessionType={selectedSessionType}
              setSelectedSessionType={setSelectedSessionType}
              selectedTutors={selectedTutors}
              setSelectedTutors={setSelectedTutors}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild className="w-[421px] gap-3">
              <Button className="text-black w-1/2 " variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="w-1/2">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
