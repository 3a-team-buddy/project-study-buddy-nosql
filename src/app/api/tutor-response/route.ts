import { NextRequest, NextResponse } from "next/server";
import { SelectedTutor } from "@/lib/models/SelectedTutor";
import { Session } from "@/lib/models/Session";
import connectDB from "@/lib/mongodb";
import Ably from "ably";
import { transporter } from "@/lib/mailer";
import { MockUser } from "@/lib/models/MockUser";

export async function GET(request: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");
  const tutorId = searchParams.get("tutorId");
  const response = searchParams.get("response");

  console.log({ sessionId }, "SESSION ID ");
  console.log({ tutorId }, "TUTOR ID");
  console.log({ response }, "TUROR RESPONSE");

  if (!sessionId || !tutorId || !response) {
    return NextResponse.json(
      { message: "Missing parameters!" },
      { status: 400 }
    );
  }
  const session = await Session.findById(sessionId);
  const tutor = await SelectedTutor.findById(tutorId).populate("tutorId");

  if (!session || !tutor) {
    return NextResponse.json(
      { message: "Session or tutor not found!" },
      { status: 404 }
    );
  }

  if (tutor.invitationStatus === "ACCEPTED") {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/accepted`
    );
  }

  if (tutor.invitationStatus === "DECLINED") {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/thank-you`
    );
  }

  tutor.invitationStatus =
    response?.toUpperCase() === "ACCEPTED" ? "ACCEPTED" : "DECLINED";
  await tutor.save();

  console.log(tutor.invitationStatus, "TUROR INVITATION STATUS");

  if (response === "accept") {
    session.status = "ACCEPTED";
    session.assignedTutor = tutor.tutorId._id;
    await session.save();

    await transporter.sendMail({
      from: `"Study Buddy" ${process.env.EMAIL_USER}`,
      to: tutor.tutorId.mockUserEmail,
      subject: "Tutor Assignment Confirmed",
      html: `<p>You have accepted the session!</p>`,
    });

    const students = await MockUser.find(
      { _id: { $in: session.studentCount } },
      "mockUserEmail"
    );
    console.log({ students }, "SESSION STUDENT COUNT");

    await Promise.all(
      students.map((student) =>
        transporter.sendMail({
          from: `"Study Buddy" ${process.env.EMAIL_USER}`,
          to: student.mockUserEmail,
          subject: "Session Confrimed",
          html: `<p>Your session has been confirmed</p>`,
        })
      )
    );

    const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    await ably.channels.get("session").publish("session-updated", session);

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/accepted`
    );
  }

  const nextResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/send-next-tutor-email`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    }
  );

  const result = await nextResponse.json();

  if (result.noTutorsRemaining) {
    const creatorEmail = await MockUser.findById(
      session.creatorId,
      "mockUserEmail"
    );

    await transporter.sendMail({
      from: `"Study Buddy" ${process.env.EMAIL_USER}`,
      to: creatorEmail,
      subject: "All Tutors Declined",
      html: `<p>All tutors declined your session. Choose:</p>
      <a href="${process.env.NEXT_PUBLIC_BASE_URL}/api/creator-response?sessionId=${session._id}&action=delete">Delete Session</a>
      <br/>
      <a href="${process.env.NEXT_PUBLIC_BASE_URL}/api/creator-response?sessionId=${session._id}&action=self">Covert to Self-led Session</a>
`,
    });
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/thank-you`
  );
}
