export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { emails, link } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Study Buddy" <${process.env.SMTP_USER}>`,
      to: emails,
      subject: "Invitation",
      html: `<p>Join the session: <a href="${link}">${link}</a></p>`,
    });

    console.log("MAIL SENT:", info);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("MAIL ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
