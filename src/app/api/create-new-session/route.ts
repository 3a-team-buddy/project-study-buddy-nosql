import Ably from "ably";
import { NextRequest, NextResponse } from "next/server";
import { createNewSession } from "@/lib/services/create-session-service";
import { createSelectedTutor } from "@/lib/services/selected-tutors-service";
import { createJoinedStudent } from "@/lib/services/joined-students-service";
import { checkAuth } from "../check-create-user/route";
import connectDB from "@/lib/mongodb";
import { MockUser } from "@/lib/models/MockUser";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const result = await checkAuth();

    if (!result) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { userClerkId } = result;

    const creator = await MockUser.findOne(
      {
        mockUserClerkId: userClerkId,
      },
      "_id"
    );
    const creatorId = creator._id;
    console.log({ creatorId });

    const body = await request.json();
    const {
      sessionTopicTitle,
      description,
      minMember,
      maxMember,
      value,
      time,
      selectedSessionType,
      selectedTutors,
      studentCount,
    } = body;

    if (
      !sessionTopicTitle ||
      !description ||
      !minMember ||
      !maxMember ||
      !value ||
      !time ||
      !selectedSessionType ||
      !selectedTutors
    ) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }

    const createdSession = await createNewSession(
      sessionTopicTitle,
      description,
      minMember,
      maxMember,
      value,
      time,
      selectedSessionType,
      creatorId,
      studentCount
    );

    if (!createdSession) {
      return NextResponse.json(
        { message: "Failed to create session!" },
        { status: 500 }
      );
    }

    const createdSessionId = createdSession._id;
    const createdSessionType = createdSession.selectedSessionType;
    const firstJoinedStudentId = createdSession.creatorId;
    // console.log({ createdSession });

    if (createdSessionType === "tutor-led") {
      await createSelectedTutor(selectedTutors, createdSessionId);
    }

    const { updatedSession } = await createJoinedStudent(
      firstJoinedStudentId,
      createdSessionId
    );

    const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    const channel = ably.channels.get("sessions");

    await channel.publish("session-created", updatedSession);

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
