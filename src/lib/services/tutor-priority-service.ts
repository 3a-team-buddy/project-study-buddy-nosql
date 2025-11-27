import { MockTutor } from "../models/MockTutor";
import { TutorPriorityList } from "../models/TutorPriorityList";
import connectDB from "../mongodb";
import { SelectedTutorType } from "../types";

export const createTutorPriorityList = async (
  selectedTutors: SelectedTutorType[]
) => {
  await connectDB();

  const emails = selectedTutors.map((el) => el.mockTutorEmail);

  const foundPriorityTutors = await MockTutor.find(
    {
      mockTutorEmail: { $in: emails },
    },
    "_id"
  ).lean();
  const foundPriorityTutorsId = foundPriorityTutors.map((el) => el._id);
  console.log({ foundPriorityTutorsId });

  const newTutorPriorityList = new TutorPriorityList(foundPriorityTutorsId);

  await newTutorPriorityList.save();
  return newTutorPriorityList;
};
