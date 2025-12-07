import connectDB from "@/lib/mongodb";
import { checkAuth } from "../check-create-user/route";
import { NextResponse } from "next/server";
import { MockUser } from "@/lib/models/MockUser";
import { Session } from "@/lib/models/Session";

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

  const foundOtherSessions = await Session.find({
    creatorId: { $ne: foundUserId },
    studentCount: { $nin: [foundUserId.toString()] },
  });

  if (!foundOtherSessions) {
    return NextResponse.json(
      { message: "No joined sessions" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    data: foundOtherSessions,
  });
}
