import { Types } from "mongoose";
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
  isRated?: boolean;

  rating?: RatingType;

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

export type SelectedTutorPopulatedType = {
  _id: Types.ObjectId;
  tutorId: {
    _id: Types.ObjectId;
    mockUserName: string;
    mockUserEmail: string;
  };
  createdSessionId: Types.ObjectId;
  order: number;
  invitationStatus: "WAITING" | "SENT" | "ACCEPTED" | "DECLINED";
  createdAt?: Date;
  updatedAt?: Date;
};

export type RatingType = {
  _id: string;
  sessionId: string;
  selectedSessionRating: "NORMAL" | "GOOD" | "EXCELLENT";
  selectedTutorRating: "NORMAL" | "GOOD" | "EXCELLENT";
  feedback?: string;
  creatorId: MockUserType;
  createdAt?: string;
  updatedAt?: string;
};
