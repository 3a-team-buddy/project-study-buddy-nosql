import { Button } from "@/components/ui";
import { CreateSessionType } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";
import React from "react";
import { Label } from "recharts";
import { toast } from "sonner";

export const SessionDeleteBtn = ({
  session,
}: {
  session: CreateSessionType;
}) => {
  const { getToken } = useAuth();

  async function deleteSession(id: string) {
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

    toast.success("Study session deleted successfully");
  }

  return (
    <div>
      <div className="w-fit flex gap-2">
        <Button
          variant={"destructive"}
          className="w-full cursor-pointer"
          onClick={() => deleteSession(session._id)}
        >
          Delete Session
        </Button>
      </div>
    </div>
  );
};
