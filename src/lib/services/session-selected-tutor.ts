import { MockTutor } from "../models/MockTutor";
import { SessionSelectedTutor } from "../models/SessionSelectedTutor";
import connectDB from "../mongodb";
import { SelectedTutorType } from "../types";

export const createSessionSelectedTutor = async (
  selectedTutor: SelectedTutorType
) => {
  await connectDB();

  const foundTutorId = await MockTutor.find(
    {
      mockTutorEmail: { $in: selectedTutor.mockTutorEmail },
    },
    "_id"
  );

  const newSessionSelectedTutor = new SessionSelectedTutor(foundTutorId);
  await newSessionSelectedTutor.save();
  return newSessionSelectedTutor;
};
// selectedTutors.map(async (selectedTutor: any) => {
//   await createSessionSelectedTutor(selectedTutor);
// });
// {
//   selectedTutors: [
//     { mockTutorEmail: "erdenetsogt.a@pinecone.mn" },
//     { mockTutorEmail: "Lkhagva-Erdene.B@nest.edu.mn" },
//     { mockTutorEmail: "bilguun.b@nest.edu.mn" },
//   ];
// }
// const foundPriorityTutors = await MockTutor.find(
//   {
//     mockTutorEmail: { $in: emails },
//   },
//   "_id"
// ).lean();
