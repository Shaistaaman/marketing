import type { SupportedLanguage } from "../i18n/config";

const LOCALE_MAP: Record<SupportedLanguage, string> = {
  en: "en-US",
  it: "it-IT",
};

/**
 * Formats a date for display, or returns a fallback string (e.g. "Add date")
 * when no date has been selected yet. `language` should come from
 * `i18n.language` (via `useTranslation()`), not a locally-held value.
 */
export function getFormattedDate(
  date: Date | null,
  language: SupportedLanguage,
  fallback: string,
): string {
  if (!date) return fallback;
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString(
    LOCALE_MAP[language] ?? LOCALE_MAP.en,
    options,
  );
}
