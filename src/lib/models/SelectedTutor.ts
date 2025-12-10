import mongoose, { Schema } from "mongoose";

type SelectedTutorSchemaType = {
  tutorId: mongoose.Types.ObjectId;
  createdSessionId: mongoose.Types.ObjectId;
  order: number;
  invitationStatus: "WAITING" | "SENT" | "ACCEPTED" | "DECLINED";
};

const SelectedTutorSchema = new Schema(
  {
    tutorId: { type: Schema.ObjectId, ref: "MockUser", required: true },
    createdSessionId: { type: Schema.ObjectId, ref: "Session", required: true },
    order: { type: Number, required: true },
    invitationStatus: {
      type: String,
      enum: ["WAITING", "SENT", "ACCEPTED", "DECLINED"],
      default: "WAITING",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const SelectedTutor =
  mongoose.models.SelectedTutor ||
  mongoose.model<SelectedTutorSchemaType>("SelectedTutor", SelectedTutorSchema);
