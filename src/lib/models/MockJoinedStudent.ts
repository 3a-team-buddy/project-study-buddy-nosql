import mongoose, { Schema } from "mongoose";

type MockJoinedStudentSchemaType = {
  joinedStudentSessionId: string;
  studentId: string;
};

const MockJoinedStudentSchema = new Schema(
  {
    joinedStudentSessionId: {
      type: Schema.ObjectId,
      ref: "Session",
    },
    studentId: {
      type: Schema.ObjectId,
      ref: "StudentMock",
    },
  },
  { timestamps: true }
);

export const MockJoinedStudent =
  mongoose.models.JoinedStudentList ||
  mongoose.model<MockJoinedStudentSchemaType>(
    "JoinedStudentList",
    MockJoinedStudentSchema
  );
