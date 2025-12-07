// import { EmailTemplateLink } from "@/app/(protected)/create-session/_components/EmailTemplate";
// import { NextRequest, NextResponse } from "next/server";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: NextRequest) {
//   try {
//     const { emails, link } = await req.json();

//     if (!emails || emails.length === 0) {
//       return NextResponse.json(
//         { error: "No emails provided" },
//         { status: 400 }
//       );
//     }

//     const { error, data } = await resend.emails.send({
//       from: "StudyBuddy <onboarding@resend.dev>",
//       to: emails,
//       subject: "Study Session Invitation",
//       react: EmailTemplateLink({ link }), // ✔️ FIXED
//     });

//     if (error) {
//       return NextResponse.json({ error }, { status: 400 });
//     }

//     return NextResponse.json({ success: true, data });
//   } catch (e) {
//     console.error("Send-link error:", e);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
