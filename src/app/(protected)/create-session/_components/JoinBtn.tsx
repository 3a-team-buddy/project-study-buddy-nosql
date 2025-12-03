import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui";
import { BsFillPeopleFill } from "react-icons/bs";
import { CreateSessionType, SelectedTutorDBType } from "@/lib/types";
import { toast } from "sonner";

export const JoinBtn = ({
  session,
  userId,
}: {
  session: CreateSessionType;
  userId: string;
}) => {
  const [selectedTutorsDB, setSelectedTutorsDB] = useState<
    SelectedTutorDBType[]
  >([]);
  const [emailSent, setEmailSent] = useState(false);

  const joinedStudentHandler = async (sessionId: string) => {
    const response = await fetch("/api/joined-students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentClerkId: userId,
        sessionId,
      }),
    });

    if (!response.ok) {
      toast.error("Failed to join the session");
    }
    toast.success(
      <>
        You have successfully joined the session. <br /> View your joined
        session on My Study Buddies.
      </>
    );
    // router.push("/my-sessions");
    // alert(selectedTutorsEmails);
  };

  // anhnaasaaa email-g l yavulah?
  const getAllSelectedTutors = async () => {
    const response = await fetch("/api/get-selected-tutors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: session._id }),
    });

    if (!response) {
      toast.error("Failed to get selected tutors!");
    }

    const { data } = await response.json();
    setSelectedTutorsDB(data);
  };

  useEffect(() => {
    getAllSelectedTutors();
  }, []);

  const selectedTutorsEmails = selectedTutorsDB.map(
    (tutor) => tutor.tutorId.mockUserEmail
  );
  console.log({ selectedTutorsEmails });
  console.log(
    session.minMember,
    session.studentCount.length,
    "minMember studentCountlength"
  );

  const sendEmailToTutor = async () => {
    await fetch("/api/send-invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipients: selectedTutorsEmails,
        sessionTitle: session.sessionTopicTitle,
        sessionId: session._id,
      }),
    });
  };

  useEffect(() => {
    if (
      !emailSent &&
      session.minMember === session.studentCount.length &&
      session.selectedSessionType === "tutor-led"
    ) {
      toast.success("Email sent to selected tutors", {
        description: session.sessionTopicTitle,
      });
      sendEmailToTutor();
      setEmailSent(true);
    }
  }, [session.minMember, session.studentCount.length, emailSent]);

  return (
    <Button
      disabled={session.studentCount.length === session.maxMember}
      onClick={() => {
        joinedStudentHandler(session._id);
      }}
      className="rounded-full bg-[#2563EB] hover:bg-[#1d4ed8] gap-1 cursor-pointer text-white/80 hover:text-white disabled:cursor-not-allowed disabled:bg-white/40"
    >
      <BsFillPeopleFill />
      <div>
        {session.studentCount.length}
        <span>/{session.maxMember}</span>
      </div>
      <div>JOIN</div>
    </Button>
  );
};
