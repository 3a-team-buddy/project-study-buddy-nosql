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

  const foundTutors = await MockUser.find({
    mockUserEmail: { $in: tutorsEmail },
  }).select("_id mockUserEmail");

  const reversedFoundTutor = new Map(
    foundTutors.map((tutor) => [tutor.mockUserEmail, tutor._id])
  );

  const createdSelectedTutor = await Promise.all(
    selectedTutors.map((tutor, index) => {
      const matchedTutorId = reversedFoundTutor.get(tutor.mockUserEmail);

      if (!matchedTutorId) {
        return null;
      }

      return SelectedTutor.create({
        tutorId: matchedTutorId,
        createdSessionId,
        order: index + 1,
        invitationStatus: "WAITING",
      });
    })
  );
  return createdSelectedTutor;
};
