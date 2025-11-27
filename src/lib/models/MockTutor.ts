import mongoose, { Schema } from "mongoose";

export type MockTutorSchemaType = {
  mockTutorName: string;
  mockTutorEmail: string;
  mockTutorImage: string;
};

export const MockTutorSchema = new Schema({
  mockTutorName: { type: String, required: true },
  mockTutorEmail: { type: String, required: true },
  mockTutorImage: { type: String, required: true },
});

export const MockTutor =
  mongoose.models.MockTutor ||
  mongoose.model<MockTutorSchemaType>("MockTutor", MockTutorSchema);
