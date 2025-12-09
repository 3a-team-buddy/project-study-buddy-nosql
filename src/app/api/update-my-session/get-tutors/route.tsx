import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { SelectedTutor } from "@/lib/models/SelectedTutor";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    await connectDB();
    const { sessionId } = await params;
    if (!sessionId) {
      console.error();
      return NextResponse.json(
        { error: "session id required " },
        { status: 400 }
      );
    }
    console.log({ sessionId });
    const selectedTutors = await SelectedTutor.findById(sessionId);
    return NextResponse.json({ data: selectedTutors });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
