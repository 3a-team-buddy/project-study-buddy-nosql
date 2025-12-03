import mongoose, { Schema } from "mongoose";

export type MockUserSchemaType = {
  mockUserClerkId?: string;
  mockUserName: string;
  mockUserEmail: string;
  mockUserImage: string;
  mockUserStatus: string;
};

export const MockUserSchema = new Schema({
  mockUserClerkId: { type: String, required: false },
  mockUserName: { type: String, required: true },
  mockUserEmail: { type: String, required: true },
  mockUserImage: { type: String, required: true },
  mockUserStatus: {
    type: String,
    enum: ["STUDENT", "TEACHER"],
    default: "STUDENT",
    required: true,
  },
});

export const MockUser =
  mongoose.models.MockUser ||
  mongoose.model<MockUserSchemaType>("MockUser", MockUserSchema);
