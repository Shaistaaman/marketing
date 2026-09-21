import type { Language } from "./types";

/**
 * Formats a date for display, or returns a fallback string (e.g. "Add date")
 * when no date has been selected yet.
 */
export function getFormattedDate(
  date: Date | null,
  language: Language,
  fallback: string,
): string {
  if (!date) return fallback;
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString(
    language === "en" ? "en-US" : "it-IT",
    options,
  );
}
