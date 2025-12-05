import React, { useState } from "react";

import { Button } from "@/components/ui";
import { BsFillPeopleFill } from "react-icons/bs";
import { CreateSessionType, SelectedTutorEmailType } from "@/lib/types";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

export const JoinBtn = ({ session }: { session: CreateSessionType }) => {
  const [emailSent, setEmailSent] = useState(false);
  const { getToken } = useAuth();

  // console.log(
  //   session.sessionTopicTitle,
  //   session.studentCount.length,
  //   session.minMember,
  //   "COUNCOUNTTTTTTT"
  // );

  const joinedStudentHandler = async (sessionId: string) => {
    const token = await getToken();

    const joinResponse = await fetch("/api/joined-students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        sessionId,
      }),
    });

    if (!joinResponse.ok) {
      toast.error("Failed to join the session");
    }
    toast.success(
      <>
        You have successfully joined the session. <br /> View your joined
        session on My Study Buddies.
      </>
    );
    const { updatedSession } = await joinResponse.json();
    const updatedStudentCount = updatedSession.studentCount.length;
    // router.push("/my-sessions");

    if (
      session.selectedSessionType === "tutor-led" &&
      updatedStudentCount === session.minMember &&
      !emailSent
    ) {
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
          recipients: tutorsEmails,
          session,
        }),
      });

      if (!emailResponse.ok) {
        toast.error("Failed to sent email!");
      }

      toast.success("Email sent to selected tutors", {
        description: session.sessionTopicTitle,
      });

      const datass = emailResponse.json();
      console.log({ datass });
      setEmailSent(true);
    }
  };

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
