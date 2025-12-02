import connectDB from "../mongodb";
import { JoinedStudent } from "../models/JoinedStudent";
import { StudentMock } from "../models/StudentMock";
import { Session } from "../models/Session";

export const getAllJoinedStudents = async (sessionId: string) => {
  await connectDB();

  return await JoinedStudent.find({ sessionId: { $in: sessionId } })
    .populate("studentId")
    .select("-__v");
};

export const createJoinedStudent = async (
  studentClerkId: string,
  sessionId: string
) => {
  await connectDB();

  const studentId = await StudentMock.findOne({
    studentClerkId: studentClerkId,
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
