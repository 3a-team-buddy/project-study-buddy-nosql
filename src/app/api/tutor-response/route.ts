import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import { SelectedTutor } from "@/lib/models/SelectedTutor";
import { Session } from "@/lib/models/Session";
import connectDB from "@/lib/mongodb";
import Ably from "ably";

export async function GET(request: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");
  const tutorId = searchParams.get("tutorId");
  const response = searchParams.get("response");

  const session = await Session.findById({ _id: sessionId });
  const tutor = await SelectedTutor.findById(tutorId).populate("tutorId");

  tutor.invitationStatus = response?.toUpperCase();
  await tutor.save();

  if (response === "accept") {
    session.status = "accepted";
    session.assignedTutor = tutor.tutorId._id;
    await session.save();

    await sendEmail({
      to: tutor.tutorId.mockUserEmail,
      subject: "Tutor Assignment Confirmed",
      html: `<p>You have accepted the session!</p>`,
    });

    for (let studentId of session.studentCount) {
      // find student email (do your MockUser lookup)
      // sendEmail({to: studentEmail, subject: "Session Confirmed", html: "..."})
    }

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
    const creatorEmail = "FIND_CREATOR_EMAIL";
    await sendEmail({
      to: creatorEmail,
      subject: "All Tutors Declined",
      html: `<p>All tutors declined your session. Choose:</p>
      <a href="${process.env.NEXT_BASE_URL}/api/creator-response?sessionId=${session._id}&action=delete">Delete Session</a>
      <br/>
      <a href="${process.env.NEXT_BASE_URL}/api/creator-response?sessionId=${session._id}&action=self">Covert to Self-led Session</a>
`,
    });
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/thank-you`
  );
}
