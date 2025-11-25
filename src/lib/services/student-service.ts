import { StudentMock } from "../models/StudentMock";
import connectDB from "../mongodb";
import { MockTutorType } from "../types";

export const getAllMockTutors = async () => {
  try {
    await connectDB();
    return await StudentMock.find();
  } catch (error) {
    console.error("Error while getting mock tutor!", error);
  }
};

export const createMockTutor = async (
  mockTutorName: string,
  mockTutorEmail: string,
  mockTutorImage: string
) => {
  await connectDB();
  const newMockTutor = new StudentMock({
    mockTutorName,
    mockTutorEmail,
    mockTutorImage,
  });
  await newMockTutor.save();
  return newMockTutor;
};
