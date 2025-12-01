import { NextRequest, NextResponse } from "next/server";
import {
  createJoinedStudent,
  getAllJoinedStudents,
} from "@/lib/services/joined-students-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { message: "Error to get joined students of the selected session!" },
        { status: 400 }
      );
    }

    const joinedStudentsDB = await getAllJoinedStudents(sessionId);

    if (!joinedStudentsDB) {
      return NextResponse.json(
        { message: "Failed to get joined students of the selected session!" },
        { status: 500 }
      );
    }
    return NextResponse.json({ data: joinedStudentsDB }, { status: 200 });
  } catch (error) {
    console.error(
      "Error while getting the student that joined the session!",
      error
    );
    return NextResponse.json(
      {
        message:
          "Unable to get joined students of the session due to a server error!",
        error,
      },
      { status: 500 }
    );
  }
}
