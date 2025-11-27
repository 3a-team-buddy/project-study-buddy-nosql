import mongoose, { Schema } from "mongoose";

type TutorPriorityListSchemaType = {
  sessionId: string;
  foundPriorityTutorIds: string[];
  status: string;
  invitationStatus: string;
};

export const TutorPriorityListSchema = new Schema(
  {
    sessionId: { type: Schema.ObjectId, ref: "Session", required: true },
    foundPriorityTutorIds: [
      {
        type: Schema.ObjectId,
        ref: "Tutor",
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["PREFERRED"],
      default: "PREFERRED",
      required: true,
    },
    invitationStatus: {
      type: String,
      enum: ["WAITING", "SEND", "ACCEPT", "DECLINE"],
      default: "WAITING",
      required: true,
    },
  },
  { timestamps: true }
);

export const TutorPriorityList =
  mongoose.models.TutorPriorityList ||
  mongoose.model<TutorPriorityListSchemaType>(
    "TutorPriorityList",
    TutorPriorityListSchema
  );
