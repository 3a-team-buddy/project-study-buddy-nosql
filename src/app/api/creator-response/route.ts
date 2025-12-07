import { Session } from "@/lib/models/Session";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await connectDB();

  const { searchParams } = await new URL(request.url);
  const sessionId = searchParams.get("sessionId");
  const action = searchParams.get("action");

  if (!sessionId || !action) {
    return NextResponse.json(
      { message: "Missing sessionId or action" },
      { status: 400 }
    );
  }

  const session = await Session.findById(sessionId);

  if (!session) {
    return NextResponse.json({ message: "Session not found" }, { status: 404 });
  }

  if (action === "delete") {
    session.status = "DECLINED";
    await session.deleteOne();
    //notify students
    //send cancellation mails
  }

  if (action === "self") {
    session.selectedSessionType = "SELF-LED";
    session.status = "ACCEPTED";
    await session.save();

    //notify students
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/creator/done`
  );
}
