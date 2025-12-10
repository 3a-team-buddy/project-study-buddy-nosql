"use client";

import { useEffect, useState } from "react";
import { SessionTypeSelector } from "./SessionTypeSelector";
import SelectedTutorList from "./SelectedTutorList";

export default function EditSessionForm({ sessionId }: { sessionId: string }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [tutors, setTutors] = useState<
    { mockUserEmail: string; order: number }[]
  >([]);

  // ----------------------------
  // 1. Fetch session info + selected tutors
  // ----------------------------
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/update-my-sessions/${sessionId}`);
      const data = await res.json();
      setSession(data);

      // Get selected tutors
      const tutorsRes = await fetch(
        `/api/update-my-sessions/get-tutors?sessionId=${sessionId}`
      );
      const tutorsData = await tutorsRes.json();

      setTutors(
        tutorsData.map((t: any, index: number) => ({
          mockUserEmail: t.tutorId.mockUserEmail,
          order: index + 1,
        }))
      );

      setLoading(false);
    };

    fetchData();
  }, [sessionId]);

  if (loading) return <p>Loading...</p>;

  // ----------------------------
  // 2. Save Changes
  // ----------------------------
  const handleSave = async () => {
    const res = await fetch(`/api/update-my-sessions/${sessionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...session,
        selectedTutors: tutors,
      }),
    });

    if (!res.ok) {
      alert("Update failed");
      return;
    }
    alert("Updated successfully");
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <input
        className="border p-2 rounded"
        value={session.sessionTopicTitle}
        onChange={(e) =>
          setSession({ ...session, sessionTopicTitle: e.target.value })
        }
      />
      {/* <SessionTypeSelector
        selectedSessionType={selectedSessionType}
        setSelectedSessionType={setSelectedSessionType}
        selectedTutors={selectedTutors}
        setSelectedTutors={setSelectedTutors}
      />
      <SessionTypeSelector
        selected={session.selectedSessionType}
        onChange={(v) => setSession({ ...session, selectedSessionType: v })}
      /> */}

      {/* Tutor List */}
      <SelectedTutorList tutors={tutors} setTutors={setTutors} />

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
