import { headers } from "next/headers";
import { verifyToken } from "@clerk/backend";
import { NextResponse } from "next/server";
import { createMockUser } from "@/lib/services/mock-user-service";
import { MockUser } from "@/lib/models/MockUser";
import connectDB from "@/lib/mongodb";

export async function checkAuth() {
  const headersList = await headers();
  const auth = headersList.get("Authorization");
  const authToken = auth?.split(" ")[1];

  if (!authToken) {
    return false;
  }

  try {
    const { sub, fullName, email, imageUrl, role } = await verifyToken(
      authToken,
      {
        secretKey: process.env.CLERK_SECRET_KEY,
      }
    );

    return { userClerkId: sub, fullName, email, imageUrl, role };
  } catch (e) {
    console.error(e);
    return false;
  }
}

export const POST = async () => {
  await connectDB();
  const result = await checkAuth();

  if (!result) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { userClerkId, fullName, email, imageUrl, role } = result;
  // console.log({ userClerkId, fullName, email, imageUrl, role });

  const status = role || "STUDENT";

  let mockUser = await MockUser.findOne({ mockUserClerkId: userClerkId });
  if (!mockUser) {
    mockUser = await createMockUser(
      userClerkId as string,
      fullName as string,
      email as string,
      imageUrl as string,
      status as string
    );
  }
  console.log({ mockUser });

  if (!mockUser) {
    return NextResponse.json(
      { message: "Failed to create or fetch user!" },
      { status: 500 }
    );
  }

  return NextResponse.json({ data: mockUser.userClerkId });
};
