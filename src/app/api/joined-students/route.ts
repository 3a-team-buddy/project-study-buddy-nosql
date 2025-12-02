import { NextRequest, NextResponse } from "next/server";
import { createJoinedStudent } from "@/lib/services/joined-students-service";
import Ably from "ably";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentClerkId, sessionId } = body;

    // console.log(studentClerkId);
    // console.log(sessionId);
    if (!studentClerkId || !sessionId) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }

    const { updatedSession } = await createJoinedStudent(
      studentClerkId,
      sessionId
    );

    if (!updatedSession) {
      return NextResponse.json(
        { message: "Failed to join the session!" },
        { status: 500 }
      );
    }

    const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    const channel = ably.channels.get("sessions");

    await channel.publish("session-joined", { sessionId, studentClerkId });

    return NextResponse.json(
      { data: updatedSession, message: "Joined successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while joining the session!", error);
    return NextResponse.json(
      {
        message: "Unable to join session due to a server error!",
        error,
      },
      { status: 500 }
    );
  }
}
