import Ably from "ably";
import { NextRequest, NextResponse } from "next/server";
import { createNewSession } from "@/lib/services/create-session-service";
import { createSelectedTutor } from "@/lib/services/selected-tutors-service";

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

    const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    const channel = ably.channels.get("sessions");

    await channel.publish("session-created", sessionCreator);

    return NextResponse.json(
      { message: "New session created successfully", data: sessionCreator },
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
