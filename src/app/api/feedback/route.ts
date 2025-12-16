import { createRating } from "@/lib/services/create-rating";
import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "../check-create-user/route";
import { MockUser } from "@/lib/models/MockUser";

export async function POST(request: NextRequest) {
  const result = await checkAuth();

  if (!result) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { userClerkId } = result;
  const creator = await MockUser.findOne(
    {
      mockUserClerkId: userClerkId,
    },
    "_ids"
  );

  const creatorId = creator?._id;

  const body = await request.json();
  const { sessionId, selectedSessionRating, selectedTutorRating, feedback } =
    body;

  console.log({
    sessionId,
    selectedSessionRating,
    selectedTutorRating,
    feedback,
  });

  if (!sessionId || !selectedSessionRating || !selectedTutorRating) {
    return NextResponse.json(
      { message: "All fields are required!" },
      { status: 401 }
    );
  }

  const sessionRating = await createRating(
    sessionId,
    selectedSessionRating.toUpperCase(),
    selectedTutorRating.toUpperCase(),
    feedback,
    creatorId
  );

  if (!sessionRating) {
    return NextResponse.json(
      { message: "Failed to create session rating!" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Rating saved successfully!" });
}
