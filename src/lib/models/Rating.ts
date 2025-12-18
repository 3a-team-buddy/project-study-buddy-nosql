import mongoose, { Schema } from "mongoose";

type RatingSchemaType = {
  sessionId: mongoose.Types.ObjectId;
  selectedSessionRating: string;
  selectedTutorRating: string;
  feedback: string;
  creatorId: mongoose.Types.ObjectId;
};

const RatingSchema = new Schema(
  {
    sessionId: { type: Schema.ObjectId, ref: "Session", required: true },
    selectedSessionRating: {
      type: String,
      enum: ["NORMAL", "GOOD", "EXCELLENT"],
      required: true,
    },
    selectedTutorRating: {
      type: String,
      enum: ["NORMAL", "GOOD", "EXCELLENT"],
      required: true,
    },
    feedback: { type: String },
    creatorId: {
      type: mongoose.Types.ObjectId,
      ref: "MockUser",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

RatingSchema.index({ sessionId: 1, creatorId: 1 }, { unique: true });

export const Rating =
  mongoose.models.Rating ||
  mongoose.model<RatingSchemaType>("Rating", RatingSchema);
