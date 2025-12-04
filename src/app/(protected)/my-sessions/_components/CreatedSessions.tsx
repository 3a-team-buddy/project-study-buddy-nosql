"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { CreateSessionType } from "@/lib/types";

export default function CreatedSession() {
  const { getToken } = useAuth();
  const [createdSessions, setCreatedSessions] = useState<CreateSessionType[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      const token = await getToken();

      const res = await fetch("/api/get-sessions-created", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = await res.json();
      console.log(data, "DATA");
      setCreatedSessions(data);
      setLoading(false);
    };

    fetchSessions();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      {/* {createdSessions.map((session) => (
        <div>
          <div>{session.sessionTopicTitle}</div>
        </div>
      ))}
      {createdSessions.map((s: any) => {
        const isCreator = user?.id === s.creatorId;
        const canEdit = s.joinedStudents.length < s.minMember;

        return (
          <div
            key={s._id}
            className="p-4 border rounded-xl flex justify-between"
          >
            <div>
              <h2 className="font-semibold">{s.title}</h2>
              <p>
                {s.joinedStudents.length} / {s.minMember}
              </p>
            </div>

            {isCreator && (
              <div className="flex gap-2">
                <Link href={`/edit-session/${s._id}`}>
                  <Button disabled={!canEdit} variant="outline">
                    Edit
                  </Button>
                </Link>

                <Button
                  disabled={!canEdit}
                  variant="destructive"
                  onClick={() => handleDelete(s._id, setCreatedSessions)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        );
      })} */}
    </div>
  );
}

// async function handleDelete(id: string, setSessions) {
//   const res = await fetch(`/api/delete-session/${id}`, { method: "DELETE" });
//   if (res.ok) {
//     setSessions((prev ) => prev.filter((x) => x._id !== id));
//   }
// }
