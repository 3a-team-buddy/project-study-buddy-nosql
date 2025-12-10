import { transporter } from "@/lib/mailer";
import { MockUser } from "@/lib/models/MockUser";
import { Session } from "@/lib/models/Session";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await connectDB();

  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");
  const action = url.searchParams.get("action")?.toLowerCase();

  if (!sessionId || !action) {
    return NextResponse.json(
      { message: "Missing parameters!" },
      { status: 400 }
    );
  }

  const session = await Session.findById(sessionId);
  const students = await MockUser.find(
    {
      _id: { $in: session.studentCount },
    },
    "mockerUserEmail"
  );

  if (!session) {
    return NextResponse.json(
      { message: "Session not found"! },
      { status: 404 }
    );
  }

  if (action === "cancel") {
    session.status = "CANCELED";
    await session.save();

    await Promise.all(
      students.map((student) =>
        transporter.sendMail({
          from: "Study Buddy <oyunmyagmar.g@gmail.com>",
          to: student.mockUserEmail,
          subject: "Session Cancellation Notice",
          html: `
          <div style="padding: 20px; line-height: 1.6; color: #333;">
          
          <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #0275d8; margin: 0;">📘 Study Buddy</h2>
          <p style="margin: 0; font-size: 12px; color: #555;">Together • Learn • Leap</p>
          </div>
  
          <h3 style="color:#d9534f;">Session Cancelled</h3>
          
          <p>
          Unfortunately, your joined session<br/> 
          <strong>"${session.sessionTopicTitle}"</strong> scheduled on 
          <strong>${session.value}</strong><br/> 
          has been <strong>cancelled</strong>.
          </p>
          
          <p style="color: #666;">
          You may join any available session or create a new one anytime.
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

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/creator/canceled`
    );
  }

  if (action === "self") {
    session.selectedSessionType = "SELF-LED";
    session.status = "ACCEPTED";
    await session.save();

    await Promise.all(
      students.map((student) =>
        transporter.sendMail({
          from: "Study Buddy <oyunmyagmar.g@gmail.com>",
          to: student.mockUserEmail,
          subject: "Session Type Changed",
          html: `
          <div style="padding: 20px; line-height: 1.6; color: #333;">
          
          <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #0275d8; margin: 0;">📘 Study Buddy</h2>
          <p style="margin: 0; font-size: 12px; color: #555;">Together • Learn • Leap</p>
          /div>
  
          <h3 style="color:#4a6cf7;">Session Changed to SELF-LED</h3>
          
          <p>
          Your session has been changed to <strong>SELF-LED</strong>.
          </p>

          <p style="margin: 0;">
          <strong>Session Details:</strong><br/><br/>
          <strong>Topic:</strong> ${session.sessionTopicTitle}<br/>
          <strong>Study Content:</strong> ${session.description}<br/>
          📅 <strong>Date:</strong> ${session.value}<br/>
          ⏰ <strong>Starts At:</strong> ${session.time}<br/>
          👥 <strong>Joined Students:</strong> ${session.studentCount?.length}/${session.maxMember}
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

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/creator/self-led`
  );
}
