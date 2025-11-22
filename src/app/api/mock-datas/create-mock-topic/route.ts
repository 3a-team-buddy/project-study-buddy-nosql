import { createMockTopic } from "@/lib/services/mock-topic-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mockTitle, mockDescription } = body;

    //   console.log({ mockTitle });
    //   console.log({ mockDescription });

    if (!mockTitle || !mockDescription) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }

    const mockTopic = await createMockTopic(mockTitle, mockDescription);

    if (!mockTopic) {
      return NextResponse.json(
        { message: "Failed to create mock topic!" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Mock topic created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while creating mock topic!", error);

    return NextResponse.json(
      {
        message: "Server error while creating mock topic!",
      },
      { status: 500 }
    );
  }
}
