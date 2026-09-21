import { Check, Globe } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Language } from "../../lib/types";

interface LanguageSelectorProps {
  theme: "dark" | "light";
  language: Language;
  setLanguage: (lang: Language) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  label: string;
  buttonId?: string;
}

const THEME_STYLES: Record<
  LanguageSelectorProps["theme"],
  { button: string; panel: string; option: string; check: string }
> = {
  dark: {
    button: "text-white hover:bg-white/5",
    panel: "bg-neutral-950 border-white/10 shadow-2xl",
    option: "hover:bg-white/5",
    check: "text-white",
  },
  light: {
    button: "text-neutral-800 hover:bg-neutral-100",
    panel: "bg-white border-neutral-200 text-neutral-800 shadow-xl",
    option: "hover:bg-neutral-50",
    check: "text-neutral-800",
  },
};

const OPTIONS: { code: Language; label: string }[] = [
  { code: "en", label: "ENGLISH (ENG)" },
  { code: "it", label: "ITALIANO (ITA)" },
];

/**
 * Globe icon + "ENG/ITA" trigger button with a language dropdown.
 * Themed for both the dark (standard) and light (expanded) header.
 */
export default function LanguageSelector({
  theme,
  language,
  setLanguage,
  isOpen,
  setIsOpen,
  label,
  buttonId,
}: LanguageSelectorProps) {
  const styles = THEME_STYLES[theme];

  return (
    <div className="relative flex h-full items-center">
      <button
        id={buttonId}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-20 cursor-pointer items-center gap-2 px-4 font-sans text-xs font-medium tracking-widest uppercase transition-colors sm:px-6 sm:text-sm ${styles.button}`}
      >
        <Globe className="h-3.5 w-3.5 stroke-[1.5]" />
        <span>{label}</span>
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
              {OPTIONS.map((option) => (
                <button
                  key={option.code}
                  onClick={() => {
                    setLanguage(option.code);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-5 py-3 text-left font-sans text-xs tracking-wider transition-colors sm:text-sm ${styles.option}`}
                >
                  {option.label}
                  {language === option.code && (
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
