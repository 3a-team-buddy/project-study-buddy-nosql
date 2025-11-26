import {
  createMockStudent,
  getAllMockStudets,
} from "@/lib/services/student-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentClerkId, studentName, studentImage, studentEmail } = body;
    console.log({ studentClerkId, studentName, studentImage, studentEmail });

    const studentBuddyMockDB = await createMockStudent(
      studentClerkId,
      studentName,
      studentImage,
      studentEmail
    );

    if (!studentBuddyMockDB) {
      return NextResponse.json(
        { message: "Failed to create student mock data!" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Student mock data created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while creating student mock data!", error);
    return NextResponse.json(
      { message: "Server error while creating student mock data!", error },
      { status: 500 }
    );
  }
}

export const GET = async () => {
  try {
    const students = await getAllMockStudets();
    console.log({ students });

    if (!students) {
      return NextResponse.json(
        { message: "No mock datas found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: students }, { status: 200 });
  } catch (error) {
    console.error("Error while getting students!", error);
    return NextResponse.json(
      {
        message: "Server error while getting students!",
        error,
      },
      { status: 500 }
    );
  }
};
