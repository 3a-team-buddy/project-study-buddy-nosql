import { Session } from "@/lib/models/Session";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const sessionId = searchParams.get("sessionId");
  const email = searchParams.get("email");

  if (!sessionId || !email) {
    return NextResponse.json({ message: "Missing data" }, { status: 400 });
  }

  await connectDB();

  const updatedSession = await Session.findByIdAndUpdate(sessionId, {
    status: "ACCEPTED",
  });

  console.log({ sessionId, email, updatedSession });
}
