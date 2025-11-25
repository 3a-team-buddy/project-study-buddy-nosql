import mongoose, { Schema } from "mongoose";

type studentSchemaType = {
  clerckId: string;
  name: string;
  email: string;
  image: string;
};

const StudentMockSchema = new Schema({
  clerckId: { type: String },
  name: { type: String },
  email: { type: String },
  image: { type: String },
});
export const StudentMock =
  mongoose.models.StudentMock ||
  mongoose.model<studentSchemaType>("StudentMock", StudentMockSchema);
