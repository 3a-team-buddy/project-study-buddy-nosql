import mongoose from "mongoose";
import { MockUser } from "../models/MockUser";
import { CreateSessionType } from "../types";

export async function getJoinedStudents(session: CreateSessionType) {
  if (!session?.studentCount || !Array.isArray(session.studentCount)) {
    return [];
  }

  return await MockUser.find(
    {
      _id: {
        $in: session.studentCount.map(
          (id: string) => new mongoose.Types.ObjectId(id)
        ),
      },
    },
    "mockUserEmail"
  );
}
