import { JoinedStudent } from "../models/JoinedStudent";
import connectDB from "../mongodb";

export const leaveJoinedSession = async (studentClerkId: string) => {
  await connectDB();

  const leaveSession = await JoinedStudent.findByIdAndDelete({
    studentId: studentClerkId,
  });

  return { leaveSession };
};
