import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { verifyToken } from "@clerk/backend";
import { headers } from "next/headers";
import { Session } from "@/lib/models/Session";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const headersList = headers();
    const authHeader = (await headersList).get("Authorization");
    const authToken = authHeader?.split(" ")[1];

    if (!authToken) {
      return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    const { sub: clerkId } = await verifyToken(authToken, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    const session = await Session.findById(params.id);

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (session.creatorId !== clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (session.joinedStudents.length >= session.minMember) {
      return NextResponse.json(
        { error: "Cannot delete: minMember reached" },
        { status: 400 }
      );
    }

    await session.deleteOne();

    return NextResponse.json({ message: "Session deleted" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
