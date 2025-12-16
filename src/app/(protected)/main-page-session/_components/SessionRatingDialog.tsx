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
} from "@/components/ui";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { CreateSessionType } from "@/lib/types";

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

    toast.success("Үнэлгээ өгсөнд баярлалаа!");
    setSelectedSessionRating("");
    setSelectedTutorRating("");
    setFeedback("");
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="text-sm text-orange-400 hover:text-orange-300 animate-pulse bg-transparent hover:bg-transparent cursor-pointer">
          Үнэлгээ
        </Button>
      </DialogTrigger>

      <DialogContent className="p-8 gap-5 border-0 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex justify-around items-center">
            <Label className="text-lg">{session.sessionTopicTitle}</Label>
            <div className="flex gap-2 text-sm ">
              {session.value} {session.time}
            </div>
          </DialogTitle>
          <DialogDescription aria-hidden />
        </DialogHeader>

        <div className="flex flex-col gap-5 text-gray-500">
          <div className="flex gap-20 items-center">
            <Label className="text-base">Давтлага үнэлэх: </Label>
            <div>
              <RadioGroup
                value={selectedSessionRating}
                onValueChange={(value) => setSelectedSessionRating(value)}
                className="flex justify-around"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="normal" id="r1" />
                  <Label htmlFor="r1">💙</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="good" id="r2" />
                  <Label htmlFor="r2">🩷</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="excellent" id="r3" />
                  <Label htmlFor="r3">💖</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className=" flex gap-20 items-center">
            <Label className="text-base">Ментор үнэлэх: </Label>
            <div>
              <RadioGroup
                value={selectedTutorRating}
                onValueChange={(value) => setSelectedTutorRating(value)}
                className="flex justify-around"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="normal" id="r1" />
                  <Label htmlFor="r1">💙</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="good" id="r2" />
                  <Label htmlFor="r2">🩷</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="excellent" id="r3" />
                  <Label htmlFor="r3">💖</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className=" flex flex-col gap-1">
            <Label className="text-base">Сэтгэгдэл үлдээх: </Label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Энд сэтгэгдлээ бичнэ үү...
                    "
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
