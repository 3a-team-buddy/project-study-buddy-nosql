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
  console.log({ user });

  // auth hiigeed daraa ni save hiij bga
  // POST huselt yavad be-ees butsaj clerk data-g avch user bgag shalgah eseh
  async function saveUser() {
    const token = await getToken();

    fetch("/api/check-create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  useEffect(() => {
    saveUser();
  }, []);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/login");
    }

    // if (isLoaded && user) {
    //   saveStudentData(user);
    // }
  }, [isLoaded, user]);

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
        </div>
      </div>
    </div>
  );
}
// const saveStudentData = async (user: UserResource) => {
//   if (!user) {
//     toast.warning("Missing required fields!");
//     return;
//   }

//   setLoading(true);

//   try {
//     const response = await fetch("api/mock-datas/create-student-mock-data", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         studentClerkId: user.id,
//         studentEmail: user.primaryEmailAddress?.emailAddress,
//         studentName: user.fullName,
//         studentImage: user.imageUrl,
//       }),
//     });

//     if (!response.ok) {
//       toast.error("Failed to create student mock data!");
//     }

//     toast.success("Student mock data created successfully");
//   } catch (error) {
//     console.error("Error while creating student mock data!", error);
//     toast.error("Something went wrong while creating student mock data!");
//   } finally {
//     setLoading(false);
//   }
// };
