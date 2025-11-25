import { Mongoose, Schema } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

//model
export async function POST(request: NextRequest) {
  const mongoose = require("mongoose");

  const body = await request.json();

  const { studentMockId, studentMockEmail, studentMockImage, studentMockName } =
    body;

  const studentSchema = new Schema({
    clerckId: { type: String, required: true },

    name: { type: String },

    email: { type: String, required: true },

    image: { type: String },
  });

  const Student = mongoose.model("Student", studentSchema);

  const createStudent = new Student({
    id: studentMockId,
    name: studentMockName,
    email: studentMockEmail,
    image: studentMockImage,
  });

  await createStudent.save();

  return NextResponse.json({});
}
