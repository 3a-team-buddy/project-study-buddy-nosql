import connectDB from "../mongodb";
import { MockUser } from "../models/MockUser";

export const getAllTeachers = async () => {
  try {
    await connectDB();

    return await MockUser.find({ mockUserStatus: "TEACHER" }).select("-__v");
  } catch (error) {
    console.error("Error while getting teachers data!", error);
  }
};
