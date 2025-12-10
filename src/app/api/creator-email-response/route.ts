import { Session } from "@/lib/models/Session";
import connectDB from "@/lib/mongodb";
import { sendCreatorCanceledEmail } from "@/lib/services/sendCreatorCanceledEmail";
import { sendCreatorSelfLedEmail } from "@/lib/services/sendCreatorSelfLedEmail";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await connectDB();

  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");
  const action = url.searchParams.get("action")?.toLowerCase();

  if (!sessionId || !action) {
    return NextResponse.json(
      { message: "Missing parameters!" },
      { status: 400 }
    );
  }

  const session = await Session.findById(sessionId);

  if (!session) {
    return NextResponse.json(
      { message: "Session not found!" },
      { status: 404 }
    );
  }

  if (action === "cancel") {
    session.status = "CANCELED";
    await session.save();

    await sendCreatorCanceledEmail(session);

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/creator/canceled`
    );
  }

  if (action === "self") {
    session.selectedSessionType = "SELF-LED";
    session.status = "ACCEPTED";
    await session.save();

    await sendCreatorSelfLedEmail(session);

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/creator/self-led`
    );
  }

  return NextResponse.json({ message: "" });
}
