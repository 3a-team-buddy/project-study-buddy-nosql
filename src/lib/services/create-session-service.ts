import connectDB from "../mongodb";
import { Session } from "../models/Session";
import mongoose from "mongoose";

export const getAllSessions = async () => {
  await connectDB();

  return await Session.find().select("-__v").sort({ createdAt: -1 });
};

export const createNewSession = async (
  sessionTopicTitle: string,
  description: string,
  minMember: number,
  maxMember: number,
  value: string,
  time: string,
  selectedSessionType: string,
  creatorId: mongoose.Types.ObjectId
) => {
  await connectDB();
  const newSession = new Session({
    sessionTopicTitle,
    description,
    minMember,
    maxMember,
    value,
    time,
    selectedSessionType,
    creatorId,
    studentCount: [],
    status: "WAITING",
    assignedTutor: null,
  });

  await newSession.save();
  return newSession;
};
