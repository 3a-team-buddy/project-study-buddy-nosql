import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { recipients, sessionTitle, sessionId } = await req.json();

  if (!recipients || recipients.length === 0) {
    return NextResponse.json({ message: "No data provided!" }, { status: 400 });
  }

  await resend.emails.send({
    from: "Study Buddy <onboarding@resend.dev>",
    to: "oyunmyagmar.g@gmail.com",
    subject: `Study Buddy Tutor Invitation: ${sessionTitle}`,
    html: `<h2>Hello!</h2> 
    <p>You have been invited to tutor the session:</p>
    <strong>${sessionTitle}</strong>
    <p>Click below to accept or decline:</p>`,
  });

  return NextResponse.json({ succes: true });
}
