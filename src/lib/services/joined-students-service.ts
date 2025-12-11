import connectDB from "../mongodb";
import { JoinedStudent } from "../models/JoinedStudent";
import { Session } from "../models/Session";
import mongoose from "mongoose";

export const getAllJoinedStudents = async (sessionId: string) => {
  await connectDB();

  return await JoinedStudent.find({ sessionId: sessionId })
    .populate("studentId")
    .lean();
};

export const createJoinedStudent = async (
  userId: mongoose.Types.ObjectId,
  sessionId: string
) => {
  await connectDB();

  const joinedStudent = new JoinedStudent({
    studentId: userId,
    sessionId: new mongoose.Types.ObjectId(sessionId),
  });
  await joinedStudent.save();

  const updatedSession = await Session.findByIdAndUpdate(
    sessionId,
    {
      $push: { studentCount: userId.toString() },
    },
    { new: true }
  );

  console.log({ updatedSession });
  return { joinedStudent, updatedSession };
};
