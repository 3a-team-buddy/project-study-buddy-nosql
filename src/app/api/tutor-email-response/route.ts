import { NextRequest, NextResponse } from "next/server";
import { SelectedTutor } from "@/lib/models/SelectedTutor";
import { Session } from "@/lib/models/Session";
import connectDB from "@/lib/mongodb";
import { MockUser } from "@/lib/models/MockUser";
import { sendJoinedStudentsTutorSessionConfirmEmail } from "@/lib/services/sendJoinedStudentsTutorSessionConfirmEmail";
import { sendTutorAssignmentConfirmEmail } from "@/lib/services/sendTutorAssignmentConfirmEmail";
import { sendNextTutorInviteEmail } from "@/lib/services/sendNextTutorInviteEmail";
import { sendCreatorAllTutorsDeclinedEmail } from "@/lib/services/sendCreatorAllTutorsDeclinedEmail";

export async function GET(request: NextRequest) {
  await connectDB();

  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");
  const tutorId = url.searchParams.get("tutorId");
  const response = url.searchParams.get("response")?.toLowerCase();

  if (!sessionId || !tutorId || !response) {
    return NextResponse.json(
      { message: "Missing parameters!" },
      { status: 400 }
    );
  }

  const updatedSession = await Session.findById(sessionId).populate(
    "assignedTutor"
  );
  const tutor = await SelectedTutor.findById(tutorId).populate("tutorId");

  if (!updatedSession || !tutor) {
    return NextResponse.json(
      { message: "Session or Tutor not found!" },
      { status: 404 }
    );
  }

  if (!tutor.tutorId) {
    return NextResponse.json(
      { message: "Tutor user not found!" },
      { status: 500 }
    );
  }

  if (tutor.invitationStatus === "ACCEPTED") {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/accepted`
    );
  }

  if (tutor.invitationStatus === "DECLINED") {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/thank-you`
    );
  }

  if (response === "accept") {
    await SelectedTutor.updateMany(
      {
        createdSessionId: sessionId,
        _id: { $ne: tutorId },
      },
      { invitationStatus: "DECLINED" }
    );

    tutor.invitationStatus = "ACCEPTED";
    await tutor.save();

    updatedSession.status = "ACCEPTED";
    updatedSession.assignedTutor = tutor.tutorId._id;
    await updatedSession.save();

    await sendJoinedStudentsTutorSessionConfirmEmail(updatedSession);

    await sendTutorAssignmentConfirmEmail(updatedSession, tutor);

    // const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    // await ably.channels.get("session").publish("session-updated", session);

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/accepted`
    );
  }

  tutor.invitationStatus = "DECLINED";
  try {
    await tutor.save();
  } catch (error) {
    console.error("Tutor update failed!", error);
  }

  const nextTutorSent = await sendNextTutorInviteEmail(updatedSession);

  if (!nextTutorSent) {
    const creator = await MockUser.findById(
      updatedSession.creatorId,
      "mockUserEmail"
    );

    await sendCreatorAllTutorsDeclinedEmail(updatedSession, creator);

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/thank-you`
    );
  }
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/tutor/thank-you`
  );
}
