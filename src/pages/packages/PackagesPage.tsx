import { Check, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ExperienceVideoSection from "../../components/sections/ExperienceVideoSection";
import AllExperiences from "../experiences/sections/AllExperiences";
import Package from "../landing/sections/Package";
import Testimonial from "../landing/sections/Testimonial";
// import GalleryPkg from "./sections/GalleryPkg";

const HERO_IMAGE = "/images/packagebanner.jpg";

const DESTINATION_OPTIONS = [
  "romeAmalfi",
  "florenceVeniceRome",
  "sardiniaSicily",
  "amalfiCapri",
  "comoMilan",
  "tuscanyOrcia",
  "notSure",
] as const;

type DestinationOptionKey = (typeof DESTINATION_OPTIONS)[number];

const VIBE_OPTIONS = [
  "luxuryCulture",
  "coastalRelaxation",
  "foodWine",
  "familyAdventure",
  "romanticEscape",
  "activeOutdoors",
] as const;

type VibeOptionKey = (typeof VIBE_OPTIONS)[number];

export default function PackagesPage() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dream journey form
  const [dreamDestination, setDreamDestination] =
    useState<DestinationOptionKey>(DESTINATION_OPTIONS[0]);
  const [dreamVibe, setDreamVibe] = useState<VibeOptionKey>(VIBE_OPTIONS[0]);
  const [dreamNotes, setDreamNotes] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryCode, setInquiryCode] = useState("");

  const handleDreamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail) return;
    const code = Math.floor(100000 + Math.random() * 900000);
    setInquiryCode(`SKYLIFE-PKG-${code}`);
    setIsSubmitted(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setUserName("");
    setUserEmail("");
    setDreamNotes("");
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 font-sans text-white selection:bg-amber-300 selection:text-black">
      {/* HERO */}
      <div className="relative flex h-screen min-h-[640px] w-full flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="Skylife curated travel packages"
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center brightness-75 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center px-6 py-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 font-serif text-[clamp(1.5rem,5vw,4.5rem)] leading-none font-normal tracking-tight text-white italic drop-shadow-md"
          >
            {t("packagesPage.hero.heading")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 mb-12 max-w-3xl font-sans text-base leading-relaxed font-normal tracking-[0.08em] text-white/90 sm:text-lg"
          >
            {t("packagesPage.hero.body")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer rounded-none border border-white/90 bg-black/20 px-8 py-4 font-sans text-xs font-medium tracking-[0.2em] text-white uppercase shadow-2xl backdrop-blur-xs transition-all duration-300 select-none hover:bg-white hover:text-black sm:px-10 sm:py-5 sm:text-sm"
            >
              {t("packagesPage.hero.cta")}
            </button>
          </motion.div>
        </div>
      </div>

      {/* <GalleryPkg /> */}
      <Package />
      <AllExperiences />
      <Testimonial />
      <ExperienceVideoSection />

      {/* DREAM JOURNEY MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 z-50 cursor-pointer bg-black/70 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-lg bg-white p-8 text-neutral-900 shadow-2xl sm:p-10"
              >
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 cursor-pointer p-1 text-neutral-400 transition-colors hover:text-neutral-900"
                  aria-label={t("common.aria.close")}
                >
                  <X className="h-5 w-5" />
                </button>

                {isSubmitted ? (
                  <div className="py-6 text-center">
                    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900">
                      <Check className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="mb-3 font-serif text-2xl font-normal text-neutral-900 italic sm:text-3xl">
                      {t("packagesPage.modal.successTitle")}
                    </h3>
                    <p className="mx-auto mb-4 max-w-sm text-sm leading-relaxed font-light text-neutral-600">
                      {t("packagesPage.modal.successBody", {
                        firstName: userName.split(" ")[0],
                        destination: t(
                          `packagesPage.destinationOptions.${dreamDestination}`,
                        ),
                      })}
                    </p>
                    <p className="mb-8 font-mono text-xs text-neutral-500">
                      {t("requestModal.reference", { code: inquiryCode })}
                    </p>
                    <button
                      onClick={handleCloseModal}
                      className="cursor-pointer bg-neutral-900 px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-black"
                    >
                      {t("common.actions.close")}
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="mb-1 font-serif text-2xl font-normal text-neutral-900 italic sm:text-3xl">
                      {t("packagesPage.modal.title")}
                    </h3>
                    <p className="mb-6 text-xs font-light text-neutral-500">
                      {t("packagesPage.modal.subtitle")}
                    </p>

                    <form onSubmit={handleDreamSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="pkg-name"
                          className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                        >
                          {t("requestModal.fullName")}
                        </label>
                        <input
                          id="pkg-name"
                          type="text"
                          required
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="w-full border border-neutral-300 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder-neutral-400 focus:border-neutral-900 focus:outline-none"
                          placeholder={t("requestModal.fullNamePlaceholder")}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="pkg-email"
                          className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                        >
                          {t("requestModal.email")}
                        </label>
                        <input
                          id="pkg-email"
                          type="email"
                          required
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          className="w-full border border-neutral-300 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder-neutral-400 focus:border-neutral-900 focus:outline-none"
                          placeholder={t("requestModal.emailPlaceholder")}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="pkg-destination"
                          className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                        >
                          {t("packagesPage.modal.destinationLabel")}
                        </label>
                        <select
                          id="pkg-destination"
                          value={dreamDestination}
                          onChange={(e) =>
                            setDreamDestination(
                              e.target.value as DestinationOptionKey,
                            )
                          }
                          className="w-full cursor-pointer appearance-none border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 transition-colors focus:border-neutral-900 focus:outline-none"
                        >
                          {DESTINATION_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {t(`packagesPage.destinationOptions.${opt}`)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="pkg-vibe"
                          className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                        >
                          {t("packagesPage.modal.vibeLabel")}
                        </label>
                        <select
                          id="pkg-vibe"
                          value={dreamVibe}
                          onChange={(e) =>
                            setDreamVibe(e.target.value as VibeOptionKey)
                          }
                          className="w-full cursor-pointer appearance-none border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 transition-colors focus:border-neutral-900 focus:outline-none"
                        >
                          {VIBE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {t(`packagesPage.vibeOptions.${opt}`)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="pkg-notes"
                          className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                        >
                          {t("packagesPage.modal.notesLabel")}
                        </label>
                        <textarea
                          id="pkg-notes"
                          value={dreamNotes}
                          onChange={(e) => setDreamNotes(e.target.value)}
                          rows={3}
                          className="w-full resize-none border border-neutral-300 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder-neutral-400 focus:border-neutral-900 focus:outline-none"
                          placeholder={t("packagesPage.modal.notesPlaceholder")}
                        />
                      </div>

                      <button
                        type="submit"
                        className="flex w-full cursor-pointer items-center justify-center gap-2 bg-neutral-900 px-6 py-4 text-xs font-semibold tracking-[0.2em] text-white uppercase shadow-md transition-all hover:bg-black"
                      >
                        <Send className="h-4 w-4" />
                        <span>{t("packagesPage.modal.submit")}</span>
                      </button>

                      <p className="text-center text-[11px] leading-relaxed font-light text-neutral-400 italic">
                        {t("packagesPage.modal.disclaimer")}
                      </p>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
