import React from "react";
import { Button } from "@/components/ui/button";
import { Flame, LucideBell, LucideHistory } from "lucide-react";

export const Header = () => {
  return (
    <header className="max-w-[1440px] flex items-center justify-between m-auto px-3 py-3 bg-[#01051B] ">
      <div className="flex gap-6">
        <img src="/pineconeIcon.svg" alt="pinecone icon" />
        <div className="flex gap-2">
          <Button size={"lg"} className="bg-transparent px-4">
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
            <Flame className="text-fuchsia-500 fill-current" />
            <p>111</p>
          </Button>
          <Button size={"sm"} className="bg-gray-800 rounded-full">
            <p>1780</p>
          </Button>
          <Button size={"sm"} className="bg-gray-800 rounded-full">
            <p>3560</p>
            <p>/3880XP</p>
          </Button>
        </div>
        <Button size={"sm"} className="bg-gray-800 rounded-full">
          <LucideHistory />
        </Button>
        <Button size={"sm"} className="bg-gray-800 rounded-full">
          <LucideBell />
        </Button>{" "}
        <Button size={"sm"} className="bg-gray-800 rounded-full"></Button>
      </div>
    </header>
  );
};
