import { MockTopic } from "../models/MockTopic";
import connectDB from "../mongodb";

export const getAllMockTopics = async () => {
  try {
    await connectDB();
    return await MockTopic.find().select("-__v");
  } catch (error) {
    console.error("Error while getting mock topics!", error);
  }
};

export const createMockTopic = async (
  mockTitle: string,
  mockDescription: string
) => {
  await connectDB();

  const newMockTopic = new MockTopic({ mockTitle, mockDescription });
  await newMockTopic.save();
  return newMockTopic;
};
