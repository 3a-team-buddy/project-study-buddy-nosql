import { NextRequest, NextResponse } from "next/server";
import { getAllSelectedTutors } from "@/lib/services/selected-tutors-service";

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();
  if (!sessionId) {
    return NextResponse.json(
      { message: "SessionId required!" },
      { status: 404 }
    );
  }
  const data = await getAllSelectedTutors(sessionId);
  console.log({ sessionId });
  console.log({ data });
  if (!data) {
    return NextResponse.json(
      { message: "Failed to get selected tutors!" },
      { status: 500 }
    );
  }
  return NextResponse.json({ data });
}
