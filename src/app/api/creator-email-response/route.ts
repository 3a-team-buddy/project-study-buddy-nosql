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
          subject: "Session Cancellation",
          html: `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7;padding:40px 0;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:white;border-radius:12px;overflow:hidden;font-family:Arial;">
        
        <tr>
          <td style="background:#ff4d4f;padding:25px;text-align:center;color:white;">
            <h2 style="margin:0;font-size:24px;">Session Cancelled</h2>
          </td>
        </tr>

        <tr>
          <td style="padding:30px;color:#333;line-height:1.6;">
            <p style="font-size:16px;">Hello dear student,</p>
            <p style="font-size:15px;">
              We’re sorry to inform you that your upcoming session has been <strong>cancelled</strong>.
            </p>

            <div style="margin-top:20px;padding:15px;border-left:4px solid #ff4d4f;background:#fff5f5;">
              <p><strong>Session Title:</strong> ${session.sessionTopicTitle}</p>
              <p><strong>Description:</strong> ${session.description}</p>
              <p><strong>Date:</strong> ${session.value}</p>
              <p><strong>Time:</strong> ${session.time}</p>
              <p><strong>Joined Students:</strong> ${session.studentCount?.length} / ${session.maxMember}</p>
            </div>

            <p style="margin-top:25px;font-size:14px;color:#666;">
              You may join or create another session anytime.
            </p>

            <a 
              href="${process.env.NEXT_PUBLIC_BASE_URL}/sessions"
              style="display:inline-block;margin-top:18px;padding:12px 22px;background:#ff4d4f;color:white;text-decoration:none;border-radius:8px;font-size:15px;">
              View Available Sessions
            </a>
          </td>
        </tr>

        <tr>
          <td style="text-align:center;padding:20px;font-size:12px;color:#999;">
            Study Buddy • All rights reserved
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
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
          to: student.mockerUserEmail,
          subject: "Session Type Changed",
          html: `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4ff;padding:40px 0;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:white;border-radius:12px;overflow:hidden;font-family:Arial;">
        
        <tr>
          <td style="background:#4a6cf7;padding:25px;text-align:center;color:white;">
            <h2 style="margin:0;font-size:24px;">Session Type Updated</h2>
          </td>
        </tr>

        <tr>
          <td style="padding:30px;color:#333;line-height:1.6;">
            <p style="font-size:16px;">Hello dear student,</p>
            <p style="font-size:15px;">
              Your session has been updated to <strong>SELF-LED</strong>.  
              This means you will now be conducting the session independently.
            </p>

            <div style="margin-top:20px;padding:15px;border-left:4px solid #4a6cf7;background:#eef1ff;">
              <p><strong>Session Title:</strong> ${session.sessionTopicTitle}</p>
              <p><strong>Description:</strong> ${session.description}</p>
              <p><strong>Date:</strong> ${session.value}</p>
              <p><strong>Time:</strong> ${session.time}</p>
              <p><strong>Joined Students:</strong> ${session.studentCount?.length} / ${session.maxMember}</p>
            </div>

            <p style="margin-top:25px;font-size:14px;color:#666;">
              Feel free to prepare materials or invite classmates!
            </p>

            <a 
              href="${process.env.NEXT_PUBLIC_BASE_URL}/creator/self-led"
              style="display:inline-block;margin-top:18px;padding:12px 22px;background:#4a6cf7;color:white;text-decoration:none;border-radius:8px;font-size:15px;">
              View Session
            </a>
          </td>
        </tr>

        <tr>
          <td style="text-align:center;padding:20px;font-size:12px;color:#999;">
            Study Buddy • Helping students grow
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
`,
        })
      )
    );
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/creator/self-led`
  );
}
