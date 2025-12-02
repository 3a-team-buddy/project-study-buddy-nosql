import { EmailTemplate } from "@/app/(protected)/create-session/_components/EmailTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextRequest, res: NextResponse) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <oyunmyagmar.g@gmail.com>",
    to: ["oyunmyagmar.g@gmail.com"],
    subject: "Hello Word",
    react: EmailTemplate({ firstName: "John" }),
  });

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
  return NextResponse.json({ data }, { status: 200 });
};
