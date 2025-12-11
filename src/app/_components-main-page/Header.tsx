"use client";

import React from "react";
import { Button } from "@/components/ui";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Panda } from "lucide-react";

export const Header = () => {
  const router = useRouter();

  return (
    <header className="bg-linear-to-b from-[#1E2648]/10 to-[#122136]/60 relative">
      <div className="max-w-[1440px] flex items-center justify-between m-auto px-3 py-3">
        <div className="flex gap-6 items-center">
          <div
            onClick={() => router.push("/")}
            className="flex gap-2 items-center cursor-pointer"
          >
            <Panda size={32} className="text-white" />
            <p className="text-white">Buddy-Buddy Team</p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => router.push("/card-chunks")}
              size={"lg"}
              variant={"ghost"}
              className="bg-transparent px-4 cursor-pointer hover:bg-transparent text-transparent hover:text-white-transparent border-0"
            >
              Study Buddy
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <UserButton />
        </div>
      </div>
    </header>
  );
};
