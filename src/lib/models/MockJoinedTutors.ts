import mongoose, { Schema } from "mongoose";

type MockJoinedTutorSchemaType = {
  mockTutorName: string;
  mockTutorEmail: string;
  mockTutorImage: string;
};

const MockJoinedTutorSchema = new Schema({
  mockJoinedTutorSessionId: { type: String, required: true },
  //   mockJoinedTutorTutorId: [{ type: String, required: true, categories: [String] }],
  mockJoinedTutorStatus: {
    type: String,
    enum: ["PREFERRED"],
    default: ["PREFERRED"],
    required: true,
  },
  mockJoinedTutorInbvitationStatus: {
    type: String,
    enum: ["WAITING", "SEND", "ACCEPT", "DECLINE"],
    default: ["WAITING"],
    required: true,
  },
});

export const MockJoinedTutor =
  mongoose.models.MockTutor ||
  mongoose.model<MockJoinedTutorSchemaType>(
    "MockJoinedTutor",
    MockJoinedTutorSchema
  );
