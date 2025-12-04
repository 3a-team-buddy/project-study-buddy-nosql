import { NextRequest, NextResponse } from "next/server";
import { getAllSelectedTutors } from "@/lib/services/selected-tutors-service";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { sessionId } = body;

  if (!sessionId) {
    return NextResponse.json({ message: "No session id" });
  }

  const selectedTutorsEmails = await getAllSelectedTutors(sessionId);

  if (!selectedTutorsEmails) {
    return NextResponse.json(
      { message: "Failed to get selected tutors!" },
      { status: 500 }
    );
  }

  return NextResponse.json({ data: selectedTutorsEmails }, { status: 200 });
}
