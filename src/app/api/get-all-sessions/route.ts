import connectDB from "@/lib/mongodb";
import { checkAuth } from "../check-create-user/route";
import { NextResponse } from "next/server";
import { MockUser } from "@/lib/models/MockUser";
import { Session } from "@/lib/models/Session";
import { getAllSessions } from "@/lib/services/create-session-service";
import { Rating } from "@/lib/models/Rating";

export async function GET() {
  try {
    await connectDB();

    const result = await checkAuth();

    if (!result) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { userClerkId } = result;

    const user = await MockUser.findOne(
      { mockUserClerkId: userClerkId },
      "_id"
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userId = user._id;

    new Rating();

    const createdSessions = await Session.find({ creatorId: userId })
      .populate("assignedTutor", "mockUserName")
      .populate("rating")
      .lean({ virtuals: true });

    const joinedSessions = await Session.find({
      studentCount: userId.toString(),
      creatorId: { $ne: userId },
    })
      .populate("assignedTutor", "mockUserName")
      .populate("rating")
      .lean({ virtuals: true });

    const otherSessions = await Session.find({
      creatorId: { $ne: userId },
      studentCount: { $nin: [userId.toString()] },
    })
      .populate("assignedTutor", "mockUserName")
      .populate("rating")
      .lean({ virtuals: true });

    const allSessions = await getAllSessions();

    if (!createdSessions || !joinedSessions || !otherSessions || !allSessions) {
      return NextResponse.json(
        { message: "No sessions found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: {
          createdSessions,
          joinedSessions,
          otherSessions,
          allSessions,
          userId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
