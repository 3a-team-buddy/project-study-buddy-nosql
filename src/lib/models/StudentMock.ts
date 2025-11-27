import mongoose, { Schema } from "mongoose";

type StudentMockSchemaType = {
  studentClerkId: string;
  studentEmail: string;
  studentName: string;
  studentImage: string;
};

const StudentMockSchema = new Schema(
  {
    studentClerkId: { type: String, required: true },
    studentEmail: { type: String, required: true },
    studentName: { type: String },
    studentImage: { type: String },
  },
  { timestamps: true }
);
export const StudentMock =
  mongoose.models.StudentMock ||
  mongoose.model<StudentMockSchemaType>("StudentMock", StudentMockSchema);
