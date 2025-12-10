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
      subject: "Tutor Decline Notice",
      html: `
      <div style="padding: 20px; line-height: 1.6; color: #333;">

      <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="color: #0275d8; margin:0;">📘Study Buddy</h2>
      <p style="margin: 0; font-size: 12px; color: #555;">Together * Learn * Leap</p>
      </div>

      <h3>All Tutors Declined Your Session!</h3>
      
      <p>
      Unfortunately, all invited tutors have declined your request for the session:<br/><strong>"${session.sessionTopicTitle}".</strong><br/>
      Please choose how you would like to proceed.
      </p>

      
      <div style="margin-top: 40px;">
      <p><strong>Select an option below:</strong></p>
      <div>
      <a href="${cancel}" style="background: #d9534f; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; margin-right: 10px;">Cancel</a> 
      <a href="${self}" style="background: #0275d8; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px;">Self-Led</a>
      </div>
      </div>
      
      
      <p style="margin-top: 60px; color: #555">
      Thank you,<br/>
      <strong style="text-align: center;">Buddy-Buddy Team</strong>
      </p>

     </div>
     `,
    });
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/thank-you`
  );
}
