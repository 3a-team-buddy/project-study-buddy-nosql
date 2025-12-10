import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/lib/mailer";
import { SelectedTutor } from "@/lib/models/SelectedTutor";
import { Session } from "@/lib/models/Session";
import connectDB from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  await connectDB();

  const { sessionId } = await request.json();

  if (!sessionId) {
    return NextResponse.json(
      { message: "SessionId required" },
      { status: 400 }
    );
  }

  const session = await Session.findById(sessionId);
  if (!session) {
    return NextResponse.json({ message: "Session not found" }, { status: 404 });
  }
  // console.log({ session }, "SESSSSSION");

  const nextTutor = await SelectedTutor.findOne({
    createdSessionId: sessionId,
    invitationStatus: "WAITING",
  })
    .populate("tutorId")
    .sort({ order: 1 });

  // console.log({ nextTutor }, "NEXTNEXTTUTOR");

  if (!nextTutor) {
    return NextResponse.json({
      message: "No more tutors to email",
      noTutorsRemaining: true,
    });
  }

  const accept = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutor-email-response?sessionId=${sessionId}&tutorId=${nextTutor._id}&response=accept`;
  const decline = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutor-email-response?sessionId=${sessionId}&tutorId=${nextTutor._id}&response=decline`;

  await transporter.sendMail({
    from: "Study Buddy <oyunmyagmar.g@gmail.com>",
    to: nextTutor.tutorId.mockUserEmail,
    subject: "Tutor Invitation - Study Buddy",
    html: `
    <div classname="flex flex-col gap-5 px-5 pb-5 leading-6 text-black">
    <h3>Tutor Invitation - Study Buddy</h3>

    <div classname="flex flex-col gap-1"> 
    <p>Hello, </p>
    <p>You have been invited to be a Tutor for the following study session:</p>
    </div>
   
    <div> 
    <p><strong>Session title:</strong> ${session.sessionTopicTitle}</p>
    <p><strong>Description:</strong> ${session.description}</p>
    <p><strong>Date:</strong> ${session.value}</p>
    <p><strong>Time:</strong> ${session.time}</p>
    <p><strong>Joined students:</strong> ${session.studentCount?.length} / ${session.maxMember}</p>
    </div>
   

    <div classname="flex flex-col gap-1">
    <p>Please select an option below:</p>

    <div classname="flex justify-between">
    <a href="${accept}" classname="bg-emerald-500 text-white px-5 py-3 decoration-0 rounded-md">Accept</a> 
    <a href="${decline}" classname="bg-red-400 text-white px-5 py-3 decoration-0 rounded-md">Decline</a>
    </div>
    </div>
   
    
    <p>Thank you, <br/>Study Buddy Team</p>
  </div>
    `,
  });

  nextTutor.invitationStatus = "SEND";
  await nextTutor.save();

  return NextResponse.json({ success: true });
}
