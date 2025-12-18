import { isToday } from "date-fns";
import dayjs from "dayjs";

export function getRemainingDay(date: string) {
  const today = dayjs().startOf("day");
  const target = dayjs(date).startOf("day");

  const diff = target.diff(today, "day");

  return {
    days: diff,
    isToday: diff === 0,
    isExpired: diff < 0,
    label:
      diff < 0 ? "Дууссан" : diff === 0 ? "Өнөөдөр" : `${diff} өдөр үлдлээ`,
  };
}
