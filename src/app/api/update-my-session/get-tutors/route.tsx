import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { SelectedTutor } from "@/lib/models/SelectedTutor";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const sessionId = req.nextUrl.searchParams.get("sessionId");
    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }

    const tutors = await SelectedTutor.find({
      createdSessionId: sessionId,
    })
      .populate("tutorId", "mockUserEmail -_id")
      .select("tutorId order invitationStatus")
      .lean();

    const normalized = tutors.map((item) => ({
      mockUserEmail: item.tutorId.mockUserEmail,
      order: item.order,
      invitationStatus: item.invitationStatus,
    }));

    return NextResponse.json({ tutors: normalized });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
