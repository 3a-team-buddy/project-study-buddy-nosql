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
  // console.log({ session }, "SESSSSSION");

  const nextTutor = await SelectedTutor.findOne({
    createdSessionId: sessionId,
    invitationStatus: "WAITING",
  })
    .populate("tutorId")
    .sort({ order: 1 });

  // console.log({ nextTutor }, "NEXTNEXTTUTOR");

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
    subject: "Tutor Invitation - Study Buddy",
    html: `
  <div style="padding: 20px; padding-top: 0px; line-height: 1.5; color: #333; display: flex; flex-direction: column; gap: 20px;">

    <h3>Tutor Invitation - Study Buddy</h3>

    <!-- Hello + Intro -->
    <div style="display: flex; flex-direction: column; gap: 4px;">
      <p>Hello, </p>
      <p>You have been invited to be a Tutor for the following study session:</p>
    </div>

    <!-- Session Details -->
    <div style="display: flex; flex-direction: column; gap: 4px;">
      <p><strong>Session title:</strong> ${session.sessionTopicTitle}</p>
      <p><strong>Description:</strong> ${session.description}</p>
      <p><strong>Date:</strong> ${session.value}</p>
      <p><strong>Time:</strong> ${session.time}</p>
      <p><strong>Joined students:</strong> ${session.studentCount?.length} / ${session.maxMember}</p>
    </div>

    <!-- Action Section -->
    <div style="display: flex; flex-direction: column; gap: 4px;">
      <p>Please select an option below:</p>

      <!-- Buttons with justify-between -->
      <div style="display: flex; justify-content: space-between;">
        <a href="${accept}" 
          style="background: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px;">
          Accept
        </a>

        <a href="${decline}" 
          style="background: #d9534f; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px;">
          Decline
        </a>
      </div>
    </div>

    <p>Thank you,<br/>Study Buddy Team</p>

  </div>
  `,
  });
  // await transporter.sendMail({
  //   from: "Study Buddy <oyunmyagmar.g@gmail.com>",
  //   to: nextTutor.tutorId.mockUserEmail,
  //   subject: "Tutor Invitation - Study Buddy",
  //   html: `
  //   <div style="padding: 20px; padding-top: 0px; line-height: 1.5; color: #333;">
  //   <h3>Tutor Invitation - Study Buddy</h3>

  //   <p>Hello, </p>

  //   <p>You have been invited to be a Tutor for the following study session:</p>

  //   <p><strong>Session title:</strong> ${session.sessionTopicTitle}</p>
  //   <p><strong>Description:</strong> ${session.description}</p>
  //   <p><strong>Date:</strong> ${session.value}</p>
  //   <p><strong>Time:</strong> ${session.time}</p>
  //   <p><strong>Joined students:</strong> ${session.studentCount?.length} / ${session.maxMember}</p>

  //   <p>Please select an option below:</p>

  //   <div style="margin-top: 20px;">
  //   <a href="${accept}" style="background: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; margin-right: 10px;">Accept</a>
  //   <a href="${decline}" style="background: #d9534f; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px;">Decline</a>
  //   </div>

  //   <p style="margin-top: 25px;">Thank you, <br/>Study Buddy Team</p>
  // </div>
  //   `,
  // });

  nextTutor.invitationStatus = "SEND";
  await nextTutor.save();

  return NextResponse.json({ success: true });
}
