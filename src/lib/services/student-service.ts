import { StudentMock } from "../models/StudentMock";
import connectDB from "../mongodb";

export const getAllMockStudets = async () => {
  try {
    await connectDB();
    return await StudentMock.find();
  } catch (error) {
    console.error("Error while getting students mock datas!", error);
  }
};

export const createMockStudent = async (
  studentImage: string,
  studentEmail: string,
  studentName: string,
  studentClerkId: string
) => {
  await connectDB();

  const foundStudent = await StudentMock.findOne({ clerkId: studentClerkId });
  if (foundStudent) {
    return null;
  }

  const mockStudent = new StudentMock({
    clerkId: studentClerkId,
    name: studentName,
    image: studentImage,
    email: studentEmail,
  });

  await mockStudent.save();
  return mockStudent;
};
