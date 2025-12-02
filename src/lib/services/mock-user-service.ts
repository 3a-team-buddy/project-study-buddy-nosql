import connectDB from "../mongodb";
import { MockUser } from "../models/MockUser";

export const getAllMockUsers = async () => {
  try {
    await connectDB();

    return await MockUser.find().select("-__v");
  } catch (error) {
    console.error("Error while getting mock users data!", error);
  }
};

export const createMockUser = async (
  mockUserName: string,
  mockUserEmail: string,
  mockUserImage: string,
  mockUserStatus: string
) => {
  await connectDB();

  const newMockUser = new MockUser({
    mockUserName,
    mockUserEmail,
    mockUserImage,
    mockUserStatus,
  });

  await newMockUser.save();
  return newMockUser;
};
