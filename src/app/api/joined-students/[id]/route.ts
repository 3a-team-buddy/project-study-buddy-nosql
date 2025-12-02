import { leaveJoinedSession } from "@/lib/services/leave-joined-session";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const studentClerkId = searchParams.get("student");
    const sessionId = searchParams.get("session");

    // const body = await request.json();
    // const { studentClerkId, sessionId } = body;

    if (!studentClerkId || !sessionId) {
      return NextResponse.json(
        { message: "studentClerkId and sessionId required" },
        { status: 400 }
      );
    }

    const { leaveSession } = await leaveJoinedSession(
      studentClerkId,
      sessionId
    );

    if (!leaveSession) {
      return NextResponse.json(
        { message: "Failed to leave the session!" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { data: leaveSession, message: "Left successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while leaving the sesison!", error);
    return NextResponse.json(
      {
        message: "Unable to leave session due to a server error!",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
