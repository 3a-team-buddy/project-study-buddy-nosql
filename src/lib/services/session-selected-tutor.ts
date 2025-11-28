import { MockTutor } from "../models/MockTutor";
import { SessionSelectedTutor } from "../models/SessionSelectedTutor";
import connectDB from "../mongodb";
import { SelectedTutorType } from "../types";

export const createSessionSelectedTutor = async (
  selectedTutor: SelectedTutorType,
  createdSessionId: string
) => {
  await connectDB();

  const tutorEmail = selectedTutor.mockTutorEmail;
  const foundTutorId = await MockTutor.findOne(
    {
      mockTutorEmail: tutorEmail,
    },
    "_id"
  );
  console.log({ foundTutorId }, "founIDDDD");
  console.log({ createdSessionId }, "SESSID");
  const newSessionSelectedTutor = new SessionSelectedTutor([
    { foundTutorId: foundTutorId._id, createdSessionId },
  ]);
  await newSessionSelectedTutor.save();
  return newSessionSelectedTutor;
};
