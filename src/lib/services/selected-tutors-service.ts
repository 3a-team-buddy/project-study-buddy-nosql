import connectDB from "../mongodb";
import { MockTutor } from "../models/MockTutor";
import { SelectedTutor } from "../models/SelectedTutor";
import { SelectedTutorType } from "../types";

export const getAllSelectedTutors = async (sessionId: string) => {
  await connectDB();

  return await SelectedTutor.find({
    createdSessionId: { $in: sessionId },
  })
    .populate("tutorId")
    .select("-__v");
};

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

  const createdSelectedTutor = await Promise.all(
    foundTutors.map((tutor) =>
      SelectedTutor.create({
        tutorId: tutor._id,
        createdSessionId,
        invitationStatus: "WAITING",
      })
    )
  );

  return createdSelectedTutor;
};
