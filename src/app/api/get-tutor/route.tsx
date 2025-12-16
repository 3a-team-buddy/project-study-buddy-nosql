import { NextRequest, NextResponse } from "next/server";
import { SelectedTutor } from "@/lib/models/SelectedTutor";
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { sessionId } = body;
  if (!sessionId) {
    return NextResponse.json(
      { message: "SessionId required!" },
      { status: 404 }
    );
  }
  const data = await SelectedTutor.find({ createdSessionId: sessionId });

  console.log({ data });

  if (!data) {
    return NextResponse.json(
      { message: "Failed to get selected session type!" },
      { status: 500 }
    );
  }

  return NextResponse.json({ data: data });
}
