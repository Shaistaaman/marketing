// Shared types used across LandingPage, PropertySearch, and NavigationHeader.
//
// NOTE: the active UI language is `SupportedLanguage` from `src/i18n/config.ts`
// (read via `useTranslation().i18n.language`), not a type defined here.

export type Guests = {
  adults: number;
  children: number;
  infants: number;
};

export type ActiveTab = "STAY" | "EXPERIENCE" | "OWN";
