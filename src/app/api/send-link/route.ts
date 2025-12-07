// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { emails, link } = await req.json();

//     if (!emails || emails.length === 0) {
//       return NextResponse.json(
//         { error: "No emails provided" },
//         { status: 400 }
//       );
//     }

//       to: emails,
//       subject: "Study Session Invitation",
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
