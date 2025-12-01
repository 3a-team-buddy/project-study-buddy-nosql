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
  studentClerkId: string;
  studentEmail: string;
  studentName: string;
  studentImage: string;
};

export type SelectedTutorType = {
  mockTutorEmail: string;
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
  creatorId: string;
  status: string;
  studentCount: number;
};

export type JoinedStudentType = {
  _id: string;
  studentId: StudentMockType;
  sessionId: string;
};
