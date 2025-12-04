import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Session } from "@/lib/models/Session";
import { checkAuth } from "../../check-create-user/route";
import { MockUser } from "@/lib/models/MockUser";

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

    const creator = await MockUser.findOne(
      {
        mockUserClerkId: userClerkId,
      },
      "_id"
    );
    const creatorId = creator._id;

    const { id } = await params;

    const session = await Session.findById(id);

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (session.creatorId !== creatorId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (session.joinedStudents.length >= session.minMember) {
      return NextResponse.json(
        { error: "Cannot delete: minMember reached" },
        { status: 400 }
      );
    }

    await session.deleteOne();

    return NextResponse.json({ message: "Session deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
