import mongoose, { Schema } from "mongoose";

type SelectedTutorSchemaType = {
  tutorId: string;
  createdSessionId: string;
  invitationStatus: string;
};

const SelectedTutorSchema = new Schema(
  {
    tutorId: { type: Schema.ObjectId, ref: "MockTutor" },
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

export const SelectedTutor =
  mongoose.models.SelectedTutor ||
  mongoose.model<SelectedTutorSchemaType>("SelectedTutor", SelectedTutorSchema);
