import { getAllMockTopics } from "@/lib/services/mock-topic-service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const mockTopics = await getAllMockTopics();

    if (!mockTopics) {
      return NextResponse.json(
        { message: "No mock datas found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: mockTopics }, { status: 200 });
  } catch (error) {
    console.error("Error while getting mock topics!", error);
    return NextResponse.json(
      {
        message: "Server error while getting mock topics!",
        error,
      },
      { status: 500 }
    );
  }
}
