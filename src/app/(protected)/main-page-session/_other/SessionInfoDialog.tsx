import React, { useState } from "react";

import { CreateSessionType, JoinedStudentType } from "@/lib/types";
import { Button, Dialog, DialogTrigger } from "@/components/ui";
import { toast } from "sonner";
import { SessionInfoDialogContent } from "./SessionInfoDialogContent";

export const SessionInfoDialog = ({
  session,
}: {
  session: CreateSessionType;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [joinedStudents, setJoinedStudents] = useState<JoinedStudentType[]>([]);

  const getSelectedSessionJoinedStudents = async () => {
    const result = await fetch("/api/get-joined-students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: session._id,
      }),
    });

    if (!result.ok) {
      toast.error("Failed to get joined students!");
    }

    const { data } = await result.json();
    setJoinedStudents(data);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (open) getSelectedSessionJoinedStudents();
      }}
    >
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant={"ghost"}
          className="flex-1 justify-start text-xl text-white/80 font-semibold hover:bg-accent/5 hover:text-white cursor-pointer rounded-full"
        >
          {session.sessionTopicTitle}
        </Button>
      </DialogTrigger>

      <SessionInfoDialogContent
        session={session}
        joinedStudents={joinedStudents}
      />
    </Dialog>
  );
};
