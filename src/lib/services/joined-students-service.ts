import connectDB from "../mongodb";
import { JoinedStudent } from "../models/JoinedStudent";
import { Session } from "../models/Session";

export const getAllJoinedStudents = async (sessionId: string) => {
  await connectDB();

  return await JoinedStudent.find({ sessionId: sessionId })
    .populate("studentId")
    .lean();
};

export const createJoinedStudent = async (
  userId: string,
  sessionId: string
) => {
  await connectDB();

  const joinedStudent = new JoinedStudent({
    studentId: userId,
    sessionId,
  });
  await joinedStudent.save();

  // console.log({ sessionId, userId });
  const updatedSession = await Session.findByIdAndUpdate(
    sessionId,
    {
      $push: { studentCount: userId },
    },
    { new: true }
  );
  return { joinedStudent, updatedSession };
};
