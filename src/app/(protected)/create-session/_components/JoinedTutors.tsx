import { SelectedTutorType } from "@/lib/types";

export function JoinedTutors({
  selectedTutors,
}: {
  selectedTutors: SelectedTutorType[];
}) {
  async function sendTutorEmail() {
    const response = await fetch("api/mock-datas/joined-tutors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        selectedTutors,
      }),
    });
  }
  return (
    <>
      <button onClick={sendTutorEmail}></button>
    </>
  );
}
