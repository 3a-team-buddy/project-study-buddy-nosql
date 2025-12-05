import { NextResponse } from "next/server";
import { getAllSessions } from "@/lib/services/create-session-service";

export async function GET() {
  const allSessions = await getAllSessions();
  // console.log({ allSessions });

  if (!allSessions) {
    return NextResponse.json({ message: "No Sessions" }, { status: 404 });
  }

  return NextResponse.json({ data: allSessions });
}
