import connectDB from "../mongodb";
import { Session } from "../models/Session";

export const getAllSessions = async () => {
  await connectDB();

  return await Session.find().select("-__v");
};

export const createNewSession = async (
  sessionTopicTitle: string,
  description: string,
  minMember: number,
  maxMember: number,
  value: string,
  time: string,
  selectedSessionType: string,
  creatorId: string,
  studentsCount: number
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
    studentsCount,
  });

  await newSession.save();
  return newSession;
};
