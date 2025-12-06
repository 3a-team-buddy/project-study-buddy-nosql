import { Session } from "@/lib/models/Session";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  connectDB();

  const { searchParams } = await new URL(request.url);
  const sessionId = searchParams.get("sessionId");
  const action = searchParams.get("action");

  const session = await Session.findById({ _id: sessionId });

  if (action === "delete") {
    session.status = "declined";
    await session.deleteOne();
    //notify students
    //send cancellation mails
  }

  if (action === "self") {
    session.type = "self-led";
    session.status = "accepted";
    await session.save();

    //notify students
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/creator/done`
  );
}
