"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  Button,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui";
import { InviteBtnDialogContent } from "@/app/(protected)/main-page-session/_components";
import { CreateSessionType } from "@/lib/types";
import { FaRegShareFromSquare } from "react-icons/fa6";

export function InviteBtnDialog({ session }: { session: CreateSessionType }) {
  const [openInvite, setOpenInvite] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Dialog open={openInvite} onOpenChange={setOpenInvite}>
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                disabled={session.studentCount?.length === session.maxMember}
                className={`rounded-full bg-[#2563EB17] hover:bg-[#2563EB33] gap-1 cursor-pointer font-bold text-[#1d4ed8] hover:text-[#2563EB]
              }`}
              >
                <FaRegShareFromSquare />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Урих Холбоос</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <InviteBtnDialogContent
        session={session}
        setOpenInvite={setOpenInvite}
        setLoading={setLoading}
        loading={loading}
      />
    </Dialog>
  );
}
