import mongoose, { Schema } from "mongoose";

type SessionSchemaType = {
  sessionTopicTitle: string;
  description: string;
  minMember: number;
  maxMember: number;
  value: string;
  time: string;
  selectedSessionType: string;
  creatorId: string;
  studentCount: string[];
  assignedTutor?: string;
  status: "WAITING" | "ACCEPTED" | "DECLINED";
};

const SessionSchema = new Schema(
  {
    sessionTopicTitle: { type: String, required: true },
    description: { type: String, required: true },
    minMember: { type: Number, required: true },
    maxMember: { type: Number, required: true },
    value: { type: String, required: true },
    time: { type: String, required: true },
    selectedSessionType: { type: String, required: true },
    creatorId: { type: String, required: true },
    studentCount: [{ type: Schema.ObjectId, ref: "MockUser", default: [] }],
    assignedTutor: { type: Schema.ObjectId, ref: "MockUser", required: false },
    status: {
      type: String,
      enum: ["WAITING", "ACCEPTED", "DECLINED"],
      default: "WAITING",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Session =
  mongoose.models.Session ||
  mongoose.model<SessionSchemaType>("Session", SessionSchema);
