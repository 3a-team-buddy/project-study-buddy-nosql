import { transporter } from "../mailer";
import { SelectedTutor } from "../models/SelectedTutor";
import { Session } from "../models/Session";
import { CreateSessionType } from "../types";

export async function sendNextTutorInviteEmail(
  updatedSession: CreateSessionType
) {
  const nextTutor = await SelectedTutor.findOne({
    createdSessionId: updatedSession._id,
    invitationStatus: "WAITING",
  })
    .populate("tutorId")
    .sort({ order: 1 });

  if (!nextTutor) return;

  const sessionReward = await Session.findById(updatedSession._id);
  if (!sessionReward) return;

  const accept = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/api/tutor-email-response?sessionId=${encodeURIComponent(
    updatedSession._id
  )}&tutorId=${encodeURIComponent(nextTutor._id)}&response=accept`;
  const decline = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/api/tutor-email-response?sessionId=${encodeURIComponent(
    updatedSession._id
  )}&tutorId=${encodeURIComponent(nextTutor._id)}&response=decline`;

  console.log("reward in function:", updatedSession.selectedReward);

  await transporter.sendMail({
    from: "Study Buddy <oyunmyagmar.g@gmail.com>",
    to: nextTutor.tutorId?.mockUserEmail,
    subject: "Tutor Invitation",
    html: `
    <div style="padding: 20px; line-height: 1.6; color: #333;">
    
    <div style="text-align: center; margin-bottom: 20px;">
    <h2 style="color: #0275d8; margin: 0;">📘Study Buddy</h2>
    <p style="margin: 0; font-size: 12px; color: #555;">Together • Learn • Leap</p>
    </div>

    <h3>Tutor Invitation</h3>

    <p>You have been invited to tutor the following study session:</p>

    <p style="margin: 0;">
    <strong>Topic:</strong> ${updatedSession.sessionTopicTitle}<br/>
    <strong>Study Content:</strong> ${updatedSession.description}<br/>
    📅 <strong>Date:</strong> ${updatedSession.value}<br/>
    ⏰ <strong>Starts At:</strong> ${updatedSession.time}<br/>
    👥 <strong>Joined Students:</strong> ${updatedSession.studentCount?.length}+
    🎁 <strong>Reward:</strong> ${sessionReward.selectedReward}
    </p>

    <div style="margin-top: 40px;">
    <p>Please kindly choose one of the options below:</p>
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

  nextTutor.invitationStatus = "SENT";
  await nextTutor.save();
  return true;
}
