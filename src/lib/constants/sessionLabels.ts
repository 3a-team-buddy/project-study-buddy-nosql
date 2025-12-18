export const SESSION_STATUS = [
  "WAITING",
  "ACCEPTED",
  "CANCELED",
  "DELETED",
  "ONGOING",
  "COMPLETED",
] as const;

export type StatusKey = (typeof SESSION_STATUS)[number];

export const SESSION_STATUS_MN_MAP: { [key in StatusKey]: string } = {
  WAITING: "Хүлээгдэж буй",
  ACCEPTED: "Баталгаажсан",
  CANCELED: "Цуцлагдсан",
  DELETED: "Устсан",
  ONGOING: "Үргэлжилж буй",
  COMPLETED: "Дууссан",
};

export const SESSION_TYPE = ["TUTOR-LED", "SELF-LED"] as const;
export type SessionTypeKey = (typeof SESSION_TYPE)[number];

export const SESSION_TYPE_MN_MAP: { [key in SessionTypeKey]: string } = {
  "TUTOR-LED": "Ментортой",
  "SELF-LED": "Бие даан",
};
