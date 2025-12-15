import { NextRequest, NextResponse } from "next/server";
import { createJoinedStudent } from "@/lib/services/joined-students-service";
import Ably from "ably";
import connectDB from "@/lib/mongodb";
import { MockUser } from "@/lib/models/MockUser";
import { sendNextTutorInviteEmail } from "@/lib/services/sendNextTutorInviteEmail";
import { sendJoinedStudentsNotifySelfEmail } from "@/lib/services/sendJoinedStudentsNotifySelfEmail";
import { checkAuth } from "../../check-create-user/route";
import { Session } from "@/lib/models/Session";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    await connectDB();

    const result = await checkAuth();
    if (!result) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { userClerkId } = result;
    const user = await MockUser.findOne(
      {
        mockUserClerkId: userClerkId,
      },
      "_id"
    );

    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    const userId = user?._id;

    const { sessionId } = await params;

    if (!sessionId) {
      return NextResponse.json(
        { message: "SessionId required!" },
        { status: 404 }
      );
    }

    const { updatedSession } = await createJoinedStudent(userId, sessionId);

    if (!updatedSession) {
      return NextResponse.json(
        { message: "Failed to join the session!" },
        { status: 500 }
      );
    }

    const updatedCount = updatedSession.studentCount.length;
    const minMem = updatedSession.minMember;

    if (updatedCount === minMem) {
      const type = updatedSession.selectedSessionType?.toLowerCase();

      if (type === "tutor-led") {
        await sendNextTutorInviteEmail(updatedSession);
      }

      if (type === "self-led") {
        await Session.findByIdAndUpdate(updatedSession._id, {
          status: "ACCEPTED",
        });
        await sendJoinedStudentsNotifySelfEmail(updatedSession);
      }
    }

    const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    await ably.channels.get("sessions").publish({
      name: "session-joined",
      data: {
        sessionId,
        userId: userId.toString(),
      },
    });

    return NextResponse.json(
      { updatedSession, message: "Joined successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while joining the session!", error);
    return NextResponse.json(
      {
        message: "Unable to join session due to a server error!",
        error,
      },
      { status: 500 }
    );
  }
}
