export const SESSION_FILTER_STATUS = [
  "WAITING",
  "ACCEPTED",
  "CANCELED",
  "DELETED",
] as const;

export type sessionFilterStatus =
  | (typeof SESSION_FILTER_STATUS)[number]
  | "DEFAULT";
