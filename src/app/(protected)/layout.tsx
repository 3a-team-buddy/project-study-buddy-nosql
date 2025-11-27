"use client";

import { Toaster } from "@/components/ui/sonner";
import { Dashboard, Header } from "../_components-main-page";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import { UserResource } from "@clerk/shared/index-wiEBPMmH";
import { toast } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  console.log({ user });

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/login");
    }

    if (isLoaded && user) {
      saveStudentData(user);
    }
  }, [isLoaded, user]);

  const saveStudentData = async (user: UserResource) => {
    if (!user) {
      toast.warning("Missing required fields!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("api/mock-datas/create-student-mock-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentClerkId: user.id,
          studentEmail: user.primaryEmailAddress?.emailAddress,
          studentName: user.fullName,
          studentImage: user.imageUrl,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to create student mock data!");
      }

      toast.success("Student mock data created successfully");
    } catch (error) {
      console.error("Error while creating student mock data!", error);
      toast.error("Something went wrong while creating student mock data!");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }
  return (
    <div className="bg-[url('https://talent.pinebaatars.mn/pinebaatar.png')] bg-cover bg-center">
      <Header />
      <div className="max-w-[1440px] flex flex-col justify-center m-auto">
        <div className="flex gap-6 py-9">
          <Dashboard />
          {children}
          <Toaster position="top-center" />
        </div>
      </div>
    </div>
  );
}
// try {
//   await axios.post("/api/", {
//     clerkId: user.id,
//     email: user.primaryEmailAddress?.emailAddress,
//     name: user.fullName,
//   });
//   const result = await axios.get("/api/users");
//   // console.log(result, "get requesttttttt");
//   // console.log(result.data.users);
// } catch (err) {
//   console.error(err);
// }
