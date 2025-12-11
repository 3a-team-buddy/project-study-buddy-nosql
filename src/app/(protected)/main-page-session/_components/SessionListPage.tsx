"use client";

import { useEffect, useState } from "react";
import VoiceFloatingButton from "@/app/(protected)/main-page-session/_components/VoiceFloatingButton";
import { startVoiceRecognition, askGPT } from "@/utils/voiceAI";

export default function SessionsPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/sessions")
      .then((r) => r.json())
      .then((data) => {
        setSessions(data);
        setFiltered(data);
      });
  }, []);

  const handleVoiceSearch = async () => {
    try {
      setLoading(true);

      const spoken = await startVoiceRecognition();
      console.log("🎤 User said:", spoken);

      const ai = await askGPT(spoken);
      console.log("AI Parsed:", ai);

      if (ai.action === "search_session") {
        let result = [...sessions];

        if (ai.title) {
          result = result.filter((s) =>
            s.title.toLowerCase().includes(ai.title.toLowerCase())
          );
        }

        if (ai.date === "today") {
          const today = new Date().toISOString().slice(0, 10);
          result = result.filter((s) => s.date === today);
        }

        setFiltered(result);
      }
    } catch (err) {
      console.error("Voice error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Study Sessions</h1>

      {loading && <p>🎤 Listening...</p>}

      <div className="grid gap-3">
        {filtered.map((s) => (
          <div key={s._id} className="p-4 bg-gray-100 rounded shadow">
            <h2>{s.title}</h2>
            <p>{s.date}</p>
          </div>
        ))}
      </div>

      <VoiceFloatingButton onClick={handleVoiceSearch} />
    </div>
  );
}
