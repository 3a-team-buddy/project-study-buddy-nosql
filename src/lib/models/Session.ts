import mongoose, { Schema } from "mongoose";

type SessionSchemaType = {
  sessionTopicTitle: string;
  description: string;
  minMember: number;
  maxMember: number;
  value: string;
  time: string;
  selectedSessionType: string;
  status: string;
  creatorId: string;
  studentCount: number;
};

const SessionSchema = new Schema({
  sessionTopicTitle: { type: String, required: true },
  description: { type: String, required: true },
  minMember: { type: Number, required: true },
  maxMember: { type: Number, required: true },
  value: { type: String, required: true },
  time: { type: String, required: true },
  selectedSessionType: { type: String, required: true },
  status: {
    type: String,
    enum: ["WAITING", "ACCEPTED"],
    default: "WAITING",
    required: true,
  },
  creatorId: { type: String, required: true },
  studentCount: { type: Number },
});

export const Session =
  mongoose.models.Session ||
  mongoose.model<SessionSchemaType>("Session", SessionSchema);
