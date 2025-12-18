export function isSessionDuetime(
  date: string,
  time: string,
  now: Date = new Date()
) {
  const sessionDateTime = new Date(date);
  const [hours, minutes] = time.split(":").map(Number);
  sessionDateTime.setHours(hours, minutes, 0, 0);

  return now.getTime() >= sessionDateTime.getTime();
}
