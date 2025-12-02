import { leaveJoinedSession } from "@/lib/services/leave-joined-session";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const studentClerkId = params.id;

    // const body = await request.json();
    // const { studentClerkId, sessionId } = body;

    if (!studentClerkId) {
      return NextResponse.json(
        { message: "Student ID is required" },
        { status: 400 }
      );
    }

    const { leaveSession } = await leaveJoinedSession(studentClerkId);

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
