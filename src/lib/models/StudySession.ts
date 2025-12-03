import { Schema, model, models } from "mongoose";

const studySessionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    creatorId: {
      type: String,
      required: true,
    },
    minMember: {
      type: Number,
      required: true,
    },
    joinedStudents: [
      {
        studentId: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const StudySession =
  models.StudySession || model("StudySession", studySessionSchema);

export default StudySession;
