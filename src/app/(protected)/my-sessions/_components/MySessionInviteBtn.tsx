"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FiLink } from "react-icons/fi";
import { toast } from "sonner";

export function MySessionInviteBtn() {
  const [emailInputValue, setEmailInputValue] = useState<string>("");

  const handleInviteToast = () => {
    toast.success("Invite sent successfully");
    setEmailInputValue("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center text-sm text-blue-300 hover:text-blue-400">
          <FiLink className="mr-1" /> invite
        </button>
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
              <Label htmlFor="link" className="text-sm">
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
