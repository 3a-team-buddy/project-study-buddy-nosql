import connectDB from "../mongodb";
import mongoose from "mongoose";
import { MockTutor } from "../models/MockTutor";
import { SelectedTutor } from "../models/SelectedTutor";
import { SelectedTutorType } from "../types";

export const createSelectedTutor = async (
  selectedTutors: SelectedTutorType[],
  createdSessionId: string
) => {
  await connectDB();

  const tutorsEmail = selectedTutors.map(
    (selectedTutor) => selectedTutor.mockTutorEmail
  );

  const foundTutors = await MockTutor.find(
    {
      mockTutorEmail: { $in: tutorsEmail },
    },
    "_id"
  );

  const tutors = foundTutors.map((tutor) => ({
    tutorId: tutor._id,
    invitationStatus: "WAITING",
  }));

  const newSelectedTutors = new SelectedTutor({
    tutors,
    createdSessionId: new mongoose.Types.ObjectId(createdSessionId),
  });

  await newSelectedTutors.save();
  return newSelectedTutors;
};
