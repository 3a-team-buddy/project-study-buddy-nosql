import {
  createMockStudent,
  getAllMockStudets,
} from "@/lib/services/student-service";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { studentClerckId, studentName, studentImage, studentEmail } = body;
    console.log({ studentClerckId, studentName, studentImage, studentEmail });
    const studentbuddy = await createMockStudent(
      studentClerckId,
      studentName,
      studentImage,
      studentEmail
    );

    if (!studentbuddy) {
      return NextResponse.json({ message: "Failed " }, { status: 400 });
    }
    return NextResponse.json({ message: "successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error!", error);
    return NextResponse.json({ message: " error " }, { status: 500 });
  }
}
export const GET = async () => {
  const student = await getAllMockStudets();
  console.log({ student });

  return NextResponse.json(
    { message: "Getting tutors data", student },
    { status: 200 }
  );
};
