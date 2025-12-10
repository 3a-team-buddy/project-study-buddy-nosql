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

  if (response === "accept") {
    await SelectedTutor.updateMany(
      {
        createdSessionId: sessionId,
        _id: { $ne: tutorId },
      },
      { invitationStatus: "DECLINED" }
    );

    tutor.invitationStatus = "ACCEPTED";

    await tutor.save();

    session.status = "ACCEPTED";
    session.assignedTutor = tutor.tutorId._id;
    await session.save();

    const students = await MockUser.find(
      { _id: { $in: session.studentCount } },
      "mockUserEmail"
    );

    await Promise.all(
      students.map((student) =>
        transporter.sendMail({
          from: "Study Buddy <oyunmyagmar.g@gmail.com>",
          to: student.mockUserEmail,
          subject: "Your Session is Confrimed",
          html: `
          <p>Your session has been confirmed and a tutor accepted.</p>`,
        })
      )
    );

    await transporter.sendMail({
      from: "Study Buddy <oyunmyagmar.g@gmail.com>",
      to: tutor.tutorId.mockUserEmail,
      subject: "Tutor Assignment reConfirmed",
      html: `
      <p>You have accepted the session!</p>
      <p>Students have been notified.</p>`,
    });

    // const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    // await ably.channels.get("session").publish("session-updated", session);

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/accepted`
    );
  }

  tutor.invitationStatus = "DECLINED";
  try {
    await tutor.save();
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

    const cancel = `${process.env.NEXT_PUBLIC_BASE_URL}/api/creator-email-response?sessionId=${session._id}&action=cancel `;
    const self = `${process.env.NEXT_PUBLIC_BASE_URL}/api/creator-email-response?sessionId=${session._id}&action=self`;

    await transporter.sendMail({
      from: "Study Buddy <oyunmyagmar.g@gmail.com>",
      to: creator.mockUserEmail,
      subject: "Tutor Decline Notice - Study Buddy",
      html: `
      <div style="padding: 20px; padding-top: 4px; line-height: 1.5; color: #333;">

      <h3>All tutors declined your session. Action required.</h3>
      
      <p>Hello, </p>
      
      <p>Do you want to cancel your session or change to SELF-LED session?</p>

      <p>Please select an option below:</p>
      
      <div style="margin-top: 20px;">
      <a href="${cancel}" style="background: #d9534f; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; margin-right: 10px;">Cancel Session</a> 
      <a href="${self}" style="background: #0275d8; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px;">Change to Self-Led Session</a>
      </div>
      
      <div>
      <p><strong>Session title:</strong> ${session.sessionTopicTitle}</p>
      <p><strong>Description:</strong> ${session.description}</p>
      <p><strong>Date:</strong> ${session.value}</p>
      <p><strong>Time:</strong> ${session.time}</p>
      <p><strong>Joined students:</strong> ${session.studentCount?.length}/${session.maxMember}</p>
      </div>
      
      <p style="margin-top: 25px;">Thank you, <br/>Study Buddy, Buddy-Buddy Team</p>
     </div>
     `,
    });
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/thank-you`
  );
}
