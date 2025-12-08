import { NextRequest, NextResponse } from "next/server";
import { SelectedTutor } from "@/lib/models/SelectedTutor";
import { Session } from "@/lib/models/Session";
import connectDB from "@/lib/mongodb";
import Ably from "ably";
import { transporter } from "@/lib/mailer";
import { MockUser } from "@/lib/models/MockUser";

export async function GET(request: NextRequest) {
  await connectDB();

  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");
  const tutorId = url.searchParams.get("tutorId");
  const response = url.searchParams.get("response")?.toLowerCase();

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

  console.log({ session }, "SES");
  console.log({ tutor }, "TUT");

  if (!session || !tutor) {
    return NextResponse.json(
      { message: "Session or Tutor not found!" },
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

  console.log(tutor.invitationStatus, "TUROR INVITATION STATUS");

  if (response === "accept") {
    tutor.invitationStatus = "ACCEPTED";
    await tutor.save();

    session.status = "ACCEPTED";
    session.assignedTutor = tutor.tutorId._id;
    await session.save();

    console.log({ tutor }, "AFTER CHANGE");
    console.log({ session }, "AFTERCHANGE");

    await transporter.sendMail({
      from: "Study Buddy <oyunmyagmar.g@gmail.com>",
      to: tutor.tutorId.mockUserEmail,
      subject: "Tutor Assignment Confirmed",
      html: `<p>You have accepted the session!</p>
      <p>Students have been notified.</p>`,
    });

    const students = await MockUser.find(
      { _id: { $in: session.studentCount } },
      "mockUserEmail"
    );
    console.log({ students }, "SESSION STUDENT COUNT");

    await Promise.all(
      students.map((student) =>
        transporter.sendMail({
          from: "Study Buddy <oyunmyagmar.g@gmail.com>",
          to: student.mockUserEmail,
          subject: "Your Session is Confrimed",
          html: `<p>Your session has been confirmed and a tutor accepted.</p>`,
        })
      )
    );

    const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    await ably.channels.get("session").publish("session-updated", session);

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/accepted`
    );
  }

  tutor.invitationStatus = "DECLINED";
  try {
    await tutor.save();
    console.log("Tutor updated OK");
  } catch (error) {
    console.error("Tutor update failed!", error);
  }

  const nextTutorResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/send-next-tutor-gmail`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    }
  );

  const nextTutorResult = await nextTutorResponse.json();

  if (nextTutorResult.noTutorsRemaining) {
    const creator = await MockUser.findById(session.creatorId, "mockUserEmail");

    await transporter.sendMail({
      from: "Study Buddy <oyunmyagmar.g@gmail.com>",
      to: creator.mockUserEmail,
      subject: "All Tutors Declined Your Session",
      html: `<p>All tutors declined your session.</p>
      <p>Choose an option:</p>
      <a href="${process.env.NEXT_PUBLIC_BASE_URL}/api/creator-response?sessionId=${session._id}&action=delete">Delete Session</a>
      <a href="${process.env.NEXT_PUBLIC_BASE_URL}/api/creator-response?sessionId=${session._id}&action=self">Covert to Self-Led Session</a>
`,
    });
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/thank-you`
  );
}
