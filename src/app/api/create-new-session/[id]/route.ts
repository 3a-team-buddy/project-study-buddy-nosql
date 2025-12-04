import { headers } from "next/headers";
import { verifyToken } from "@clerk/backend";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { JoinedStudent } from "@/lib/models/JoinedStudent";
import mongoose from "mongoose";
import { MockUser } from "@/lib/models/MockUser";
import { Session } from "@/lib/models/Session";

export async function checkAuth() {
  const headersList = await headers();
  const auth = headersList.get("Authorization");
  const authToken = auth?.split(" ")[1];

  console.log({ authToken });

  if (!authToken) {
    return false;
  }

  try {
    const { sub } = await verifyToken(authToken, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    return { userClerkId: sub };
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const auth = await checkAuth();
  if (!auth)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { userClerkId } = auth;

  const { id } = await params;

  const session = await Session.findById(id);

  const sessionId = new mongoose.Types.ObjectId(sessionIdString);

  const mongoUser = await MockUser.findOne({ mockUserClerkId: userClerkId });
  if (!mongoUser) {
    return NextResponse.json(
      { message: "User not found in DB" },
      { status: 404 }
    );
  }

  const deleted = await JoinedStudent.findOneAndDelete({
    studentId: mongoUser._id,
    sessionId,
  });

  if (!deleted) {
    return NextResponse.json(
      { message: "Not found or not joined" },
      { status: 404 }
    );
  }

  const removedStudentFromDB = await Session.findByIdAndUpdate(
    sessionId,
    { $pull: { studentCount: mongoUser._id } },
    { new: true }
  );

  return NextResponse.json({
    message: "Left session successfully",
    data: removedStudentFromDB,
  });
}
