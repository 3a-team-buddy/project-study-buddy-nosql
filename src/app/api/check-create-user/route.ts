import { headers } from "next/headers";
import { verifyToken } from "@clerk/backend";
import { NextResponse } from "next/server";
import { createMockUser } from "@/lib/services/mock-user-service";
import { MockUser } from "@/lib/models/MockUser";

export async function checkAuth() {
  const headersList = await headers();
  const auth = headersList.get("Authorization");
  const authToken = auth?.split(" ")[1];

  if (!authToken) {
    return false;
  }

  try {
    const { sub, fullname, email, pic, role } = await verifyToken(authToken, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    return { userClerkId: sub, fullname, email, pic, role };
  } catch (e) {
    console.error(e);
    return false;
  }
}

export const POST = async () => {
  const result = await checkAuth();

  if (!result) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { userClerkId, fullname, email, pic, role } = result;
  //   console.log({ userClerkId, fullname, email, pic, role });
  // shineer login hiisen suragch db hadgalah, ali hediin bval hadgalahgui

  const status = role || "STUDENT";

  let mockUser = await MockUser.findOne({ mockUserClerkId: userClerkId });

  if (!mockUser) {
    mockUser = await createMockUser(
      userClerkId as string,
      fullname as string,
      email as string,
      pic as string,
      status as string
    );
  }

  if (!mockUser) {
    return NextResponse.json(
      { message: "Failed to create or fetch user!" },
      { status: 500 }
    );
  }

  return NextResponse.json({ data: mockUser.userClerkId });
};
