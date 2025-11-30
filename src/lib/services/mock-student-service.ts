import connectDB from "../mongodb";
import { StudentMock } from "../models/StudentMock";

export const getAllMockStudets = async () => {
  try {
    await connectDB();
    return await StudentMock.find();
  } catch (error) {
    console.error("Error while getting students mock datas!", error);
  }
};

export const createMockStudent = async (
  studentClerkId: string,
  studentEmail: string,
  studentName: string,
  studentImage: string
) => {
  await connectDB();

  const foundStudent = await StudentMock.findOne({
    studentClerkId,
  });
  if (foundStudent) {
    return null;
  }

  const mockStudent = new StudentMock({
    studentClerkId,
    studentEmail,
    studentName,
    studentImage,
  });

  await mockStudent.save();
  return mockStudent;
};
