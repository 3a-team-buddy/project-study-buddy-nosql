import { transporter } from "@/lib/mailer";
import { SelectedTutor } from "@/lib/models/SelectedTutor";
import { Session } from "@/lib/models/Session";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();

  const { sessionId } = await request.json();

  const session = await Session.findById({ _id: sessionId });

  const nextTutor = await SelectedTutor.findOne({
    createdSessionId: sessionId,
    invitationStatus: "WAITING",
  })
    .populate("tutorId")
    .sort({ order: 1 });

  if (!nextTutor) {
    return NextResponse.json({
      message: "No more tutors to email",
      noTutorsRemaining: true,
    });
  }

  const accept = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutor-response?sessionId=${sessionId}&tutorId=${nextTutor._id}&response=accept`;
  const decline = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutor-response?sessionId=${sessionId}&tutorId=${nextTutor._id}&response=decline`;

  await transporter.sendMail({
    from: `"Study Buddy" ${process.env.EMAIL_USER}`,
    to: nextTutor.tutorId.mockUserEmail,
    subject: "Tutor Invitation",
    html: `
    <h2>Study Buddy Tutor Invitation</h2>
    <p>Session: <strong>${session.sessionTopicTitle}</strong></p>
    <p>Date: <strong>${session.value}</strong></p>
    <p>Time: <strong>${session.time}</strong></p>
    <p>Please select an option:</p>
    <a href="${accept}">ACCEPT</a>
    <a href="${decline}">DECLINE</a>
    `,
  });

  nextTutor.invitationStatus = "SEND";
  await nextTutor.save();

  return NextResponse.json({ success: true });
}
