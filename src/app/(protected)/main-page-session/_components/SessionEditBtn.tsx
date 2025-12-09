import React from "react";
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
import { useState } from "react";
import {
  CreateSessionType,
  SelectedTutorEmailType,
  SelectedTutorType,
} from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { MemberLimitSelector } from "./MemberLimitSelector";
import { DateAndTimePicker } from "./DateAndTimePicker";
import { useSession } from "@/app/_hooks/use-session";
import { SessionTypeSelector } from "./SessionTypeSelector";

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

export function SessionEditBtn({ session }: { session: CreateSessionType }) {
  const [sessionTopicTitle, setSessionTopicTitle] = useState(
    session.sessionTopicTitle
  );
  const [description, setDescription] = useState(session.description);
  const [minMember, setMinMember] = useState(session.minMember);
  const [maxMember, setMaxMember] = useState(session.maxMember);
  const [date, setDate] = useState<Date | undefined>();
  const [value, setValue] = useState<string>(session.value);
  const [time, setTime] = useState<string>(session.time);
  const [selectedSessionType, setSelectedSessionType] = useState<string>(
    session.selectedSessionType
  );
  const [selectedTutors, setSelectedTutors] = useState<SelectedTutorType[]>([]);
  const { allSessions } = useSession();
  const { getToken } = useAuth();
  const [emailSent, setEmailSent] = useState(false);
  async function handleSubmit(e: React.FormEvent) {
    // getTutors();
    e.preventDefault();
    setSessionTopicTitle(session.sessionTopicTitle);
    const updatedData = {
      sessionTopicTitle,
      description,
      minMember,
      maxMember,
      value,
      time,
      selectedSessionType,
    };

    const token = await getToken();
    const sessionId = session._id;
    console.log({ updatedData });

    async function getTutors() {
      const sessionId = session._id;
      const tutorResponse = await fetch(
        `/api/get-selected-tutors/${sessionId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        }
      );

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
    }
    // const response = await fetch(`/api/update-my-session/${sessionId}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify(updatedData),
    // });

    // if (!response.ok) {
    //   toast.error("Update front end failed!");
    //   return;
    // }

    // toast.success("Session updated!");
    // }
    // async function getTutors() {
    //   const sessionId = session._id;
    //   const tutorResponse = await fetch("/api/get-selected-tutors", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ sessionId }),
    //   });

    //   if (!tutorResponse) {
    //     toast.error("Failed to get selected tutors email!");
    //   }
    //   const { data }: { data: SelectedTutorEmailType[] } =
    //     await tutorResponse.json();
    //   const tutorsEmails = data.map((tutor) => tutor.tutorId.mockUserEmail);

    //   const emailResponse = await fetch("/api/send-tutor-invite", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       recipients: "tutorsEmails",
    //       session,
    //     }),
    //   });

    //   if (!emailResponse.ok) {
    //     toast.error("Failed to sent email!");
    //   }

    //   toast.success("Email sent to selected tutors", {
    //     description: session.sessionTopicTitle,
    //   });
    //   // setSelectedTutors(tutorsEmails);
    //   setEmailSent(true);
  }
  return (
    <div>
      <form>
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
                  defaultValue={sessionTopicTitle}
                  onChange={(e) => {
                    setSessionTopicTitle(e.target.value);
                  }}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Description</Label>
                <Textarea
                  id="username-1"
                  name="username"
                  defaultValue={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <></>
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
                allSessions={allSessions}
              />
            </div>
            <SessionTypeSelector
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
            <Button onClick={handleSubmit} type="submit" className="w-1/2">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </div>
  );
}
