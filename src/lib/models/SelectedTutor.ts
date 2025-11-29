import mongoose, { Schema } from "mongoose";

type SelectedTutorSchemaType = {
  tutors: [{ tutorId: string; invitationStatus: string }];
  createdSessionId: string;
};

const SelectedTutorSchema = new Schema(
  {
    tutors: [
      {
        tutorId: { type: Schema.ObjectId, ref: "MockTutor" },
        invitationStatus: {
          type: String,
          enum: ["WAITING", "SEND", "ACCEPT", "DECLINE"],
          default: "WAITING",
          required: true,
        },
      },
    ],
    createdSessionId: { type: Schema.ObjectId, ref: "Session" },
  },
  { timestamps: true }
);

export const SelectedTutor =
  mongoose.models.SelectedTutor ||
  mongoose.model<SelectedTutorSchemaType>("SelectedTutor", SelectedTutorSchema);
