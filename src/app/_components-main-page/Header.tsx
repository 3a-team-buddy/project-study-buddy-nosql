"use client";

import React from "react";
import { Button } from "@/components/ui";
import { Circle, Flame, LucideBell, LucideHistory } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  return (
    <header className="bg-[#01051B] ">
      <div className="max-w-[1440px] flex items-center justify-between m-auto px-3 py-3">
        <div className="flex gap-6 items-center">
          <div onClick={() => router.push("/")} className="cursor-pointer">
            <img src="/pineconeIcon.svg" alt="pinecone icon" />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => router.push("/")}
              size={"lg"}
              className="bg-transparent px-4 cursor-pointer"
            >
              Нүүр
            </Button>
            <Button size={"lg"} className="bg-transparent px-4">
              Төслүүд
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center">
            <Button size={"sm"} className="bg-gray-800 rounded-full">
              <Flame size={20} className="text-fuchsia-500 fill-current" />
              <p>111</p>
            </Button>
            <Button size={"sm"} className="bg-gray-800 rounded-full">
              <Circle size={22} className="text-[#FBBF24] fill-current" />
              <p>1780</p>
            </Button>
            <Button size={"sm"} className="bg-gray-800 rounded-full">
              <div className="w-[25px] h-[25px] flex justify-center items-center rounded-full bg-white border-2 border-blue-600 text-blue-600 text-[13px]">
                6
              </div>
              <p>3560</p>
              <p className="text-muted-foreground">/3880XP</p>
            </Button>
          </div>
          <Button size={"sm"} className="bg-gray-800 rounded-full">
            <LucideHistory className="text-zinc-400" />
          </Button>
          <Button size={"sm"} className="bg-gray-800 rounded-full">
            <LucideBell className="text-zinc-500 fill-current" />
          </Button>
          <UserButton />
        </div>
      </div>
    </header>
  );
};
