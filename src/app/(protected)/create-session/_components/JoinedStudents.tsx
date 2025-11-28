import { SelectedTutorType } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function JoinedStudents() {
  const { user } = useUser();
  const [studentClerckId, setStudentClerckId] = useState<String>("");
  useEffect(() => {
    if (user) {
      setStudentClerckId(user.id);
    }
    console.log("qqqqqqqqqqqqqq", studentClerckId);
    sendTutorEmail;
  }, []);
  async function sendTutorEmail() {
    const response = await fetch("api/mock-datas/joined-students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentClerckId,
      }),
    });

    if (!response.ok) {
      toast.error("Failed ");
    }
    toast.success("successfully");
  }

  return (
    <>
      <button onClick={sendTutorEmail}></button>
    </>
  );
}
