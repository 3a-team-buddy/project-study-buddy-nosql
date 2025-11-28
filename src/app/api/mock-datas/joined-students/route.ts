import { createJoinedStudents } from "@/lib/services/joined-students-service";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { selectedTutors } = body;
  console.log({ selectedTutors });
  //createMockStudent
  const joinedTutorsMockDB = await createJoinedStudents(selectedTutors);
}
