import mongoose, { Schema } from "mongoose";

type SelectedTutorSchemaType = {
  tutorId: string;
  createdSessionId: string;
  order: number;
  invitationStatus: string;
};

const SelectedTutorSchema = new Schema(
  {
    tutorId: { type: Schema.ObjectId, ref: "MockUser", required: true },
    createdSessionId: { type: Schema.ObjectId, ref: "Session", required: true },
    order: { type: Number, required: true },
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
