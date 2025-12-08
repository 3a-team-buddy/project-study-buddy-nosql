"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui";
import { CreateSessionType } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

export const SessionDeleteBtn = ({
  session,
}: {
  session: CreateSessionType;
}) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  async function deleteSession(id: string) {
    if (confirm("Are you sure you want to delete this session?")) {
      setLoading(true);

      const token = await getToken();

      const result = await fetch(`/api/delete-sessions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!result.ok) {
        toast.error("Failed to delete study session!");
      }

      toast.success("Study session deleted");
      setLoading(false);
    }
  }

  return (
    <Button
      disabled={loading}
      variant={"destructive"}
      className="w-1/2 rounded-full cursor-pointer"
      onClick={() => deleteSession(session._id)}
    >
      Delete Session
    </Button>
  );
};
