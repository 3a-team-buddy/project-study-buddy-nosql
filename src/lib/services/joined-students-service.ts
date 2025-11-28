import { MockJoinedStudent } from "../models/MockJoinedStudent";
import { StudentMock } from "../models/StudentMock";
import connectDB from "../mongodb";

export const CreateAllJoinedStudent = async (
  studentClerkId: string,
  joinedStudentSessionId: string
) => {
  await connectDB();
  const studentId = await StudentMock.findOne({
    studentClerkId: studentClerkId,
  }).select("_id");

  console.log({ studentId });
  const JoinedStudent = new MockJoinedStudent({
    studentId,
    joinedStudentSessionId,
  });
  await JoinedStudent.save();
  return JoinedStudent;
};
