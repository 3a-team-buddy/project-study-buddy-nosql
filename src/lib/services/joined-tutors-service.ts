import { MockJoinedTutor } from "../models/MockJoinedTutors";
import { MockTutor } from "../models/MockTutor";
import connectDB from "../mongodb";

export const getAllJoinedTutors = async () => {
  try {
    await connectDB();
    return await MockTutor.find();
  } catch (error) {
    console.error("Error", error);
  }
};

export const createMockJoinedTutors = async (
  mockJoinedTutorsId: string[]
  //   mockJoinedTutorSessionId: string,
  //   mockJoinedTutorStatus: string,
  //   mockJoinedTutorInbvitationStatus: string
) => {
  await connectDB();

  const foundTutor = await MockJoinedTutor.findOne({});
  if (foundTutor) {
    return null;
  }

  const mockStudent = new MockJoinedTutor({
    mockJoinedTutorsId,
    // mockJoinedTutorSessionId,
    // mockJoinedTutorStatus,
    // mockJoinedTutorInbvitationStatus,
  });

  await mockStudent.save();
  return mockStudent;
};
