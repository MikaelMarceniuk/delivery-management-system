export function minutesToSeconds(minutes: number) {
  return minutes * 60;
}

export function daysToSeconds(days: number) {
  return days * 24 * 60 * 60;
}

export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutesToSeconds(minutes) * 1000);
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + daysToSeconds(days) * 1000);
}
