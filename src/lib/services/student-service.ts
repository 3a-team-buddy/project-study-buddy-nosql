import { StudentMock } from "../models/StudentMock";
import connectDB from "../mongodb";

export const getAllMockStudets = async () => {
  try {
    await connectDB();
    return await StudentMock.find();
  } catch (error) {
    console.error("Error while getting mock student data!", error);
  }
};

export const createMockStudent = async (
  studentImage: string,
  studentEmail: string,
  studentName: string,
  studentClerckId: string
) => {
  await connectDB();

  const unistudent = await StudentMock.findById(studentClerckId);
  // dahij harah -->aldaa tai bgaa
  // if (unistudent) {
  //   return;
  // }

  const mockStudent = new StudentMock({
    clerckId: studentClerckId,
    name: studentName,
    image: studentImage,
    email: studentEmail,
  });
  await mockStudent.save();
  return mockStudent;
};
