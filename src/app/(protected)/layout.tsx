"use client";

import { Toaster } from "@/components/ui/sonner";
import { Dashboard, Header } from "../_components-main-page";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/login");
    }
  }, [isLoaded, user]);

  useEffect(() => {
    console.log({ user });
    if (!user) return;
    const createUser = async () => {
      if (!user.id) {
        alert("id");
      }
      if (!user.emailAddresses[0].emailAddress) {
        alert("email");
      }
      if (!user.primaryEmailAddress?.emailAddress) {
        alert("email 2");
      }
      if (!user.fullName) {
        alert("fullname");
      }
      if (!user.imageUrl) {
        alert("IMAGE");
      }

      const response = await fetch("api/mock-datas/create-student-mock-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentClerckId: user.id,
          studentEmail: user.primaryEmailAddress?.emailAddress,
          studentName: user.fullName,
          studentImage: user.imageUrl,
        }),
      });
      // clerck id

      if (!response.ok) {
        alert("Failed to create mock topic!");
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
    };
    createUser();
  }, [user]);

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
          <Toaster />
        </div>
      </div>
    </div>
  );
}
