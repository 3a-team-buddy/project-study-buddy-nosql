export type MockTopicType = {
  _id: string;
  mockTitle: string;
  mockDescription: string;
};

export type MockTutorType = {
  _id: string;
  mockTutorName: string;
  mockTutorEmail: string;
  mockTutorImage: string;
};

export type StudentMockType = {
  _id: string;
  clerkId: string;
  name: string;
  email: string;
  image: string;
};

export type SelectedTutorType = {
  mockTutorEmail: string;
};
