export type MockTopicType = {
  _id: string;
  mockTitle: string;
  mockDescription: string;
};

export type MockUserType = {
  _id: string;
  mockUserClerkId?: string;
  mockUserName: string;
  mockUserEmail: string;
  mockUserImage: string;
  mockUserStatus: string;
  createdAt?: string;
  updatedAt?: string;
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
  studentCount?: string[];
  status: string;
  assignedTutor?: MockUserType;
  createdAt?: string;
  updatedAt?: string;
};

export type JoinedStudentType = {
  _id: string;
  studentId: MockUserType;
  sessionId: CreateSessionType;
  createdAt?: string;
  updatedAt?: string;
};

export type SelectedTutorDBType = {
  _id: string;
  tutorId: MockUserType;
  createdSessionId: CreateSessionType;
  order: number;
  invitationStatus: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SelectedTutorEmailType = {
  tutorId: { mockUserEmail: string };
};

export type SelectedStudentType = {
  email: string;
};

// export interface CreateSessionType {
//   _id: string;
//   sessionTopicTitle: string;
//   description: string;
//   value: string; // date
//   time: string;
//   selectedSessionType: string;
//   status?: "WAITING" | "ACCEPTED" | string;
//   studentCount?: string[];
//   maxMember: number;
//   assignedTutor?: {
//     name: string;
//     image: string;
//   };
// }

// export interface JoinedStudentType {
//   _id: string;
//   studentId: {
//     mockUserName: string;
//     mockUserImage: string;
//   };
// }

// export interface SessionCardData extends CreateSessionType {
//   id: string;
//   category: "Created Sessions" | "Joined Sessions" | "More Sessions";
// }
