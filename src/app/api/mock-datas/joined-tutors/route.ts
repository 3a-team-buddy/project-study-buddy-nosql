import { createMockJoinedTutors } from "@/lib/services/joined-tutors-service";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { selectedTutors } = body;
  console.log({ selectedTutors });
  //createMockStudent
  const joinedTutorsMockDB = await createMockJoinedTutors(selectedTutors);
}
