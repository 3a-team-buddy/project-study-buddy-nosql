import mongoose, { Schema } from "mongoose";

type JoinedStudentSchemaType = {
  studentId: string;
  sessionId: string;
};

const JoinedStudentSchema = new Schema(
  {
    studentId: {
      type: Schema.ObjectId,
      ref: "MockUser",
    },
    sessionId: {
      type: Schema.ObjectId,
      ref: "Session",
    },
  },
  { timestamps: true }
);

export const JoinedStudent =
  mongoose.models.JoinedStudent ||
  mongoose.model<JoinedStudentSchemaType>("JoinedStudent", JoinedStudentSchema);
