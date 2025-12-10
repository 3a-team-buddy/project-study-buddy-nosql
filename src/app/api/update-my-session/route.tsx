import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Session } from "@/lib/models/Session";

export async function PUT(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    await connectDB();

    const { sessionId } = params;
    const body = await request.json();

    const {
      sessionTopicTitle,
      description,
      minMember,
      maxMember,
      value,
      time,
      selectedSessionType,
    } = body;

    // Validation
    if (
      !sessionTopicTitle ||
      !description ||
      !minMember ||
      !maxMember ||
      !value ||
      !time ||
      !selectedSessionType
    ) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }

    // DB update
    const updatedSession = await Session.findOneAndUpdate(
      { _id: sessionId },
      {
        $set: {
          sessionTopicTitle,
          description,
          minMember,
          maxMember,
          value,
          time,
          selectedSessionType,
        },
      },
      { new: true }
    );

    if (!updatedSession) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Session updated successfully", data: updatedSession },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating session", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
