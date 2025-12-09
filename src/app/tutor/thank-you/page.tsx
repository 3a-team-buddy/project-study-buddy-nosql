"use client";
import React from "react";

import { useRouter } from "next/navigation";

import { useState } from "react";
import { Main } from "../components/Main";

const TutorThankYouPage = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const sessionId = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#F1F4F6] via-[#E8EBEF] to-[#F1F4F6] p-4">
      <Main
        isAccepted={isAccepted}
        title={"Thanks for responding!"}
        description={"You declined the session"}
        text={"We notified the session creator"}
      />
    </div>
  );
};
export default TutorThankYouPage;
