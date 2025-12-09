"use client";

import { useRouter } from "next/navigation";
import { InvitationModal } from "../components/InvitationModal";
import { useState } from "react";

export default function TutorAcceptedPage() {
  const [isAccepted, setIsAccepted] = useState(true);
  const sessionId = useRouter();
  console.log({ sessionId });

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#F1F4F6] via-[#E8EBEF] to-[#F1F4F6] p-4">
      <InvitationModal
        title={"Thank You!"}
        description={" You accepted the session."}
        text={" We notified the students"}
      />
    </div>
  );
}
