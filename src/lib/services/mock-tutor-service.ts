import connectDB from "../mongodb";
import { MockTutor } from "../models/MockTutor";

export const getAllMockTutors = async () => {
  try {
    await connectDB();

    return await MockTutor.find().select("-__v");
  } catch (error) {
    console.error("Error while getting mock tutors data!", error);
  }
};

export const createMockTutor = async (
  mockTutorName: string,
  mockTutorEmail: string,
  mockTutorImage: string
) => {
  await connectDB();

  const newMockTutor = new MockTutor({
    mockTutorName,
    mockTutorEmail,
    mockTutorImage,
  });

  await newMockTutor.save();
  return newMockTutor;
};
