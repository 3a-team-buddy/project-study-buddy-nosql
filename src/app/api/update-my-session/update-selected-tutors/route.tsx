import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { SelectedTutor } from "@/lib/models/SelectedTutor";
import { createSelectedTutor } from "@/lib/services/selected-tutors-service";

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { sessionId, selectedTutors } = body;

    if (!sessionId || !selectedTutors) {
      return NextResponse.json(
        { error: "sessionId and selectedTutors are required" },
        { status: 400 }
      );
    }

    await SelectedTutor.deleteMany({ createdSessionId: sessionId });

    await createSelectedTutor(selectedTutors, sessionId);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
