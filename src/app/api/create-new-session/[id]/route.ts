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

// export const DELETE = async (
//   req: NextResponse,
//   params: { params: { id: string } }
// ) => {
//   await connectDB();

//   const result = await checkAuth();
//   if (!result) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const { userClerkId } = result;
//   const { params: sessionId } = params;
//   console.log({ userClerkId });

//   //   let leaveSessionStudent = await JoinedStudent.findOne({
//   //     studentIdClerk: userClerkId,
//   //   });

//   const deleted = await JoinedStudent.findOneAndDelete({
//     studentIdClerk: userClerkId,
//     sessionId: sessionId,
//   });

//   if (!deleted) {
//     return NextResponse.json(
//       { message: "No joined session found to delete." },
//       { status: 404 }
//     );
//   }

//   return NextResponse.json({
//     message: "Left session successfully",
//     data: deleted,
//   });
// };

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   await connectDB();

//   const auth = await checkAuth();
//   if (!auth)
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//   const { userClerkId } = auth;
//   const sessionId = params.id;

//   console.log({ sessionId });

//   const deleted = await JoinedStudent.findOneAndDelete({
//     studentIdClerk: userClerkId,
//     sessionId: sessionId,
//   });

//   if (!deleted) {
//     return NextResponse.json(
//       { message: "Not found or not joined" },
//       { status: 404 }
//     );
//   }

//   return NextResponse.json({
//     message: "Left session successfully",
//     data: deleted,
//   });
// }

// export async function DELETE(
//   req: NextRequest,
//   context: { params: { id: string } } // params is an object
// ) {
//   await connectDB();

//   const auth = await checkAuth();
//   if (!auth)
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

//   const { userClerkId } = auth;

//   // Get sessionId from params
//   const sessionId = new mongoose.Types.ObjectId(context.params.id);

//   // Find Mongo user by Clerk ID
//   const mongoUser = await MockUser.findOne({ clerkid: userClerkId });

//   if (!mongoUser) {
//     return NextResponse.json(
//       { message: "User not found in DB" },
//       { status: 404 }
//     );
//   }

//   // Delete joined session
//   const deleted = await JoinedStudent.findOneAndDelete({
//     studentId: mongoUser._id,
//     sessionId: sessionId,
//   });

//   if (!deleted) {
//     return NextResponse.json(
//       { message: "Not found or not joined" },
//       { status: 404 }
//     );
//   }

//   return NextResponse.json({
//     message: "Left session successfully",
//     data: deleted,
//   });
// }

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const auth = await checkAuth();
  if (!auth)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { userClerkId } = auth;

  const { id: sessionIdString } = await context.params;

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
