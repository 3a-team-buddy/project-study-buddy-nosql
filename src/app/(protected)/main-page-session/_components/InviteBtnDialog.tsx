"use client";

import React from "react";
import { Dialog, DialogTrigger, Button } from "@/components/ui";
import { BsLink } from "react-icons/bs";
import { InviteBtnDialogContent } from "@/app/(protected)/main-page-session/_components";

export function InviteBtnDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-[#2563EB17] hover:bg-[#2563EB33] gap-1 cursor-pointer font-bold text-[#1d4ed8] hover:text-[#2563EB]">
          <BsLink />
          <div>Invite</div>
        </Button>
      </DialogTrigger>

      <InviteBtnDialogContent />
    </Dialog>
  );
}
