"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Input,
  Label,
} from "@/components/ui";
import { BsLink } from "react-icons/bs";
import { toast } from "sonner";

export function InviteBtnDialog() {
  const [emailInputValue, setEmailInputValue] = useState<string>("");

  const handleInviteToast = () => {
    toast.success("Invite sent successfully");
    setEmailInputValue("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-[#2563EB17] hover:bg-[#2563EB33] gap-1 cursor-pointer font-bold text-[#1d4ed8] hover:text-[#2563EB]">
          <BsLink />
          <div>Invite</div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite</DialogTitle>
          <DialogDescription>
            You are about to send an invitation to the session.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-5">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="email" className="text-sm">
                Email
              </Label>
              <Input
                type="email"
                placeholder="Email"
                value={emailInputValue}
                onChange={(e) => setEmailInputValue(e.target.value)}
              />
            </div>
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="text-sm">
                Link
              </Label>
              <Input
                id="link"
                defaultValue="http://localhost:3000/create-session"
                readOnly
              />
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleInviteToast}>
            Invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
