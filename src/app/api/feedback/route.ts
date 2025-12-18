import Ably from "ably";
import { createRating } from "@/lib/services/create-rating";
import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "../check-create-user/route";
import { MockUser } from "@/lib/models/MockUser";
import { Session } from "@/lib/models/Session";

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

  if (!sessionId || !selectedSessionRating || !selectedTutorRating) {
    return NextResponse.json(
      { message: "All fields are required!" },
      { status: 400 }
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

  await Session.findByIdAndUpdate(sessionId, {
    isRated: true,
    status: "COMPLETED",
  });

  const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
  await ably.channels
    .get("sessions")
    .publish("session-rated", {
      sessionId,
      status: "COMPLETED",
      isRated: true,
    });

  return NextResponse.json({ message: "Rating saved successfully!" });
}
