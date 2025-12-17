export function isSessionExpired(
  date: string,
  time: string,
  now: Date = new Date()
) {
  const sessionDateTime = new Date(`${date}T${time}:00`);
  return now > sessionDateTime;
}
