import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { JoinedStudent } from "@/lib/models/JoinedStudent";
import mongoose from "mongoose";
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
  const foundSessionId = foundSession._id;
  console.log({ foundSessionId });

  const deletedFromJoinedStudent = await JoinedStudent.findOneAndDelete({
    studentId: foundUserId,
    sessionId: foundSessionId,
  });
  console.log({ deletedFromJoinedStudent });
  if (!deletedFromJoinedStudent) {
    return NextResponse.json(
      { message: "Error while deleting" },
      { status: 404 }
    );
  }

  const removedStudentSession = await Session.findByIdAndUpdate(
    foundSessionId,
    { $pull: { studentCount: foundUserId } },
    { new: true }
  );
  console.log({ removedStudentSession });
  return NextResponse.json({
    message: "Left session successfully",
    data: removedStudentSession,
  });
}
