export type ReviewState = "Overdue" | "Due today" | "Planned";

export function reviewState(nextReview: string, asOf: string): ReviewState {
  return nextReview < asOf
    ? "Overdue"
    : nextReview === asOf
      ? "Due today"
      : "Planned";
}

export function jakartaDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = (type: string) =>
    parts.find((part) => part.type === type)!.value;
  return `${value("year")}-${value("month")}-${value("day")}`;
}
