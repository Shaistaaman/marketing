import { Check, Heart, Send, Star, Upload, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import CTAGetPro from "../../components/sections/CTAGetPro";
import ExperienceVideoSection from "../../components/sections/ExperienceVideoSection";
import {
  DEFAULT_EXPERIENCE,
  findExperienceDetail,
} from "../../data/experiences";
import Testimonial from "../landing/sections/Testimonial";

const GUEST_OPTIONS = [
  "1 Guest",
  "2 Guests",
  "3 Guests",
  "4 Guests",
  "5 Guests",
  "6+ Guests",
];

export default function ExperienceDetailPage() {
  const { experienceId } = useParams<{ experienceId: string }>();
  const experience = useMemo(
    () => findExperienceDetail(experienceId),
    [experienceId],
  );

  const [isSaved, setIsSaved] = useState(false);
  const [isShared, setIsShared] = useState(false);

  // Request modal
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState(GUEST_OPTIONS[1] ?? "2 Guests");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [reqId, setReqId] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [experienceId]);

  const handleShare = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(window.location.href).then(() => {
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    });
  };

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
            <span>{experience.category}</span>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <button
              type="button"
              onClick={handleShare}
              className="group flex cursor-pointer items-center gap-2 text-xs font-normal tracking-tight text-neutral-900 transition-colors hover:text-neutral-600 sm:text-sm"
            >
              <Upload className="h-4 w-4 stroke-[1.75] transition-transform group-hover:-translate-y-0.5" />
              <span className="underline underline-offset-4">Share</span>
              {isShared && (
                <span className="rounded bg-neutral-900 px-2 py-0.5 font-mono text-[10px] text-white">
                  Copied!
                </span>
              )}
            </button>

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
              <span className="underline underline-offset-4">Save</span>
            </button>
          </div>
        </div>

        {/* TITLE + METADATA */}
        <div className="mb-8 flex flex-col justify-between gap-4 pt-6 sm:mb-12 sm:flex-row sm:items-start sm:pt-1">
          <div>
            <h1 className="mb-3 font-serif text-3xl leading-[1.12] font-normal tracking-tight text-neutral-900 italic sm:text-5xl lg:text-6xl">
              {experience.title}
            </h1>

            <p className="font-sans text-xs font-normal tracking-wide text-neutral-500 italic sm:text-sm">
              Curated by Skylife - Part of the Exclusive {experience.location}{" "}
              Collection
            </p>

            {/* Rating */}
            <div className="flex shrink-0 items-center gap-1.5 self-start pt-1 sm:self-auto">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              <span className="font-sans text-base font-medium tracking-tight text-neutral-900">
                4.90
              </span>
              {experience.duration && (
                <span className="ml-3 font-sans text-sm font-light text-neutral-500">
                  {experience.duration}
                </span>
              )}
            </div>
          </div>

          {/* REQUEST NOW */}
          <div className="shrink-0 pt-4">
            <button
              type="button"
              onClick={() => setIsRequestModalOpen(true)}
              className="w-full cursor-pointer rounded-none bg-black px-10 py-4 font-sans text-xs font-semibold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:bg-neutral-800 sm:w-auto"
            >
              REQUEST NOW
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
                Key Points
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
                alt={experience.title}
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
                      alt={`${experience.title} detail ${idx + 1}`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>

              <div className="relative h-full min-h-[220px] w-full overflow-hidden bg-neutral-100">
                <img
                  src={galleryImages[3]}
                  alt={`${experience.title} detail 3`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>

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
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {submitted ? (
                    <div className="py-6 text-center">
                      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900">
                        <Check className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="mb-3 font-serif text-2xl font-normal text-neutral-900 italic sm:text-3xl">
                        Request Received
                      </h3>
                      <p className="mx-auto mb-4 max-w-sm text-sm leading-relaxed font-light text-neutral-600">
                        Thank you, {name.split(" ")[0]}. Our concierge will
                        confirm availability for{" "}
                        <span className="font-medium text-neutral-900">
                          {experience.title}
                        </span>{" "}
                        shortly.
                      </p>
                      <p className="mb-8 font-mono text-xs text-neutral-500">
                        Reference: {reqId}
                      </p>
                      <button
                        onClick={handleCloseModal}
                        className="cursor-pointer bg-neutral-900 px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-black"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="mb-1 font-serif text-2xl font-normal text-neutral-900 italic sm:text-3xl">
                        Request This Experience
                      </h3>
                      <p className="mb-6 text-xs font-light text-neutral-500">
                        {experience.title} · {experience.location}
                        {experience.duration ? ` · ${experience.duration}` : ""}
                      </p>

                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                          <label
                            htmlFor="exp-name"
                            className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                          >
                            Full Name *
                          </label>
                          <input
                            id="exp-name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-neutral-300 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder-neutral-400 focus:border-neutral-900 focus:outline-none"
                            placeholder="e.g. Martina Vance"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="exp-email"
                            className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                          >
                            Email *
                          </label>
                          <input
                            id="exp-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-neutral-300 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder-neutral-400 focus:border-neutral-900 focus:outline-none"
                            placeholder="you@example.com"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="exp-date"
                              className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                            >
                              Preferred Date
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
                              Guests
                            </label>
                            <select
                              id="exp-guests"
                              value={guests}
                              onChange={(e) => setGuests(e.target.value)}
                              className="w-full cursor-pointer appearance-none border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 transition-colors focus:border-neutral-900 focus:outline-none"
                            >
                              {GUEST_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
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
                            Notes
                          </label>
                          <textarea
                            id="exp-notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            className="w-full resize-none border border-neutral-300 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder-neutral-400 focus:border-neutral-900 focus:outline-none"
                            placeholder="Dietary requirements, accessibility, occasion…"
                          />
                        </div>

                        <button
                          type="submit"
                          className="flex w-full cursor-pointer items-center justify-center gap-2 bg-neutral-900 px-6 py-4 text-xs font-semibold tracking-[0.2em] text-white uppercase shadow-md transition-all hover:bg-black"
                        >
                          <Send className="h-4 w-4" />
                          <span>Send Request</span>
                        </button>

                        <p className="text-center text-[11px] leading-relaxed font-light text-neutral-400 italic">
                          No payment is taken now. Our team responds within 2
                          hours during business hours.
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

      <ExperienceVideoSection />
      <Testimonial />
      <CTAGetPro />
    </div>
  );
}
