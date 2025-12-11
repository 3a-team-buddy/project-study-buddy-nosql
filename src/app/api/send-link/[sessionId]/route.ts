import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { transporter } from "@/lib/mailer";
import { Session } from "@/lib/models/Session";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    await connectDB();
    const sessionId = (await params).sessionId;

    if (!sessionId) {
      return NextResponse.json({ message: "Miising parameters" });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return NextResponse.json({ message: "No session found" });
    }

    const { emails, link } = await req.json();

    await Promise.all(
      emails.map((email: string) =>
        transporter.sendMail({
          from: " Study Buddy <oyunmyagmar.g@gmail.com>",
          to: email,
          subject: "Session Invitation",
          html: `
        <div style="padding: 20px; line-height: 1.6; color: #333;">
        
        <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #0275d8; margin: 0;">📘Study Buddy</h2>
        <p style="margin: 0; font-size: 12px; color: #555;">Together • Learn • Leap</p>
        </div>

        <h3 style="color: #004700;">Session Invitation</h3> 
        
        <p> 
        Great news!<br/> 
        You are invited to join the session:
        <strong>"${session.sessionTopicTitle}"</strong>.
        </p>
        
        <p><a href="${link}">Click here</a> to join the session</p>

        <p style="margin-top: 80px; color: #555;">
        Thank you,<br/>
        <strong>Buddy-Buddy Team</strong>
        </p>
        
        </div>
        `,
        })
      )
    );

    return NextResponse.json({ message: "Invite link mail sent" });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
