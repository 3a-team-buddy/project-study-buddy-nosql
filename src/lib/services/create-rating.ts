import { Rating } from "../models/Rating";
import { Session } from "../models/Session";
import connectDB from "../mongodb";
import mongoose from "mongoose";

export const createRating = async (
  sessionId: mongoose.Types.ObjectId,
  selectedSessionRating: string,
  selectedTutorRating: string,
  feedback: string,
  creatorId: mongoose.Types.ObjectId
) => {
  await connectDB();
  const newRating = new Rating({
    sessionId,
    selectedSessionRating,
    selectedTutorRating,
    feedback,
    creatorId,
  });

  await newRating.save();

  await Session.findByIdAndUpdate(sessionId, { isRated: true });

  return newRating;
};
