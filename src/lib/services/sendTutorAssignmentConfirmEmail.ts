import { error } from "console";
import { transporter } from "../mailer";
import { CreateSessionType, SelectedTutorPopulatedType } from "../types";

export async function sendTutorAssignmentConfirmEmail(
  updatedSession: CreateSessionType,
  tutor: SelectedTutorPopulatedType
) {
  if (!tutor?.tutorId?.mockUserEmail) {
    console.error("Tutor email missing", error);
    return;
  }

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
          <strong>"${updatedSession.sessionTopicTitle}"</strong> scheduled
           on <strong>${updatedSession.value}</strong>
            at <strong>${updatedSession.time}</strong>
             in <strong>class#${updatedSession.room}</strong>.<br/>
          All joined students have been notified.
          </p>
    
          <p style="margin-top: 80px; color: #555;">
          Thank you,<br/>
          <strong>Buddy-Buddy Team</strong>
          </p>
    
        </div>
       `,
  });
}
