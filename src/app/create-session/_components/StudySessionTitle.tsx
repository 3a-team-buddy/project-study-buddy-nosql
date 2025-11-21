"use client";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, TextSearch } from "lucide-react";

export type sweTopicsType = {
  topicTitle: string;
};

const sweTopics = [
  {
    topicTitle: "useContext",
    topicDescription:
      "Context creation, providers, consumption, value updates, re-render behavior, combining with useReducer, performance optimization, avoiding overuse, and debugging provider placement.",
  },
  {
    topicTitle: "JWT Token",
    topicDescription:
      "JWT structure, signing algorithms, token storage, security risks, expiration, refresh tokens, authentication flow, verification, and preventing XSS/CSRF attacks.",
  },
  {
    topicTitle: "Express JS",
    topicDescription:
      "Routing, middleware, request/response lifecycle, error handling, REST APIs, authentication, validation, security, environment config, async handling, and performance optimization.",
  },
  {
    topicTitle: "Error Handling",
    topicDescription:
      "Middleware patterns, try/catch async errors, centralized handlers, logging, validation errors, HTTP status codes, custom messages, async wrappers, and production-safe responses.",
  },
];

export const StudySessionTitle = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [studySessionTitle, setStudySessionTitle] = useState<string>("");
  const [savedStudyTopics, setSavedStudyTopics] = useState<
    sweTopicsType[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(-1);

  const handleTitleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStudySessionTitle(value);
    if (value.length === 0) {
      setOpen(false);
      setSavedStudyTopics(null);
      setLoading(false);
      return;
    }
    setOpen(true);
    setLoading(true);
    setSavedStudyTopics(sweTopics);
    setLoading(false);
  };
  console.log(studySessionTitle);

  const handleSearchTitle = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!savedStudyTopics?.length) return;
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        if (index >= 0 && index < savedStudyTopics.length) {
          setStudySessionTitle(savedStudyTopics[index].topicTitle);
        } else if (studySessionTitle.trim()) {
          setStudySessionTitle(encodeURIComponent(studySessionTitle));
        }
        setOpen(false);
        setStudySessionTitle("");
        setIndex(-1);
        break;
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <Label>Study Session Title</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <div className="w-full flex items-center">
            <TextSearch className="pl-2" />
            <Input
              value={studySessionTitle}
              onChange={handleTitleInputChange}
              onKeyDown={handleSearchTitle}
              placeholder="Type here..."
              className="w-full -ml-6 pl-8"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          side="bottom"
          align="center"
          sideOffset={2}
          className="w-[559px] bg-white/90"
        >
          <div>
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              savedStudyTopics?.map((topic, i) => (
                <div
                  onMouseEnter={() => setIndex(i)}
                  onClick={() => {
                    setOpen(false);
                    setStudySessionTitle("");
                    setIndex(-1);
                  }}
                >
                  {topic.topicTitle}
                </div>
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
