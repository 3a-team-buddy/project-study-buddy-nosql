import mongoose from "mongoose";
import { transporter } from "../mailer";
import { MockUser } from "../models/MockUser";
import { CreateSessionType } from "../types";

export async function sendJoinedStudentsTutorSessionConfirmEmail(
  updatedSession: CreateSessionType
) {
  const tutor = await MockUser.findById(
    updatedSession.assignedTutor?._id
  ).select("mockUserName");

  const tutorName = tutor?.mockUserName;
  const joinedStudents = await MockUser.find(
    {
      _id: {
        $in: updatedSession.studentCount?.map(
          (id) => new mongoose.Types.ObjectId(id)
        ),
      },
    },
    "mockUserEmail"
  );

  await Promise.all(
    joinedStudents.map((student) =>
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
              <strong>"${updatedSession.sessionTopicTitle}"</strong> has been <strong>confirmed</strong>.
              </p>
              
              <p style="margin: 0;">
              <strong>Session Details:</strong><br/>
              <strong>Topic:</strong> ${updatedSession.sessionTopicTitle}<br/>
              <strong>Study Content:</strong> ${updatedSession.description}<br/>
              📅 <strong>Date:</strong> ${updatedSession.value}<br/>
              ⏰ <strong>Starts At:</strong> ${updatedSession.time}<br/>
              👥 <strong>Joined Students:</strong> ${updatedSession.studentCount?.length}+<br/>
              🎓 <strong>Tutor:</strong> ${tutorName}
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
