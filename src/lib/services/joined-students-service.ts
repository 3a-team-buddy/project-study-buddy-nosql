import connectDB from "../mongodb";
import { JoinedStudent } from "../models/JoinedStudent";
import { Session } from "../models/Session";
import { MockUser } from "../models/MockUser";

export const getAllJoinedStudents = async (sessionId: string) => {
  await connectDB();

  return await JoinedStudent.find({ sessionId: sessionId })
    .populate("studentId")
    .sort({ createdAt: 1 })
    .lean();
};

export const createJoinedStudent = async (
  userClerkId: string,
  sessionId: string
) => {
  await connectDB();

  const studentId = await MockUser.findOne({
    mockUserClerkId: userClerkId,
  }).select("_id");

  // console.log({ studentId });
  // console.log({ sessionId });

  const joinedStudent = new JoinedStudent({
    studentId,
    sessionId,
  });
  await joinedStudent.save();

  const updatedSession = await Session.findByIdAndUpdate(
    sessionId,
    {
      $push: { studentCount: studentId },
    },
    { new: true }
  );
  return { joinedStudent, updatedSession };
};
