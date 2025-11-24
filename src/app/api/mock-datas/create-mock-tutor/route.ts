import {
  createMockTutor,
  getAllMockTutors,
} from "@/lib/services/session-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mockTutorName, mockTutorEmail, mockTutorImage } = body;

    if (!mockTutorName || !mockTutorEmail || !mockTutorImage) {
      return NextResponse.json(
        { message: "All field are required!" },
        { status: 400 }
      );
    }
    const mockSessionTutor = await createMockTutor(
      mockTutorName,
      mockTutorEmail,
      mockTutorImage
    );

    if (!mockSessionTutor) {
      return NextResponse.json(
        { message: "Failed to create mock tutor!" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Mock tutor created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while creating mock tutor!", error);
    return NextResponse.json(
      { message: "Server error while creating mock tutor!" },
      { status: 500 }
    );
  }
}

export const GET = async () => {
  const mockTutors = await getAllMockTutors();
  console.log({ mockTutors });

  return NextResponse.json(
    { message: "Getting tutors data", mockTutors },
    { status: 200 }
  );
};
