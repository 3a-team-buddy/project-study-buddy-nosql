import { getAllTeachers } from "@/lib/services/teacher-service";
import { NextResponse } from "next/server";

export const GET = async () => {
  const tutors = await getAllTeachers();

  if (!tutors) {
    return NextResponse.json({ message: "No tutors found!" }, { status: 404 });
  }

  return NextResponse.json({ data: tutors });
};
