import mongoose, { Schema } from "mongoose";

type SessionSelectedTutorSchemaType = {
  foundTutorId: string;
  createdSessionId: string;
  invitationStatus: string;
};

const SessionSelectedTutorSchema = new Schema(
  {
    foundTutorId: { type: Schema.ObjectId, ref: "MockTutor" },
    createdSessionId: { type: Schema.ObjectId, ref: "Session" },
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
