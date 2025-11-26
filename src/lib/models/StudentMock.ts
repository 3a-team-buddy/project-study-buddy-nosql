import mongoose, { Schema } from "mongoose";

type StudentMockSchemaType = {
  clerkId: string;
  name: string;
  email: string;
  image: string;
};

const StudentMockSchema = new Schema({
  clerkId: { type: String, unique: true },
  name: { type: String },
  email: { type: String, unique: true },
  image: { type: String },
});
export const StudentMock =
  mongoose.models.StudentMock ||
  mongoose.model<StudentMockSchemaType>("StudentMock", StudentMockSchema);
