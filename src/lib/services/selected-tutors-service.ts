import connectDB from "../mongodb";
import { SelectedTutor } from "../models/SelectedTutor";
import { SelectedTutorType } from "../types";
import { MockUser } from "../models/MockUser";

export const getAllSelectedTutors = async (sessionId: string) => {
  await connectDB();

  return await SelectedTutor.find({
    createdSessionId: sessionId,
  })
    .populate("tutorId", "mockUserEmail -_id")
    .select("tutorId -_id")
    .lean();
};

export const createSelectedTutor = async (
  selectedTutors: SelectedTutorType[],
  createdSessionId: string
) => {
  await connectDB();

  const tutorsEmail = selectedTutors.map(
    (selectedTutor) => selectedTutor.mockUserEmail
  );

  const foundTutors = await MockUser.find(
    {
      mockUserEmail: { $in: tutorsEmail },
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
