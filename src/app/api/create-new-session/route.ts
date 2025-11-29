import { NextRequest, NextResponse } from "next/server";
import {
  createNewSession,
  getAllSessions,
} from "@/lib/services/create-session-service";
import { createSelectedTutor } from "@/lib/services/selected-tutors-service";

export async function GET() {
  const allSessions = await getAllSessions();
  console.log({ allSessions });
  if (!allSessions) {
    return NextResponse.json({ error: "No Sessions" }, { status: 404 });
  }
  return NextResponse.json({ data: allSessions });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sessionTopicTitle,
      description,
      minMember,
      maxMember,
      value,
      time,
      selectedSessionType,
      creatorId,
      selectedTutors,
    } = body;

    if (
      !sessionTopicTitle ||
      !description ||
      !minMember ||
      !maxMember ||
      !value ||
      !time ||
      !selectedSessionType ||
      !creatorId ||
      !selectedTutors
    ) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }

    const sessionCreator = await createNewSession(
      sessionTopicTitle,
      description,
      minMember,
      maxMember,
      value,
      time,
      selectedSessionType,
      creatorId
    );

    if (!sessionCreator) {
      return NextResponse.json(
        { message: "Failed to create session!" },
        { status: 500 }
      );
    }

    const createdSessionId = sessionCreator._id;
    const createdSessionType = sessionCreator.selectedSessionType;

    if (createdSessionType === "tutor-led") {
      await createSelectedTutor(selectedTutors, createdSessionId);
    }

    return NextResponse.json(
      { message: "New session created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while creating session!", error);
    return NextResponse.json(
      { message: "Server error while creating session!", error },
      { status: 500 }
    );
  }
}
