/**
 * Shared date-comparison helpers for the range calendar.
 * Used by CalendarMonthGrid to determine cell styling (selected / in-range).
 */

export function isSameDay(d1: Date | null, d2: Date | null): boolean {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function isBetweenDays(
  d: Date,
  start: Date | null,
  end: Date | null,
): boolean {
  if (!start || !end) return false;
  const t = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const s = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  ).getTime();
  const e = new Date(
    end.getFullYear(),
    end.getMonth(),
    end.getDate(),
  ).getTime();
  return t > s && t < e;
}
