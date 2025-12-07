import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { MockUser } from "@/lib/models/MockUser";
import { Session } from "@/lib/models/Session";
import { checkAuth } from "../check-create-user/route";

export async function GET() {
  await connectDB();

  const result = await checkAuth();

  if (!result) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { userClerkId } = result;

  const foundUser = await MockUser.findOne(
    { mockUserClerkId: userClerkId },
    "_id"
  );

  if (!foundUser) {
    return NextResponse.json(
      { message: "User not found in DB" },
      { status: 404 }
    );
  }
  const foundUserId = foundUser._id;

  const foundJoinedSessions = await Session.find({
    studentCount: foundUserId.toString(),
    creatorId: { $ne: foundUserId },
  });

  if (!foundJoinedSessions) {
    return NextResponse.json(
      { message: "No joined sessions" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    data: foundJoinedSessions,
  });
}
