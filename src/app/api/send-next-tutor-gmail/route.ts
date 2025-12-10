import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/lib/mailer";
import { SelectedTutor } from "@/lib/models/SelectedTutor";
import { Session } from "@/lib/models/Session";
import connectDB from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  await connectDB();

  const { sessionId } = await request.json();

  if (!sessionId) {
    return NextResponse.json(
      { message: "SessionId required" },
      { status: 400 }
    );
  }

  const session = await Session.findById(sessionId);
  if (!session) {
    return NextResponse.json({ message: "Session not found" }, { status: 404 });
  }

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

  const accept = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutor-email-response?sessionId=${sessionId}&tutorId=${nextTutor._id}&response=accept`;
  const decline = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutor-email-response?sessionId=${sessionId}&tutorId=${nextTutor._id}&response=decline`;

  await transporter.sendMail({
    from: "Study Buddy <oyunmyagmar.g@gmail.com>",
    to: nextTutor.tutorId.mockUserEmail,
    subject: "Tutor Invitation Notice",
    html: `
    <div style="padding: 20px; line-height: 1.6; color: #333;">
    
    <div style="text-align: center; margin-bottom: 20px;">
    <h2 style="color: #0275d8; margin: 0;">📘Study Buddy</h2>
    <p style="margin: 0; font-size: 12px; color: #555;">Together • Learn • Leap</p>
    </div>

    <h3>Tutor Invitation</h3>

    <p>You have been invited to tutor the following session:</p>

    <p style="margin: 0;">
    <strong>Topic:</strong> ${session.sessionTopicTitle}<br/>
    <strong>Study Content:</strong> ${session.description}<br/>
    📅 <strong>Date:</strong> ${session.value}<br/>
    ⏰ <strong>Starts At:</strong> ${session.time}<br/>
    👥 <strong>Joined Students:</strong> ${session.studentCount?.length}/${session.maxMember}
    </p>

    <div style="margin-top: 40px;">
    <p>Please choose an option below:</p>
    <div> 
    <a href="${accept}" style="background: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; margin-right: 10px;">
    <strong>Accept</strong> 
    </a> 
    
    <a href="${decline}" style="background: #d9534f; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px;">
    <strong>Decline</strong> 
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

  nextTutor.invitationStatus = "SEND";
  await nextTutor.save();

  return NextResponse.json({ success: true });
}
