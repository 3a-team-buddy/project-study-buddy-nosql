import mongoose, { Schema } from "mongoose";
import { Rating } from "@/lib/models/Rating";

type SessionSchemaType = {
  sessionTopicTitle: string;
  description: string;
  minMember: number;
  maxMember: number;
  value: string;
  room: string;
  time: string;
  selectedSessionType: "TUTOR-LED" | "SELF-LED";
  creatorId: mongoose.Types.ObjectId;
  studentCount?: string[];
  status:
    | "WAITING"
    | "ACCEPTED"
    | "CANCELED"
    | "DELETED"
    | "ONGOING"
    | "COMPLETED";
  assignedTutor?: mongoose.Types.ObjectId | null;
  selectedReward: "COFFEE" | "CAKE" | "MONEY";
  isRated: boolean;
};

const SessionSchema = new Schema(
  {
    sessionTopicTitle: { type: String, required: true },
    description: { type: String, required: true },
    minMember: { type: Number, required: true },
    maxMember: { type: Number, required: true },
    value: { type: String, required: true },
    room: { type: String, required: true },
    time: { type: String, required: true },
    selectedSessionType: {
      type: String,
      enum: ["TUTOR-LED", "SELF-LED"],
      required: true,
    },
    creatorId: { type: Schema.ObjectId, ref: "MockUser", required: true },
    studentCount: { type: [String], default: [] },
    status: {
      type: String,
      enum: [
        "WAITING",
        "ACCEPTED",
        "CANCELED",
        "DELETED",
        "ONGOING",
        "COMPLETED",
      ],
      default: "WAITING",
      required: true,
    },
    assignedTutor: {
      type: Schema.ObjectId,
      ref: "MockUser",
      default: null,
    },
    selectedReward: {
      type: String,
      enum: ["COFFEE", "CAKE", "MONEY"],
      required: true,
    },
    isRated: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

SessionSchema.virtual("rating", {
  ref: "Rating",
  localField: "_id",
  foreignField: "sessionId",
  justOne: true,
});

export const Session =
  mongoose.models.Session ||
  mongoose.model<SessionSchemaType>("Session", SessionSchema);
