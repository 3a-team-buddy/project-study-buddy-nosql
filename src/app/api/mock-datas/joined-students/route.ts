import { CreateAllJoinedStudent } from "@/lib/services/joined-students-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, joinedStudentSessionId } = body;
    const studentClerkId = userId.userId;

    if (!userId || !joinedStudentSessionId) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }
    console.log({ studentClerkId, joinedStudentSessionId });

    const joinedStudentMockDB = await CreateAllJoinedStudent(
      studentClerkId,
      joinedStudentSessionId
    );

    if (!joinedStudentMockDB) {
      return NextResponse.json(
        { message: "Failed to create joined student mock data!" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Joined student mock data created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while creating joined student mock data!", error);
    return NextResponse.json(
      {
        message: "Server error while creating joined student mock data!",
        error,
      },
      { status: 500 }
    );
  }
}
