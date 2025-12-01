import { NextRequest, NextResponse } from "next/server";
import { createJoinedStudent } from "@/lib/services/joined-students-service";

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

    const joinedStudentDB = await createJoinedStudent(
      studentClerkId,
      sessionId
    );

    if (!joinedStudentDB) {
      return NextResponse.json(
        { message: "Failed to join the session!" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { data: joinedStudentDB, message: "Joined successfully" },
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

// export async function GET() {
//   const allJoinedStudents = await getAllJoinedStudents();

//   if (!allJoinedStudents) {
//     return NextResponse.json({ error: "No joined students" }, { status: 404 });
//   }

//   return NextResponse.json(allJoinedStudents);
// }
