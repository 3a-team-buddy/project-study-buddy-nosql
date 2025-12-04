import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const sessionId = searchParams.get("sessionId");
  const email = searchParams.get("email");

  if (!sessionId || !email) {
    return NextResponse.json({ message: "Missing data" }, { status: 400 });
  }

  console.log({ sessionId, email });
}
