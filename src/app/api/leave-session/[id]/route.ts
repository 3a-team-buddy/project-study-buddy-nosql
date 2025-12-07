import Ably from "ably";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { JoinedStudent } from "@/lib/models/JoinedStudent";
import { MockUser } from "@/lib/models/MockUser";
import { Session } from "@/lib/models/Session";
import { checkAuth } from "../../check-create-user/route";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id } = await params;

  const foundSession = await Session.findOne({ _id: id }, "_id");

  if (!foundSession) {
    return NextResponse.json({ message: "Session not found" }, { status: 404 });
  }
  console.log({ foundSession });
  const foundSessionId = foundSession._id;
  console.log({ foundSessionId });

  const deletedFromJoinedStudent = await JoinedStudent.findOneAndDelete({
    studentId: foundUserId,
    sessionId: foundSessionId,
  });

  console.log({ deletedFromJoinedStudent });
  if (!deletedFromJoinedStudent) {
    return NextResponse.json(
      { message: "You were not joined in this session" },
      { status: 404 }
    );
  }

  const updatedSession = await Session.findByIdAndUpdate(
    foundSessionId,
    { $pull: { studentCount: foundUserId.toString() } },
    { new: true }
  );
  console.log({ updatedSession });

  const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
  await ably.channels.get(`session-${foundSessionId}`).publish("student-left", {
    studentId: foundUserId,
    sessionId: foundSessionId,
  });
  return NextResponse.json(
    {
      message: "Left session successfully",
    },
    { status: 200 }
  );
}
