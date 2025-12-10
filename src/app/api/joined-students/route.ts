import { NextRequest, NextResponse } from "next/server";
import { createJoinedStudent } from "@/lib/services/joined-students-service";
import Ably from "ably";
import { checkAuth } from "../check-create-user/route";
import connectDB from "@/lib/mongodb";
import { MockUser } from "@/lib/models/MockUser";
import { sendNextTutorInviteEmail } from "@/lib/services/sendNextTutorInviteEmail";
import { sendJoinedStudentsNotifySelfEmail } from "@/lib/services/sendJoinedStudentsNotifySelfEmail";

export async function POST(request: NextRequest) {
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
    const userId = user?._id;

    const { sessionId } = await request.json();

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
    const minMem = updatedSession.minMem;
    console.log({ updatedCount });
    console.log({ minMem });

    if (updatedCount === minMem) {
      const type = updatedSession.selectedSessionType?.toLowerCase();

      if (type === "tutor-led") {
        await sendNextTutorInviteEmail(updatedSession);
      }

      if (type === "self-led") {
        await sendJoinedStudentsNotifySelfEmail(updatedSession);
      }
    }

    const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    await ably.channels.get("sessions").publish("session-joined", {
      sessionId,
      userId: userId.toString(),
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
