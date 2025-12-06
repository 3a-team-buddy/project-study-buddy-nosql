import mongoose, { Schema } from "mongoose";

type JoinedStudentSchemaType = {
  studentId: mongoose.Types.ObjectId;
  sessionId: mongoose.Types.ObjectId;
};

const JoinedStudentSchema = new Schema(
  {
    studentId: {
      type: Schema.ObjectId,
      ref: "MockUser",
      required: true,
    },
    sessionId: {
      type: Schema.ObjectId,
      ref: "Session",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const JoinedStudent =
  mongoose.models.JoinedStudent ||
  mongoose.model<JoinedStudentSchemaType>("JoinedStudent", JoinedStudentSchema);
