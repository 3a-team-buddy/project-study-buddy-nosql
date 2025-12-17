"use client";

import React, { useState } from "react";
import { Dialog, DialogTrigger, Button } from "@/components/ui";
import { BsLink } from "react-icons/bs";
import { InviteBtnDialogContent } from "@/app/(protected)/main-page-session/_components";
import { CreateSessionType } from "@/lib/types";

export function InviteBtnDialog({
  session,
  isExpired,
}: {
  session: CreateSessionType;
  isExpired: boolean;
}) {
  const [openInvite, setOpenInvite] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Dialog open={openInvite} onOpenChange={setOpenInvite}>
      <DialogTrigger asChild>
        <Button
          disabled={
            isExpired || session.studentCount?.length === session.maxMember
          }
          className={`rounded-full bg-[#2563EB17] hover:bg-[#2563EB33] gap-1 cursor-pointer font-bold text-[#1d4ed8] hover:text-[#2563EB] ${
            isExpired ? "hidden" : "inline-flex"
          }`}
        >
          <BsLink />
          <p>Урих</p>
        </Button>
      </DialogTrigger>

      <InviteBtnDialogContent
        session={session}
        setOpenInvite={setOpenInvite}
        setLoading={setLoading}
        loading={loading}
      />
    </Dialog>
  );
}
