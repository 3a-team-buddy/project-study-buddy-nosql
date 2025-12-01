import { NextRequest, NextResponse } from "next/server";
import { getAllJoinedStudents } from "@/lib/services/joined-students-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json({ message: "No session id!" }, { status: 404 });
    }

    const joinedStudentsDB = await getAllJoinedStudents(sessionId);

    if (!joinedStudentsDB) {
      return NextResponse.json(
        { message: "Failed to get joined students!" },
        { status: 500 }
      );
    }
    return NextResponse.json({ data: joinedStudentsDB }, { status: 200 });
  } catch (error) {
    console.error("Error while getting joined students!", error);
    return NextResponse.json(
      {
        message: "Unable to get joined students due to a server error!",
        error,
      },
      { status: 500 }
    );
  }
}
