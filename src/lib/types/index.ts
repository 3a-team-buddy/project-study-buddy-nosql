import { ReactNode } from "react";

export type MockTopicType = {
  _id: string;
  mockTitle: string;
  mockDescription: string;
};

export type SelectedTutorType = {
  mockUserEmail: string;
};

export type CreateSessionType = {
  joinedStudents: any;
  title: ReactNode;
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
  studentCount: number[];
  createdAt: string;
  updatedAt: string;
};

export type JoinedStudentType = {
  _id: string;
  studentId: MockUserType;
  sessionId: string;
};

export type MockUserType = {
  _id: string;
  mockUserClerkId?: string;
  mockUserName: string;
  mockUserEmail: string;
  mockUserImage: string;
  mockUserStatus: string;
};

export type SelectedTutorDBType = {
  _id: string;
  tutorId: MockUserType;
  createdSessionId: string;
  invitationStatus: string;
};
export type SelectedStudentType = {
  email: string;
};
