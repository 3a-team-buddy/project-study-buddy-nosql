import mongoose, { Schema } from "mongoose";

type studentSchemaType = {
  clerckId: string;
  name: string;
  email: string;
  image: string;
};

const studentSchema = new Schema({
  clerckId: { type: String, required: true },

  name: { type: String },

  email: { type: String, required: true },

  image: { type: String },
});
export const StudentMock =
  mongoose.models.Student ||
  mongoose.model<studentSchemaType>("StudentMockData", studentSchema);
