import { CreateSessionType } from "../types";
import { transporter } from "../mailer";
import { getJoinedStudents } from "./getJoinedStudents";

export async function sendCreatorSelfLedEmail(session: CreateSessionType) {
  const joinedStudents = await getJoinedStudents(session);

  await Promise.all(
    joinedStudents.map((student) =>
      transporter.sendMail({
        from: "Study Buddy <oyunmyagmar.g@gmail.com>",
        to: student.mockUserEmail,
        subject: "Session Changed To SELF-LED",
        html: `
            <div style="padding: 20px; line-height: 1.6; color: #333;">
            
            <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #0275d8; margin: 0;">📘 Study Buddy</h2>
            <p style="margin: 0; font-size: 12px; color: #555;">Together • Learn • Leap</p>
            </div>
    
            <h3 style="color: #A31B00;">Session Changed To SELF-LED</h3>
            
            <p>
            Your session has been changed to <strong>SELF-LED</strong>.
            </p>
  
            <p style="margin: 0;">
            <strong>Session Details:</strong><br/>
            <strong>Topic:</strong> ${session.sessionTopicTitle}<br/>
            <strong>Study Content:</strong> ${session.description}<br/>
            📅 <strong>Date:</strong> ${session.value}<br/>
            ⏰ <strong>Starts At:</strong> ${session.time}<br/>
            👥 <strong>Joined Students:</strong> ${session.studentCount?.length}+
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
}
