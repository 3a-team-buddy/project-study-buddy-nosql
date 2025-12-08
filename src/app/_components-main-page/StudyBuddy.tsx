"use client";

import React from "react";
import { Button } from "@/components/ui";
import { Panda } from "lucide-react";
import { useRouter } from "next/navigation";

export const StudyBuddy = ({ open }: { open: boolean }) => {
  const router = useRouter();

  return (
    <div>
      {open && (
        <div className="flex flex-col">
          <Button
            onClick={() => router.push("/create-session")}
            className="bg-transparent justify-start ml-2 px-2 py-1.5 text-muted-foreground hover:text-primary-foreground cursor-pointer"
          >
            Create Study Buddy
          </Button>
          <Button
            onClick={() => router.push("/my-sessions")}
            className="bg-transparent justify-start ml-2 px-2 py-1.5 text-muted-foreground hover:text-primary-foreground cursor-pointer"
          >
            <Panda />
            My Study Buddies
          </Button>
          <Button
            onClick={() => router.push("/final-session")}
            className="bg-transparent justify-start ml-2 px-2 py-1.5 text-muted-foreground hover:text-primary-foreground cursor-pointer"
          >
            final page
          </Button>
        </div>
      )}
    </div>
  );
};
