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

  const session = await Session.findById(sessionId).populate("assignedTutor");
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
          subject: "Session Confirmation",
          html: `
          <div style="padding: 20px; line-height: 1.6; color: #333;">

          <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #0275d8; margin: 0;">📘Study Buddy</h2>
          <p style="margin: 0; font-size: 12px; color: #555;">Together • Learn • Leap</p>
          </div>

          <h3 style="color: #004700;">Session Confirmed</h3>

          <p>
          Great news!<br/> 
          Your joined session
          <strong>"${session.sessionTopicTitle}"</strong> has been <strong>confirmed</strong>.
          </p>
          
          <p style="margin: 0;">
          <strong>Session Details:</strong><br/>
          <strong>Topic:</strong> ${session.sessionTopicTitle}<br/>
          <strong>Study Content:</strong> ${session.description}<br/>
          📅 <strong>Date:</strong> ${session.value}<br/>
          ⏰ <strong>Starts At:</strong> ${session.time}<br/>
          👥 <strong>Joined Students:</strong> ${session.studentCount?.length}+<br/>
          🎓 <strong>Tutor:</strong> ${tutor.tutorId.mockUserEmail}
          </p>

          <p style="margin-top: 80px; color: #555;">
          Thank you,<br/>
          <strong>Buddy-Buddy Team</strong>
          </p>

        </div>
        `,
        })
      )
    );

    await transporter.sendMail({
      from: "Study Buddy <oyunmyagmar.g@gmail.com>",
      to: tutor.tutorId.mockUserEmail,
      subject: "Tutor Assignment Confirmation",
      html: `
      <div style="padding: 20px; line-height: 1.6; color: #333;">
      
      <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="color: #0275d8; margin: 0;">📘 Study Buddy</h2>
      <p style="margin: 0; font-size: 12px; color: #555;">Together • Learn • Leap</p>
      </div>

      <h3 style="color: #004700;">Tutor Assignment Confirmation</h3>

      <p>
      You have <strong>accepted</strong> to tutor study session
      <strong>"${session.sessionTopicTitle}"</strong> scheduled on <strong>${session.value}</strong> at <strong>${session.time}.</strong><br/>
      All joined students have been notified.
      </p>

      <p style="margin-top: 80px; color: #555;">
      Thank you,<br/>
      <strong>Buddy-Buddy Team</strong>
      </p>

    </div>
   `,
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
      subject: "Tutor Declined",
      html: `
      <div style="padding: 20px; line-height: 1.6; color: #333;">

      <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="color: #0275d8; margin: 0;">📘Study Buddy</h2>
      <p style="margin: 0; font-size: 12px; color: #555;">Together • Learn • Leap</p>
      </div>

      <h3 style="color: #750000;">All Tutors Declined</h3>
      
      <p>
      Unfortunately,<br/> 
      All invited tutors have <strong>declined</strong> your request for the session 
      <strong>"${session.sessionTopicTitle}"</strong> scheduled on <strong>${session.value}</strong> at <strong>${session.time}</strong>.
      </p>

      <div style="margin-top: 40px;">
      <p>Please choose how you would like to proceed the session:</p>
      <div>
      <a href="${cancel}" style="background: #d9534f; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; margin-right: 10px;">
      <strong>Cancel</strong>
      </a> 

      <a href="${self}" style="background: #0275d8; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px;">
      <strong>Self-Led</strong>
      </a>
      </div>
      </div>
      
      <p style="margin-top: 80px; color: #555">
      Thank you,<br/>
      <strong>Buddy-Buddy Team</strong>
      </p>
      
      </div>
     `,
    });
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/thank-you`
  );
}
