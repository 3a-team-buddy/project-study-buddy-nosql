"use client";

import React, { useState } from "react";
import {
  Button,
  Label,
  RadioGroup,
  RadioGroupItem,
  Textarea,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { CreateSessionType } from "@/lib/types";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export const SessionRatingDialog = ({
  session,
}: {
  session: CreateSessionType;
}) => {
  const [selectedSessionRating, setSelectedSessionRating] =
    useState<string>("");
  const [selectedTutorRating, setSelectedTutorRating] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { getToken } = useAuth();

  const handleSessionFeedback = async (sessionId: string) => {
    setLoading(true);
    const token = await getToken();

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        sessionId,
        selectedSessionRating,
        selectedTutorRating,
        feedback,
      }),
    });

    if (!res.ok) {
      toast.error("Үнэлгээ амжилтгүй боллоо!");
      setLoading(false);
    }

    toast.success("Үнэлгээ өгсөнд баярлалаа! Түүхэнд хадгалагдсан");
    setSelectedSessionRating("");
    setSelectedTutorRating("");
    setFeedback("");
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-sm px-0 text-orange-400 hover:text-orange-300 animate-pulse bg-transparent hover:bg-transparent cursor-pointer">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex gap-0.5">
                <ThumbsUp />
                <ThumbsDown />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Үнэлгээ өгөх</p>
            </TooltipContent>
          </Tooltip>
        </Button>
      </DialogTrigger>

      <DialogContent className="p-8 gap-5 border-0 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex justify-around items-end">
            <Label className="text-lg">
              {session.sessionTopicTitle}
              <p className="text-sm">
                /{session.value}
                <span>{session.time}/</span>
              </p>
            </Label>
          </DialogTitle>
          <DialogDescription aria-hidden />
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <div className="flex gap-20 items-center">
            <Label className="text-black/70">Давтлага үнэлэх:</Label>

            <div>
              <RadioGroup
                value={selectedSessionRating}
                onValueChange={(value) => setSelectedSessionRating(value)}
                className="flex justify-around"
              >
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="normal" id="r1" />
                  <Label htmlFor="r1">💙</Label>
                </div>
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="good" id="r2" />
                  <Label htmlFor="r2">🩷</Label>
                </div>
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="excellent" id="r3" />
                  <Label htmlFor="r3">💖💖</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="flex gap-22 items-center">
            <Label className="text-black/70">Ментор үнэлэх:</Label>
            <div>
              <RadioGroup
                value={selectedTutorRating}
                onValueChange={(value) => setSelectedTutorRating(value)}
                className="flex justify-around"
              >
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="normal" id="r1" />
                  <Label htmlFor="r1">💙</Label>
                </div>
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="good" id="r2" />
                  <Label htmlFor="r2">🩷</Label>
                </div>
                <div className="flex items-center gap-1">
                  <RadioGroupItem value="excellent" id="r3" />
                  <Label htmlFor="r3">💖💖</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-black/70">Сэтгэгдэл үлдээх:</Label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Энд сэтгэгдлээ бичнэ үү..."
              className="text-xs text-black/70 placeholder:text-xs placeholder-text-black/70"
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button variant="secondary" className="cursor-pointer">
              Хаах
            </Button>
          </DialogClose>

          <Button
            disabled={loading}
            onClick={() => handleSessionFeedback(session._id)}
            className="cursor-pointer"
          >
            Үнэлгээ өгөх
          </Button>
        </DialogFooter>
      </DialogContent>
      <DialogClose />
    </Dialog>
  );
};
