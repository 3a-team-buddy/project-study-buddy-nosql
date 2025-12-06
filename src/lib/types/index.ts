export type MockTopicType = {
  _id: string;
  mockTitle: string;
  mockDescription: string;
};

export type SelectedTutorType = {
  mockUserEmail: string;
  order: number;
};

export type CreateSessionType = {
  _id: string;
  sessionTopicTitle: string;
  description: string;
  minMember: number;
  maxMember: number;
  value: string;
  time: string;
  selectedSessionType: string;
  creatorId: MockUserType;
  studentCount: string[];
  status: string;
  assignedTutor?: MockUserType;
  createdAt: string;
  updatedAt: string;
};

export type JoinedStudentType = {
  _id: string;
  studentId: MockUserType;
  sessionId: CreateSessionType;
};

export type MockUserType = {
  _id: string;
  mockUserClerkId?: string;
  mockUserName: string;
  mockUserEmail: string;
  mockUserImage: string;
  mockUserStatus: string;
};

export type SelectedTutorEmailType = {
  tutorId: { mockUserEmail: string };
};

export type SelectedStudentType = {
  email: string;
};
