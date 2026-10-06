import {
  Check,
  ChevronLeft,
  ChevronRight,
  Grid,
  Heart,
  Send,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CTAGetPro from "../../components/sections/CTAGetPro";
// import ExperienceVideoSection from "../../components/sections/ExperienceVideoSection";
import {
  DEFAULT_EXPERIENCE,
  findExperienceDetail,
} from "../../data/experiences";
import Testimonial from "../landing/sections/Testimonial";

const GUEST_OPTION_KEYS = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "sixPlus",
] as const;

type GuestOptionKey = (typeof GUEST_OPTION_KEYS)[number];

export default function ExperienceDetailPage() {
  const { t } = useTranslation();
  const { experienceId } = useParams<{ experienceId: string }>();
  const experience = useMemo(
    () => findExperienceDetail(experienceId),
    [experienceId],
  );

  const [isSaved, setIsSaved] = useState(false);

  // Gallery lightbox
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Request modal
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState<GuestOptionKey>("two");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [reqId, setReqId] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [experienceId]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    const code = Math.floor(100000 + Math.random() * 900000);
    setReqId(`SKYLIFE-EXP-${code}`);
    setSubmitted(true);
  };

  const handleCloseModal = () => {
    setIsRequestModalOpen(false);
    setSubmitted(false);
    setName("");
    setEmail("");
    setDate("");
    setNotes("");
  };

  // Build a 4-image collage, padding from the default experience if needed.
  const galleryImages = useMemo(() => {
    const fallbacks = DEFAULT_EXPERIENCE.images;
    return Array.from(
      { length: 4 },
      (_, i) =>
        experience.images[i] ?? fallbacks[i % fallbacks.length] ?? fallbacks[0],
    );
  }, [experience]);

  return (
    <div className="min-h-screen bg-white pt-24 font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white sm:pt-32">
      <main className="mx-auto max-w-[1280px] px-4 py-8 sm:px-8 sm:py-12 lg:px-12">
        {/* BREADCRUMB + ACTIONS */}
        <div className="flex w-full items-center justify-between">
          <div className="mb-4 font-sans text-xs tracking-tight text-neutral-800 sm:text-sm">
            <span>{experience.location}</span>
            <span className="mx-2 text-neutral-400">/</span>
            <span>{experience.categories?.[0]}</span>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <button
              type="button"
              onClick={() => setIsSaved(!isSaved)}
              aria-pressed={isSaved}
              className="flex cursor-pointer items-center gap-2 text-xs font-normal tracking-tight text-neutral-900 transition-colors hover:text-neutral-600 sm:text-sm"
            >
              <Heart
                className={`h-4 w-4 stroke-[1.75] ${
                  isSaved ? "fill-red-500 text-red-500" : ""
                }`}
              />
              <span className="underline underline-offset-4">
                {t("experienceDetail.save")}
              </span>
            </button>
          </div>
        </div>

        {/* TITLE + METADATA */}
        <div className="mb-8 flex flex-col justify-between gap-4 pt-6 sm:mb-12 sm:flex-row sm:items-start sm:pt-1">
          <div>
            <h1 className="mb-3 font-serif text-3xl leading-[1.12] font-normal tracking-tight text-neutral-900 italic sm:text-5xl lg:text-6xl">
              {experience.name}
            </h1>

            <p className="font-sans text-xs font-normal tracking-wide text-neutral-500 italic sm:text-sm">
              {t("experienceDetail.curatedBy", {
                location: experience.location,
              })}
            </p>

            {experience.duration && (
              <span className="mt-3 block font-sans text-sm font-light text-neutral-500">
                {experience.duration}
              </span>
            )}
          </div>

          {/* REQUEST NOW */}
          <div className="shrink-0 pt-4">
            <button
              type="button"
              onClick={() => setIsRequestModalOpen(true)}
              className="w-full cursor-pointer rounded-none bg-black px-10 py-4 font-sans text-xs font-semibold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:bg-neutral-800 sm:w-auto"
            >
              {t("experienceDetail.requestNow")}
            </button>
          </div>
        </div>

        {/* TWO-COLUMN: DESCRIPTION + PHOTO COLLAGE */}
        <div className="mb-16 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12 sm:mb-24">
          {/* LEFT */}
          <div className="flex flex-col justify-between space-y-8 pr-0 lg:col-span-5 lg:pr-4">
            <p className="max-w-[680px] font-sans text-sm leading-relaxed font-light text-neutral-900 sm:text-base">
              {experience.description}
            </p>

            <section className="max-w-4xl pt-8">
              <h2 className="mb-8 font-serif text-4xl font-normal tracking-tight text-neutral-900 italic sm:text-5xl">
                {t("experienceDetail.keyPoints")}
              </h2>

              <div className="space-y-6 font-sans text-base leading-relaxed font-light text-neutral-800 sm:text-lg">
                {experience.highlights?.map((highlight, idx) => (
                  <p key={idx}>{highlight}</p>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT: collage */}
          <div className="grid grid-cols-1 gap-3 lg:col-span-7">
            {/* Wide banner */}
            <div className="relative aspect-[2.2/1] w-full overflow-hidden rounded-none bg-neutral-100">
              <img
                src={galleryImages[0]}
                alt={experience.name}
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>

            {/* Bottom split */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-3">
                {[galleryImages[1], galleryImages[2]].map((img, idx) => (
                  <div
                    key={`${img}-${idx}`}
                    className="relative aspect-[1.3/1] w-full overflow-hidden bg-neutral-100"
                  >
                    <img
                      src={img}
                      alt={`${experience.name} detail ${idx + 1}`}
                      loading="eager"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>

              <div className="relative h-full min-h-[220px] w-full overflow-hidden bg-neutral-100">
                <img
                  src={galleryImages[3]}
                  alt={`${experience.name} detail 3`}
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-center cursor-pointer"
                  onClick={() => {
                    setActiveImageIndex(3);
                    setIsLightboxOpen(true);
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLightboxOpen(true);
                  }}
                  className="absolute right-3 bottom-3 flex cursor-pointer items-center gap-2 rounded-xs border border-neutral-200/80 bg-white/95 px-3.5 py-1.5 font-sans text-xs font-medium text-neutral-900 shadow-sm backdrop-blur-md transition-all hover:bg-black hover:text-white sm:py-2"
                >
                  <Grid className="h-3.5 w-3.5" />
                  <span>{t("propertyDetail.seeAllPhotos")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* LIGHTBOX */}
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 p-6 backdrop-blur-md sm:p-10"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4 text-white">
                <span className="font-serif text-xl italic">
                  {t("propertyDetail.lightbox.galleryTitle", {
                    title: experience.name,
                    current: activeImageIndex + 1,
                    total: galleryImages.length,
                  })}
                </span>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="cursor-pointer p-2 text-neutral-400 transition-colors hover:text-white"
                  aria-label={t("common.aria.close")}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="relative my-6 flex flex-1 items-center justify-center">
                <img
                  src={galleryImages[activeImageIndex]}
                  alt={t("propertyDetail.lightbox.propertyGalleryEnlarged")}
                  className="max-h-[75vh] max-w-full object-contain shadow-2xl"
                />

                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === 0 ? galleryImages.length - 1 : prev - 1,
                        )
                      }
                      className="absolute left-4 cursor-pointer rounded-full border border-neutral-700 bg-black/60 p-3 text-white transition-colors hover:bg-black"
                      aria-label={t("common.aria.previousPhoto")}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === galleryImages.length - 1 ? 0 : prev + 1,
                        )
                      }
                      className="absolute right-4 cursor-pointer rounded-full border border-neutral-700 bg-black/60 p-3 text-white transition-colors hover:bg-black"
                      aria-label={t("common.aria.nextPhoto")}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex items-center justify-center gap-3 overflow-x-auto py-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={`${img}-${idx}`}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-12 w-16 shrink-0 cursor-pointer overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? "scale-105 border-amber-300"
                        : "border-transparent opacity-50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={t("propertyDetail.lightbox.thumbnail", {
                        index: idx + 1,
                      })}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* REQUEST MODAL */}
        <AnimatePresence>
          {isRequestModalOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseModal}
                className="fixed inset-0 z-50 cursor-pointer bg-black/60 backdrop-blur-sm"
              />
              <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-lg bg-white p-8 shadow-2xl sm:p-10"
                >
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 cursor-pointer p-1 text-neutral-400 transition-colors hover:text-neutral-900"
                    aria-label={t("common.aria.close")}
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {submitted ? (
                    <div className="py-6 text-center">
                      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900">
                        <Check className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="mb-3 font-serif text-2xl font-normal text-neutral-900 italic sm:text-3xl">
                        {t("experienceDetail.modal.successTitle")}
                      </h3>
                      <p className="mx-auto mb-4 max-w-sm text-sm leading-relaxed font-light text-neutral-600">
                        {t("experienceDetail.modal.successBody", {
                          firstName: name.split(" ")[0],
                          experienceTitle: experience.name,
                        })}
                      </p>
                      <p className="mb-8 font-mono text-xs text-neutral-500">
                        {t("requestModal.reference", { code: reqId })}
                      </p>
                      <button
                        onClick={handleCloseModal}
                        className="cursor-pointer bg-neutral-900 px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-black"
                      >
                        {t("requestModal.close")}
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="mb-1 font-serif text-2xl font-normal text-neutral-900 italic sm:text-3xl">
                        {t("experienceDetail.modal.title")}
                      </h3>
                      <p className="mb-6 text-xs font-light text-neutral-500">
                        {experience.name} · {experience.location}
                        {experience.duration ? ` · ${experience.duration}` : ""}
                      </p>

                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                          <label
                            htmlFor="exp-name"
                            className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                          >
                            {t("requestModal.fullName")}
                          </label>
                          <input
                            id="exp-name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-neutral-300 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder-neutral-400 focus:border-neutral-900 focus:outline-none"
                            placeholder={t("requestModal.fullNamePlaceholder")}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="exp-email"
                            className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                          >
                            {t("requestModal.email")}
                          </label>
                          <input
                            id="exp-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-neutral-300 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder-neutral-400 focus:border-neutral-900 focus:outline-none"
                            placeholder={t("requestModal.emailPlaceholder")}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="exp-date"
                              className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                            >
                              {t("experienceDetail.modal.preferredDate")}
                            </label>
                            <input
                              id="exp-date"
                              type="date"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              className="w-full border border-neutral-300 px-4 py-3 text-sm text-neutral-900 transition-colors focus:border-neutral-900 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="exp-guests"
                              className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                            >
                              {t("experienceDetail.modal.guests")}
                            </label>
                            <select
                              id="exp-guests"
                              value={guests}
                              onChange={(e) =>
                                setGuests(e.target.value as GuestOptionKey)
                              }
                              className="w-full cursor-pointer appearance-none border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 transition-colors focus:border-neutral-900 focus:outline-none"
                            >
                              {GUEST_OPTION_KEYS.map((key) => (
                                <option key={key} value={key}>
                                  {t(`experienceDetail.guestsOptions.${key}`)}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="exp-notes"
                            className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                          >
                            {t("experienceDetail.modal.notes")}
                          </label>
                          <textarea
                            id="exp-notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            className="w-full resize-none border border-neutral-300 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder-neutral-400 focus:border-neutral-900 focus:outline-none"
                            placeholder={t(
                              "experienceDetail.modal.notesPlaceholder",
                            )}
                          />
                        </div>

                        <button
                          type="submit"
                          className="flex w-full cursor-pointer items-center justify-center gap-2 bg-neutral-900 px-6 py-4 text-xs font-semibold tracking-[0.2em] text-white uppercase shadow-md transition-all hover:bg-black"
                        >
                          <Send className="h-4 w-4" />
                          <span>{t("requestModal.sendRequest")}</span>
                        </button>

                        <p className="text-center text-[11px] leading-relaxed font-light text-neutral-400 italic">
                          {t("requestModal.responseDisclaimer")}
                        </p>
                      </form>
                    </>
                  )}
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </main>

      {/* <ExperienceVideoSection /> */}
      <CTAGetPro />
      <Testimonial />
    </div>
  );
}
