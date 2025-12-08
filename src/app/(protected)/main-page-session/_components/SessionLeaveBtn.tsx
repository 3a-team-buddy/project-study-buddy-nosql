"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui";
import { CreateSessionType } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

export const SessionLeaveBtn = ({
  session,
}: {
  session: CreateSessionType;
}) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const leaveSession = async (id: string) => {
    if (confirm("Are you sure you want to leave this session?")) {
      setLoading(true);

      const token = await getToken();

      const response = await fetch(`/api/leave-session/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response) {
        toast.error("Failed to leave the session!");
      }

      toast.success("You left the session");
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      variant={"destructive"}
      onClick={() => leaveSession(session._id)}
      className="w-full rounded-full cursor-pointer"
    >
      Leave Session
    </Button>
  );
};
