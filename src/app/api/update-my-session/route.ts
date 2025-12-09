import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Session } from "@/lib/models/Session";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;
    const body = await request.json();

    const {
      sessionTitle,
      description,
      minMember,
      maxMember,
      value,
      time,
      selectedSessionType,
      selectedTutors,
    } = body;

    if (
      !sessionTitle ||
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

    const session = await Session.findById(id);
    if (!session) {
      return NextResponse.json(
        { message: "Session not found!" },
        { status: 404 }
      );
    }

    session.sessionTopicTitle = sessionTitle;
    session.description = description;
    session.minMember = minMember;
    session.maxMember = maxMember;
    session.value = value;
    session.time = time;
    session.selectedSessionType = selectedSessionType;

    await session.save();

    return NextResponse.json(
      { message: "Session updated successfully", session },
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
