"use client";

import React from "react";
import { Button } from "@/components/ui";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  return (
    <header className="bg-[#051313] relative">
      <div className="max-w-[1440px] flex items-center justify-between m-auto px-3 py-3">
        <div className="flex gap-6 items-center">
          <div onClick={() => router.push("/")} className="cursor-pointer">
            <img src="/pineconeIcon.svg" alt="pinecone icon" />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => router.push("/card-chunks")}
              size={"lg"}
              variant={"ghost"}
              className="bg-transparent px-4 cursor-pointer hover:bg-transparent text-white hover:text-white border-0"
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
