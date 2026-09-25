import { Check, Globe } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "../../i18n/config";

interface LanguageSelectorProps {
  theme: "dark" | "light";
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  buttonId?: string;
}

const THEME_STYLES: Record<
  LanguageSelectorProps["theme"],
  { button: string; panel: string; option: string; check: string }
> = {
  dark: {
    button: "text-white hover:bg-white/5",
    panel: "bg-neutral-950 border-white/10 shadow-2xl",
    option: "text-white hover:bg-white/5",
    check: "text-white",
  },
  light: {
    button: "text-neutral-800 hover:bg-neutral-100",
    panel: "bg-white border-neutral-200 text-neutral-800 shadow-xl",
    option: "hover:bg-neutral-50",
    check: "text-neutral-800",
  },
};

const DISPLAY_LABEL: Record<SupportedLanguage, string> = {
  en: "Eng",
  it: "Ita",
};

const OPTION_LABEL: Record<SupportedLanguage, string> = {
  en: "ENGLISH (ENG)",
  it: "ITALIANO (ITA)",
};

/**
 * Globe icon + "Eng/Ita" trigger button with a language dropdown.
 * Themed for both the dark (standard) and light (expanded) header.
 *
 * Reads and writes the active language directly through i18next — this is
 * the single source of truth for language across the whole app. Do not
 * reintroduce a local `useState<Language>` here or in any caller; that was
 * the original bug (NavigationHeader and ExperiencesPage each held their
 * own independent language state, so switching language in one place did
 * nothing anywhere else).
 */
export default function LanguageSelector({
  theme,
  isOpen,
  setIsOpen,
  buttonId,
}: LanguageSelectorProps) {
  const { i18n } = useTranslation();
  const styles = THEME_STYLES[theme];
  const activeLanguage = i18n.language as SupportedLanguage;

  return (
    <div className="relative flex h-full items-center">
      <button
        id={buttonId}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-20 cursor-pointer items-center gap-2 px-4 font-sans text-xs font-medium tracking-widest uppercase transition-colors sm:px-6 sm:text-sm ${styles.button}`}
      >
        <Globe className="h-3.5 w-3.5 stroke-[1.5]" />
        <span>{DISPLAY_LABEL[activeLanguage] ?? DISPLAY_LABEL.en}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
              className={`absolute top-[100%] right-0 z-50 w-40 rounded-b-lg border py-1 ${styles.panel}`}
            >
              {SUPPORTED_LANGUAGES.map((code) => (
                <button
                  key={code}
                  onClick={() => {
                    void i18n.changeLanguage(code);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-5 py-3 text-left font-sans text-xs tracking-wider transition-colors sm:text-sm ${styles.option}`}
                >
                  {OPTION_LABEL[code]}
                  {activeLanguage === code && (
                    <Check className={`h-3 w-3 ${styles.check}`} />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
