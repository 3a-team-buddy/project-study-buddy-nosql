import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { verifyToken } from "@clerk/backend";
import { headers } from "next/headers";
import { Session } from "@/lib/models/Session";

export async function GET() {
  try {
    await connectDB();

    const headersList = await headers();

    const authHeader = headersList.get("Authorization");
    const authToken = authHeader?.split(" ")[1];

    if (!authToken) {
      return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    // const token = authHeader.replace("Bearer ", "");

    const { sub } = await verifyToken(authToken, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    const clerkId = sub;

    // const studentId = await MockUser.findOne(
    //   { mockUserClerkId: clerkId },
    //   "_id"
    // );
    // console.log({ studentId });

    const createdSessions = await Session.find({ creatorId: clerkId });
    if (!createdSessions) {
      return NextResponse.json({ message: "No created sessions" });
    }

    console.log({ createdSessions });
    return NextResponse.json({ data: createdSessions });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
// .sort({
//       createdAt: -1,
//     });
