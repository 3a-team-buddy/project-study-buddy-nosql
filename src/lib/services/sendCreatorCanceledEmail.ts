import { CreateSessionType } from "../types";
import { transporter } from "../mailer";
import { getJoinedStudents } from "./getJoinedStudents";

export async function sendCreatorCanceledEmail(session: CreateSessionType) {
  const joinedStudents = await getJoinedStudents(session);

  await Promise.all(
    joinedStudents.map((student) =>
      transporter.sendMail({
        from: "Study Buddy <oyunmyagmar.g@gmail.com>",
        to: student.mockUserEmail,
        subject: "Session Cancelled",
        html: `
            <div style="padding: 20px; line-height: 1.6; color: #333;">
            
            <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #0275d8; margin: 0;">📘 Study Buddy</h2>
            <p style="margin: 0; font-size: 12px; color: #555;">Together • Learn • Leap</p>
            </div>
    
            <h3 style="color: #750000;">Session Cancelled</h3>
            
            <p>
            Unfortunately, your joined session<br/> 
            <strong>"${session.sessionTopicTitle}"</strong> scheduled 
            on <strong>${session.value}</strong> 
            at <strong>${session.time}</strong> 
            in <strong>class#${session.room}</strong> has been <strong>cancelled</strong>.
            </p>
            
            <p style="color: #555;">
            You’re welcome to join another available session or create a new one.
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
  return true;
}
