import { headers } from "next/headers";
import { verifyToken } from "@clerk/backend";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { MockUser } from "@/lib/models/MockUser";
import { Session } from "@/lib/models/Session";

export async function checkAuth() {
  const headersList = await headers();
  const auth = headersList.get("Authorization");
  const authToken = auth?.split(" ")[1];

  console.log({ authToken });

  if (!authToken) {
    return false;
  }

  try {
    const { sub } = await verifyToken(authToken, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    return { userClerkId: sub };
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function GET() {
  await connectDB();

  const auth = await checkAuth();
  if (!auth)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { userClerkId } = auth;

  const user = await MockUser.findOne({ mockUserClerkId: userClerkId });
  if (!user) {
    return NextResponse.json(
      { message: "User not found in DB" },
      { status: 404 }
    );
  }

  const findJoined = await Session.find({ studentCount: user._id });
  console.log({ findJoined });

  if (!findJoined) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "Found joined session successfully",
    data: findJoined,
  });
}
