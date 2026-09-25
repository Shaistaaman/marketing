import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import it from "./locales/it.json";

export const SUPPORTED_LANGUAGES = ["en", "it"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = "en";

/** localStorage key. Also referenced by the LanguageDetector's own cache option. */
export const LANGUAGE_STORAGE_KEY = "skylife.language";

/**
 * i18next setup for UI-chrome strings (nav, buttons, labels, form fields).
 *
 * This is deliberately separate from entity content (property/experience/
 * package titles and descriptions) — see Context_Instruction.md §11.
 * Content translation belongs to a future backend `*_translations` table,
 * not this resource bundle.
 *
 * Persistence: localStorage only, via i18next-browser-languagedetector.
 * Default: English on first visit — we do NOT auto-switch based on the
 * browser's language, per product decision.
 */
void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      it: { translation: it },
    },
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    nonExplicitSupportedLngs: true,

    detection: {
      // Only ever read/write localStorage. No navigator/htmlTag detection,
      // so a first-time visitor always gets English regardless of browser
      // locale, per the "English default" product decision.
      order: ["localStorage"],
      caches: ["localStorage"],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
    },

    interpolation: {
      escapeValue: false, // React already escapes.
    },

    returnNull: false,
  });

export default i18n;
