import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageSelector from "../components/common/LanguageSelector";
import type { SupportedLanguage } from "../i18n/config";
import { ROUTES } from "../lib/constants";
import NavLinks from "./NavLinks";

export default function NavigationHeader() {
  const { t, i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const activeLanguage = i18n.language as SupportedLanguage;

  const handleNavigate = () => {
    setIsSidebarOpen(false);
  };

  const changeLanguage = (lang: SupportedLanguage) => {
    void i18n.changeLanguage(lang);
  };

  return (
    <>
      {/* Backdrop for the expanded header */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-50 cursor-pointer bg-black/60 backdrop-blur-xs"
          />
        )}
      </AnimatePresence>

      {isSidebarOpen ? (
        /* LIGHT EXPANDED NAVIGATION BAR */
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 z-50 w-full border-b border-neutral-200 bg-[#FAF9F6] text-neutral-900"
        >
          <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between">
            {/* Left: logo */}
            <Link
              to={ROUTES.home}
              onClick={() => setIsSidebarOpen(false)}
              className="flex h-20 shrink-0 cursor-pointer items-center px-4 transition-colors hover:bg-neutral-100 sm:px-6 md:px-8"
            >
              <img
                src="/images/logo-black.png"
                alt="Skylife"
                width={80}
                height={28}
                className="object-contain transition-opacity duration-300 hover:opacity-80"
              />
            </Link>

            {/* Center links (desktop) */}
            <NavLinks variant="desktop" onNavigate={handleNavigate} />

            {/* Right controls (desktop) */}
            <div className="hidden h-full items-center lg:flex">
              <LanguageSelector
                theme="light"
                isOpen={isLanguageOpen}
                setIsOpen={setIsLanguageOpen}
                buttonId="lang-selector-btn-light"
              />

              <button
                id="book-your-stay-btn-light"
                onClick={() => setIsSidebarOpen(false)}
                className="flex h-20 cursor-pointer items-center justify-center border-l border-neutral-200 px-5 font-sans text-xs font-semibold tracking-widest whitespace-nowrap text-neutral-900 uppercase transition-all duration-350 select-none hover:bg-neutral-900 hover:text-white sm:px-8 sm:text-sm"
              >
                {t("common.actions.bookYourStay")}
              </button>
            </div>

            {/* Mobile: close button */}
            <div className="flex h-full items-center lg:hidden">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="flex h-20 cursor-pointer items-center justify-center px-6 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                aria-label={t("common.aria.closeMenu")}
              >
                <X className="h-6 w-6 stroke-[1.5]" />
              </button>
            </div>
          </div>

          {/* Mobile expanded sub-navigation */}
          <div className="block space-y-6 border-t border-neutral-100 bg-[#FAF9F6] px-6 py-8 lg:hidden">
            <NavLinks variant="mobile" onNavigate={handleNavigate} />

            <div className="my-6 h-[1px] w-full bg-neutral-200" />

            <div className="space-y-5">
              {/* Language pills */}
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs font-medium tracking-widest text-neutral-400 uppercase">
                  {t("languageMenu.language")}
                </span>
                <div className="flex overflow-hidden rounded-none border border-neutral-200 bg-white">
                  <button
                    onClick={() => changeLanguage("en")}
                    className={`px-4 py-1.5 font-sans text-xs font-semibold tracking-wider transition-all ${
                      activeLanguage === "en"
                        ? "bg-neutral-900 text-white"
                        : "text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    {t("languageMenu.english")}
                  </button>
                  <button
                    onClick={() => changeLanguage("it")}
                    className={`px-4 py-1.5 font-sans text-xs font-semibold tracking-wider transition-all ${
                      activeLanguage === "it"
                        ? "bg-neutral-900 text-white"
                        : "text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    {t("languageMenu.italian")}
                  </button>
                </div>
              </div>

              {/* Book Your Stay */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-none bg-neutral-900 py-4 font-sans text-xs font-semibold tracking-widest text-white uppercase shadow-md transition-all duration-300 hover:bg-black active:scale-[0.98] sm:text-sm"
              >
                <span>{t("common.actions.bookYourStay")}</span>
              </button>
            </div>
          </div>
        </motion.header>
      ) : (
        /* STANDARD DARK MINIMAL HEADER */
        <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/65 backdrop-blur-md">
          <div className="relative mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between">
            {/* Left: hamburger */}
            <button
              id="nav-menu-btn"
              onClick={() => setIsSidebarOpen(true)}
              className="z-10 flex h-20 cursor-pointer items-center justify-center border-r border-white/10 px-6 text-white transition-colors hover:bg-white/5 active:bg-white/10 sm:px-8"
              aria-label={t("common.aria.openMenu")}
            >
              <Menu className="h-5 w-5 stroke-[1.25]" />
            </button>

            {/* Center: logo */}
            <Link
              to={ROUTES.home}
              className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            >
              <img
                src="/images/logo-beige.png"
                alt="Skylife"
                width={80}
                height={28}
                className="object-contain transition-opacity duration-300 hover:opacity-80"
              />
            </Link>

            {/* Right controls */}
            <div className="z-10 hidden h-full items-center lg:flex">
              <LanguageSelector
                theme="dark"
                isOpen={isLanguageOpen}
                setIsOpen={setIsLanguageOpen}
                buttonId="lang-selector-btn"
              />

              <button
                id="book-your-stay-btn"
                className="flex h-20 cursor-pointer items-center justify-center border-l border-white/10 px-5 font-sans text-xs font-medium tracking-widest whitespace-nowrap text-white uppercase transition-all duration-300 select-none hover:bg-white hover:text-black sm:px-8 sm:text-sm"
              >
                {t("common.actions.bookYourStay")}
              </button>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
