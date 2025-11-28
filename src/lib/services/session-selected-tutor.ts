import { MockTutor } from "../models/MockTutor";
import { SessionSelectedTutor } from "../models/SessionSelectedTutor";
import connectDB from "../mongodb";
import { SelectedTutorType } from "../types";
import mongoose from "mongoose";

export const createSessionSelectedTutor = async (
  // selectedTutor: SelectedTutorType,
  selectedTutors: SelectedTutorType[],
  createdSessionId: string
) => {
  await connectDB();

  // const tutorEmail = selectedTutor.mockTutorEmail;
  const tutorsEmail = selectedTutors.map(
    (selectedTutor) => selectedTutor.mockTutorEmail
  );
  // const foundTutorId = await MockTutor.findOne(
  //   {
  //     mockTutorEmail: tutorEmail,
  //   },
  //   "_id"
  // );

  const foundTutorsId = await MockTutor.find(
    {
      mockTutorEmail: { $in: tutorsEmail },
    },
    "_id"
  );

  console.log({ foundTutorId }, "founIDDDD");
  console.log({ createdSessionId }, "SESSID");
  const newSessionSelectedTutor = new SessionSelectedTutor({
    foundTutorId: foundTutorId._id,
    createdSessionId: new mongoose.Types.ObjectId(createdSessionId),
  });
  await newSessionSelectedTutor.save();
  return newSessionSelectedTutor;
};
