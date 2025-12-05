import { sendEmail } from "@/lib/mailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { recipients, session } = req.body;

  try {
    await Promise.all(
      recipients.map((email) =>
        sendEmail({
          to: email,
          subject: "Tutor Invitation",
          html: `
            <h2>Study Buddy Tutor Invitation</h2>
            <p>You are invited to tutor the session: <strong>${session.sessionTopicTitle}</strong></p>
            <p>Date: ${session.value}</p>
            <p>Time: ${session.time}</p>
          `,
        })
      )
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// import { error } from "console";
// import { NextRequest, NextResponse } from "next/server";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);
// const recipient = [
//   "oyunmyagmar.g@gmail.com",
//   "miga_001@yahoo.com",
//   "25LP4018@nest.edu.mn",
// ];

// export async function POST(req: NextRequest) {
//   try {
//     const { recipients, session } = await req.json();

//     if (!recipients || recipients.length === 0 || !session) {
//       return NextResponse.json(
//         { message: "No data provided!" },
//         { status: 400 }
//       );
//     }
//     const data = await resend.emails.send({
//       from: "Study Buddy <onboarding@resend.dev>",
//       to: recipient[0],
//       subject: `You have been invited as a tutor!`,
//       html: `<h2>Study Buddy Tutor Invitation</h2>

//     <p>Hello!, You were invited to tutor the session: <strong>${
//       session.sessionTopicTitle
//     }<strong></p>
//     <p>Session date: <strong>${session.value}</strong></p>
//     <p>Session time: <strong>${session.time}</strong></p>
//     <p>Members: <strong>${session.minMember}-${session.maxMember}<strong></p>

//     <p>Click below to accept or decline:</p>
//     <a href="${
//       process.env.NEXT_PUBLIC_BASE_URL
//     }/api/send-tutor-invite/accept?sessionId=${
//         session._id
//       }&email=${encodeURIComponent(recipient[0])}">Accept</a>

//       <a href="${
//         process.env.NEXT_PUBLIC_BASE_URL
//       }/api/send-tutor-invite/decline?sessionId=${
//         session._id
//       }&email=${encodeURIComponent(recipient[0])}">Decline</a>`,
//     });

//     return NextResponse.json({ data: data, succes: true }, { status: 200 });
//   } catch (error) {
//     console.error("Error", error);
//     NextResponse.json({ error: error }, { status: 500 });
//   }
// }
