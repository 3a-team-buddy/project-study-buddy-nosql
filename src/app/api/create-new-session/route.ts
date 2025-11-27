import {
  createNewSession,
  getAllSessions,
} from "@/lib/services/create-session-service";
import { NextRequest, NextResponse } from "next/server";

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
    } = body;

    if (
      !sessionTopicTitle ||
      !description ||
      !minMember ||
      !maxMember ||
      !value ||
      !time ||
      !selectedSessionType ||
      !creatorId
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

export async function GET() {
  const allSessions = await getAllSessions();

  if (!allSessions) {
    return NextResponse.json({ error: "No Sessions" }, { status: 404 });
  }
  return NextResponse.json(
    { message: "Getting sessions data", data: allSessions },
    { status: 200 }
  );
}
