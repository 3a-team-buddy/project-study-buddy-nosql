import Ably from "ably";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Session } from "@/lib/models/Session";
import { checkAuth } from "../../check-create-user/route";
import { MockUser } from "@/lib/models/MockUser";
import { JoinedStudent } from "@/lib/models/JoinedStudent";
import { SelectedTutor } from "@/lib/models/SelectedTutor";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const result = await checkAuth();

    if (!result) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { userClerkId } = result;
    const { id } = await params;

    const session = await Session.findById(id);

    if (!session) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 }
      );
    }

    const userIdFromMongo = await MockUser.findOne({
      mockUserClerkId: userClerkId,
    });

    if (!userIdFromMongo) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (session.creatorId.toString() !== userIdFromMongo._id.toString()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (session.studentCount.length >= session.minMember) {
      return NextResponse.json(
        { error: "Cannot delete: minMember reached" },
        { status: 400 }
      );
    }

    await JoinedStudent.deleteMany({ sessionId: id });
    await SelectedTutor.deleteMany({ createdSessionId: id });
    await session.deleteOne();

    const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    await ably.channels
      .get("sessions")
      .publish({ name: "session-deleted", data: { sessionId: id } });

    return NextResponse.json({ message: "Session deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
