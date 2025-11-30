import React from "react";

import { CreateSessionType } from "@/lib/types";
import { Button, Dialog, DialogTrigger } from "@/components/ui";
import { SessionInfoDialogContent } from "@/app/(protected)/create-session/_components";

export const SessionInfoDialog = ({
  session,
}: {
  session: CreateSessionType;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="text-xl text-white/80 font-semibold hover:bg-accent/50 cursor-pointer"
        >
          {session.sessionTopicTitle}
        </Button>
      </DialogTrigger>

      <SessionInfoDialogContent session={session} />
    </Dialog>
  );
};
