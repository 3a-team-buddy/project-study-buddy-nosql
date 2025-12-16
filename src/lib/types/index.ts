import { SessionTypeKey, StatusKey } from "../constants/sessionLabels";

export type MockTopicType = {
  _id: string;
  mockTitle: string;
  mockDescription: string;
};

export type MockUserType = {
  image: string;
  name?: string;
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
  room?: string;
  time: string;
  selectedSessionType: SessionTypeKey;
  creatorId: MockUserType;
  studentCount?: string[];
  status: StatusKey;
  assignedTutor?: MockUserType;
  selectedReward: string;
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

export type SessionListType = "created" | "joined" | "other";
// export interface CreateSessionType1 {
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

// export interface JoinedStudentType1 {
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
