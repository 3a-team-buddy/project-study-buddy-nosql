import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Session } from "@/lib/models/Session";
import { checkAuth } from "../check-create-user/route";
import { MockUser } from "@/lib/models/MockUser";

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

  const foundCreatedSessions = await Session.find({ creatorId: foundUserId });

  if (!foundCreatedSessions) {
    return NextResponse.json(
      { message: "No created sessions" },
      { status: 400 }
    );
  }

  return NextResponse.json({ data: foundCreatedSessions });
}
