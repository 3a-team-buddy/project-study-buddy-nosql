import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui";
import { BsFillPeopleFill } from "react-icons/bs";
import { CreateSessionType, SelectedTutorDBType } from "@/lib/types";
import { toast } from "sonner";

export const JoinBtn = ({
  session,
  token,
}: {
  session: CreateSessionType;
  token: string;
}) => {
  const [selectedTutorsEmails, setSelectedTutorsEmails] = useState<
    SelectedTutorDBType[]
  >([]);
  const [emailSent, setEmailSent] = useState(false);

  const joinedStudentHandler = async (sessionId: string) => {
    const response = await fetch("/api/joined-students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
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
  };

  const getAllSelectedTutorsEmails = async () => {
    const response = await fetch("/api/get-selected-tutors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: session._id }),
    });

    if (!response) {
      toast.error("Failed to get selected tutors email!");
    }

    const { data } = await response.json();
    setSelectedTutorsEmails(data);
  };

  useEffect(() => {
    getAllSelectedTutorsEmails();
  }, []);

  const tutorsEmails = selectedTutorsEmails.map(
    (tutor) => tutor.tutorId.mockUserEmail
  );

  // console.log(
  //   session.minMember,
  //   session.studentCount.length,
  // );

  const sendEmailToTutors = async () => {
    await fetch("/api/send-invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipients: tutorsEmails,
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
      sendEmailToTutors();
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
