import { transporter } from "../mailer";
import { CreateSessionType } from "../types";

export async function sendCreatorAllTutorsDeclinedEmail(
  updatedSession: CreateSessionType,
  creator: { mockUserEmail: string }
) {
  const cancel = `${process.env.NEXT_PUBLIC_BASE_URL}/api/creator-email-response?sessionId=${updatedSession._id}&action=cancel `;
  const self = `${process.env.NEXT_PUBLIC_BASE_URL}/api/creator-email-response?sessionId=${updatedSession._id}&action=self`;

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
      <strong>"${updatedSession.sessionTopicTitle}"</strong> scheduled on <strong>${updatedSession.value}</strong> at <strong>${updatedSession.time}</strong>.
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
