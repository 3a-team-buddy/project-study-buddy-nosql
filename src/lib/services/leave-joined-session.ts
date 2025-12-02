import { JoinedStudent } from "../models/JoinedStudent";
import connectDB from "../mongodb";

export const leaveJoinedSession = async (
  studentId: string,
  sessionId: string
) => {
  await connectDB();

  const leaveSession = await JoinedStudent.findByIdAndDelete({
    studentId,
    sessionId,
  });

  return { leaveSession };
};
