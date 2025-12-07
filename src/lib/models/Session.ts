import mongoose, { Schema } from "mongoose";

type SessionSchemaType = {
  sessionTopicTitle: string;
  description: string;
  minMember: number;
  maxMember: number;
  value: string;
  time: string;
  selectedSessionType: "TUTOR-LED" | "SELF-LED";
  creatorId: mongoose.Types.ObjectId;
  studentCount?: string[];
  status: "WAITING" | "ACCEPTED" | "DECLINED";
  assignedTutor?: mongoose.Types.ObjectId | null;
};

const SessionSchema = new Schema(
  {
    sessionTopicTitle: { type: String, required: true },
    description: { type: String, required: true },
    minMember: { type: Number, required: true },
    maxMember: { type: Number, required: true },
    value: { type: String, required: true },
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
      enum: ["WAITING", "ACCEPTED", "DECLINED"],
      default: "WAITING",
      required: true,
    },
    assignedTutor: {
      type: Schema.ObjectId,
      ref: "MockUser",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Session =
  mongoose.models.Session ||
  mongoose.model<SessionSchemaType>("Session", SessionSchema);
