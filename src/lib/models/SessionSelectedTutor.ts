import mongoose, { Schema } from "mongoose";

type SessionSelectedTutorSchemaType = {
  sessionId: string;
  tutorId: string;
  invitationStatus: string;
};

export const SessionSelectedTutorSchema = new Schema(
  {
    sessionId: { type: Schema.ObjectId, ref: "Session", required: true },
    tutorId: [
      {
        type: Schema.ObjectId,
        ref: "Tutor",
        required: true,
      },
    ],

    invitationStatus: {
      type: String,
      enum: ["WAITING", "SEND", "ACCEPT", "DECLINE"],
      default: "WAITING",
      required: true,
    },
  },
  { timestamps: true }
);

export const SessionSelectedTutor =
  mongoose.models.SessionSelectedTutor ||
  mongoose.model<SessionSelectedTutorSchemaType>(
    "SessionSelectedTutor",
    SessionSelectedTutorSchema
  );
