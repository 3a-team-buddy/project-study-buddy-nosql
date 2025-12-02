import { NextRequest, NextResponse } from "next/server";
import { getAllSelectedTutors } from "@/lib/services/selected-tutors-service";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { sessionId } = body;

  if (!sessionId) {
    return NextResponse.json({ message: "No session id" });
  }

  const selectedTutorsDB = await getAllSelectedTutors(sessionId);

  if (!selectedTutorsDB) {
    return NextResponse.json(
      { message: "Failed to get selected tutors!" },
      { status: 500 }
    );
  }

  return NextResponse.json({ data: selectedTutorsDB }, { status: 200 });
}
