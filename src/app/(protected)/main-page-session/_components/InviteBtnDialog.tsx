"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogTrigger, Button } from "@/components/ui";
import { BsLink } from "react-icons/bs";
import { InviteBtnDialogContent } from "@/app/(protected)/main-page-session/_components";
import { CreateSessionType } from "@/lib/types";

export function InviteBtnDialog({ session }: { session: CreateSessionType }) {
  const date = session.value;
  const time = session.time;
  const sessionDateTime = new Date(`${date} ${time}`);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const isExpired = now > sessionDateTime;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={isExpired}
          className="rounded-full bg-[#2563EB17] hover:bg-[#2563EB33] gap-1 cursor-pointer font-bold text-[#1d4ed8] hover:text-[#2563EB]"
        >
          <BsLink />
          {!isExpired && <p>Урих</p>}
        </Button>
      </DialogTrigger>

      <InviteBtnDialogContent session={session} />
    </Dialog>
  );
}
