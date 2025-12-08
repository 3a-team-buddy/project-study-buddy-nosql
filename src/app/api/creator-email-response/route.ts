import { transporter } from "@/lib/mailer";
import { MockUser } from "@/lib/models/MockUser";
import { Session } from "@/lib/models/Session";
import connectDB from "@/lib/mongodb";
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
  const students = await MockUser.find(
    {
      _id: { $in: session.studentCount },
    },
    "mockerUserEmail"
  );

  if (!session) {
    return NextResponse.json(
      { message: "Session not found"! },
      { status: 404 }
    );
  }

  if (action === "cancel") {
    session.status = "CANCELED";
    await session.save();

    await Promise.all(
      students.map((student) =>
        transporter.sendMail({
          from: "Study Buddy <oyunmyagmar.g@gmail.com>",
          to: student.mockUserEmail,
          subject: "Session Cancellation",
          html: `
          <p>Your session has been cancelled.</p>`,
        })
      )
    );

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/creator/canceled`
    );
  }

  if (action === "self") {
    session.selectedSessionType = "SELF-LED";
    session.status = "ACCEPTED";
    await session.save();

    await Promise.all(
      students.map((student) =>
        transporter.sendMail({
          from: "Study Buddy <oyunmyagmar.g@gmail.com>",
          to: student.mockerUserEmail,
          subject: "Session Type Changed",
          html: `
          <p>Your session type has been changed to SELF-LED</p>`,
        })
      )
    );
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/creator/self-led`
  );
}
