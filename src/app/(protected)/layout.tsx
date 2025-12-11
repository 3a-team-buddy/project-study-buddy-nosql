"use client";

import { useEffect } from "react";
import { Dashboard, Header } from "../_components-main-page";
import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) return;

    async function createCheckUser() {
      const token = await getToken();

      await fetch("/api/check-create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }

    createCheckUser();
  }, [isLoaded, user]);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/login");
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner className="w-10 h-10 text-white" />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen">
      <Header />
      <div>
        <div className="flex gap-6">
          {/* <Dashboard /> */}
          {children}
        </div>
      </div>
    </div>
  );
}

//bg-[url('https://talent.pinebaatars.mn/pinebaatar.png')]
