"use client";
import React, { Dispatch, useState } from "react";
import { Label, Textarea, Button } from "@/components/ui";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export const CreateMockUser = ({
  setLoading,
  loading,
}: {
  setLoading: Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}) => {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userImage, setUserImage] = useState<string>("");
  const [userStatus, setUserStatus] = useState<string>("");

  const createMockUsers = async () => {
    if (!userName || !userEmail || !userImage || !userStatus) {
      toast.warning("All fields are required!");
      return;
    }

    setLoading(true);

    const response = await fetch("api/mock-datas/create-mock-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mockUserName: userName,
        mockUserEmail: userEmail,
        mockUserImage: userImage,
        mockUserStatus: userStatus.toUpperCase(),
      }),
    });

    if (!response.ok) {
      toast.error("Failed to create mock user!");
    }

    toast.success("Mock user created successfully");

    toast.success("Mock user created successfully");
    setUserName("");
    setUserEmail("");
    setUserImage("");
    setUserStatus("");
    setLoading(false);
  };

  console.log({ userName, userEmail, userImage, userStatus });

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="text-xl leading-6 font-semibold">
          User Mock Data Maker
        </div>

        <div className="flex flex-col gap-1">
          <Label>User Name</Label>
          <Textarea
            className="min-h-9 text-black "
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Type user name here..."
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>User Email </Label>
          <Textarea
            className="text-black "
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Type user email here..."
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>User Image</Label>
          <Textarea
            value={userImage}
            onChange={(e) => setUserImage(e.target.value)}
            placeholder="Type image here..."
            className="min-h-9 text-black"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>User Status</Label>
          <Textarea
            className="text-black "
            value={userStatus}
            onChange={(e) => setUserStatus(e.target.value)}
            placeholder="Type user status here..."
          />
        </div>

        <Button
          onClick={createMockUsers}
          className="w-full bg-[#2563EB] hover:bg-[#1d4ed8]"
        >
          {loading && <LoaderCircle className="animate-spin" />}{" "}
          <p>Save User Mock Data</p>
        </Button>
      </div>
    </div>
  );
};
