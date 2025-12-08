import { transporter } from "@/lib/mailer";
import { JoinedStudent } from "@/lib/models/JoinedStudent";
import { MockUser } from "@/lib/models/MockUser";
import { Session } from "@/lib/models/Session";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();

  const { sessionId } = await request.json();

  if (!sessionId) {
    return NextResponse.json({ message: "Missing sessionId" }, { status: 400 });
  }

  const session = await Session.findById(sessionId);
  if (!session) {
    return NextResponse.json({ message: "Session not found" }, { status: 404 });
  }
  console.log({ session }, "send joined students mail SESSION");

  const joinedStudents = await JoinedStudent.find({ sessionId }).select(
    "studentId"
  );

  if (!joinedStudents.length) {
    return NextResponse.json({ message: "No students to inform by email" });
  }

  const studentIds = joinedStudents.map((s) => s.studentId);

  const students = await MockUser.find(
    { _id: { $in: studentIds } },
    "mockUserEmail"
  );

  console.log({ students }, "mailllllllll");

  await Promise.all(
    students.map((student) =>
      transporter.sendMail({
        from: "Study Buddy <oyunmyagmar.g@gmail.com>",
        to: student.mockUserEmail,
        subject: `Session Confirmation: ${session.sessionTopicTitle}`,
        html: `
          <h2>Study Buddy Information</h2>
          <p>Session: <strong>${session.sessionTopicTitle}</strong></p>
          <p>Date: <strong>${session.value}</strong></p>
          <p>Time: <strong>${session.time}</strong></p>
          <p>Your joined session is confirmed.</p>
        `,
      })
    )
  );

  return NextResponse.json({ success: true, message: "Emails sent" });
}
