import React, { useState } from "react";

import { Button } from "@/components/ui";
import { BsFillPeopleFill } from "react-icons/bs";
import { CreateSessionType } from "@/lib/types";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

export const JoinBtn = ({ session }: { session: CreateSessionType }) => {
  const [emailSent, setEmailSent] = useState(false);
  const { getToken } = useAuth();

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

    //tutor-led
    if (
      session.selectedSessionType.toLowerCase() === "tutor-led" &&
      updatedStudentCount === session.minMember &&
      !emailSent
    ) {
      const emailResponse = await fetch("/api/send-next-tutor-gmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      if (!emailResponse.ok) {
        toast.error("Failed to send tutor invite email!");
      }

      toast.success("Tutor invite email sent", {
        description: session.sessionTopicTitle,
      });
      setEmailSent(true);
    }

    //self-led
    if (
      session.selectedSessionType.toLowerCase() === "self-led" &&
      updatedStudentCount === session.minMember &&
      !emailSent
    ) {
      const emailResponse = await fetch(
        "/api/send-joined-students-self-gmail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        }
      );

      if (!emailResponse.ok) {
        toast.error("Failed to inform joined students!");
      }

      toast.success("Joined students informed by email", {
        description: session.sessionTopicTitle,
      });
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
