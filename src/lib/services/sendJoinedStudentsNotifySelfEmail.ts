import mongoose from "mongoose";
import { MockUser } from "../models/MockUser";
import { CreateSessionType } from "../types";
import { transporter } from "../mailer";

export async function sendJoinedStudentsNotifySelfEmail(
  updatedSession: CreateSessionType
) {
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
        subject: `Session Confirmation: ${updatedSession.sessionTopicTitle}`,
        html: `
          <h2>Study Buddy Information</h2>
          <p>Session: <strong>${updatedSession.sessionTopicTitle}</strong></p>
          <p>Date: <strong>${updatedSession.value}</strong></p>
          <p>Time: <strong>${updatedSession.time}</strong></p>
          <p>Your joined session is confirmed.</p>
        `,
      })
    )
  );
}
