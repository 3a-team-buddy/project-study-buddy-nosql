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
  return (
    <div>
      <div className="w-full bg-gray-200 h-screen">{children}</div>
    </div>
  );
}

//bg-[url('https://talent.pinebaatars.mn/pinebaatar.png')]
