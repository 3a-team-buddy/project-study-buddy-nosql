import React from "react";
import { Button } from "@/components/ui/button";
import { BsFillPeopleFill, BsLink } from "react-icons/bs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateSessionInfoDialog } from "./CreateSessionInfoDialog";
import { useSession } from "@/app/_hooks/use-session";
import { DialogTitle } from "@radix-ui/react-dialog";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
export const SessionList = () => {
  const { allSessions } = useSession();
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl leading-7 text-white">Sessions</h2>

      <div className="flex flex-col gap-3">
        {allSessions.map((session) => (
          <div
            key={session._id}
            className="flex justify-between items-center p-4 rounded-3xl bg-[linear-gradient(180deg,#1E2648_0%,#122136_100%)] hover:bg-white/10"
          >
            <Dialog>
              <DialogTrigger>
                <span className="text-xl text-white font-bold cursor-pointer">
                  {session.sessionTopicTitle}
                </span>
              </DialogTrigger>

              <DialogContent className="p-0 bg-transparent">
                <VisuallyHidden>
                  <DialogTitle />
                </VisuallyHidden>
                <CreateSessionInfoDialog session={session} />
              </DialogContent>
            </Dialog>

            <div className="flex flex-col align-items-center justify-center gap-2">
              <Button className="rounded-3xl bg-[#2563EBFF] hover:[#1d4ed8] gap-1 cursor-pointer">
                <BsFillPeopleFill />
                1/{session.maxMember}
                <p>JOIN</p>
              </Button>
              <Button className="rounded-3xl bg-[#2563EB17] hover:bg-[#2563EB33] gap-1 font-bold text-[#2563EBFF] cursor-pointer">
                <BsLink />
                <p>Invite</p>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
