import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Session } from "@/lib/models/Session";
import { checkAuth } from "../../check-create-user/route";
import { MockUser } from "@/lib/models/MockUser";
import { SelectedTutor } from "@/lib/models/SelectedTutor";
import { createSelectedTutor } from "@/lib/services/selected-tutors-service";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const result = await checkAuth();

    if (!result) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    const { userClerkId } = result;
    const creator = await MockUser.findOne(
      {
        mockUserClerkId: userClerkId,
      },
      "_id"
    );

    const creatorId = creator?._id;
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
    } = body;

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
    const uppercasedSessionType = selectedSessionType
      .toUpperCase()
      .replace(" ", "-");

    const updatedSession = await Session.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          sessionTopicTitle,
          description,
          minMember,
          maxMember,
          value,
          time,
          uppercasedSessionType,
          creatorId,
        },
      },
      { new: true }
    );

    const createdSessionId = updatedSession._id;
    const createdSessionType = updatedSession.selectedSessionType;

    await SelectedTutor.deleteMany({ createdSessionId: id });
    if (createdSessionType === "TUTOR-LED") {
      await createSelectedTutor(selectedTutors, createdSessionId);
    }

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
