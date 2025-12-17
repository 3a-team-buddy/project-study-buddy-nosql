import React, { useEffect, useState } from "react";

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { CreateSessionType } from "@/lib/types";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { FaPeoplePulling } from "react-icons/fa6";
import { MdGroupAdd } from "react-icons/md";

export const JoinBtn = ({ session }: { session: CreateSessionType }) => {
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const joinedStudentHandler = async (sessionId: string) => {
    try {
      setIsLoading(true);
      const token = await getToken();

      const joinResponse = await fetch(`/api/joined-students/${sessionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!joinResponse.ok) {
        toast.error("Failed to join!");
      }

      toast.success("Амжилттай нэгдлээ!");
    } catch (error) {
      console.error("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          disabled={
            session.studentCount?.length === session.maxMember || isLoading
          }
          onClick={() => {
            joinedStudentHandler(session._id);
          }}
          className="rounded-full bg-[#2563EB] hover:bg-[#1d4ed8] gap-1 cursor-pointer text-white/80 hover:text-white disabled:cursor-not-allowed disabled:bg-white/40"
        >
          <MdGroupAdd />
          <p className="flex gap-1">
            {session.studentCount?.length}
            <span>/{session.maxMember}</span>
          </p>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Нэгдэх</p>
      </TooltipContent>
    </Tooltip>
  );
};
