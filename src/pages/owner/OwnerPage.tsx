import { Check, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import PORules from "../landing/sections/PORules";
import Testimonial from "../landing/sections/Testimonial";
import OwnerBenefits from "./sections/OwnerBenefits";
import OwnerCTA1 from "./sections/OwnerCTA1";
import OwnerCTA2 from "./sections/OwnerCTA2";
import OwnerVideo from "./sections/OwnerVideo";
import OwnerWorks from "./sections/OwnerWorks";
import WhyPartner from "./sections/WhyPartner";

const PROPERTY_HERO_BG = "/images/penthouse.jpg";

const LOCATION_OPTIONS = [
  "Rome",
  "Florence",
  "Venice",
  "Milan",
  "Tuscany",
  "Lake Como",
  "Amalfi Coast",
  "Sardinia",
  "Sicily",
  "Other",
];

const BEDROOM_OPTIONS = [
  "1-2 Bedrooms",
  "3-4 Bedrooms",
  "5-6 Bedrooms",
  "7+ Bedrooms",
];

export default function OwnerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Join-the-collection form
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [propertyLocation, setPropertyLocation] = useState(
    LOCATION_OPTIONS[0] ?? "Rome",
  );
  const [bedrooms, setBedrooms] = useState(
    BEDROOM_OPTIONS[1] ?? "3-4 Bedrooms",
  );
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName || !ownerEmail) return;
    const code = Math.floor(100000 + Math.random() * 900000);
    setSubmissionId(`SKYLIFE-OWN-${code}`);
    setSubmitted(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSubmitted(false);
    setOwnerName("");
    setOwnerEmail("");
    setOwnerPhone("");
    setNotes("");
  };

  const openModal = () => setIsModalOpen(true);

  return (
    <div className="min-h-screen bg-black font-sans text-white selection:bg-white selection:text-black">
      {/* HERO */}
      <div className="relative flex h-screen min-h-[640px] w-full flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={PROPERTY_HERO_BG}
            alt="Elevate your property with the Skylife Collection"
            className="absolute inset-0 h-full w-full scale-105 object-cover object-center brightness-90 filter"
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
            Elevate Your Property
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 mb-12 font-sans text-base font-normal tracking-[0.2em] text-white/90 sm:text-lg"
          >
            Not just management, but real value creation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={openModal}
              className="cursor-pointer rounded-none border border-white/90 bg-black/20 px-8 py-4 font-sans text-xs font-medium tracking-[0.2em] text-white uppercase shadow-2xl backdrop-blur-xs transition-all duration-300 select-none hover:bg-white hover:text-black sm:px-10 sm:py-5 sm:text-sm"
            >
              JOIN THE SKYLIFE COLLECTION
            </button>
          </motion.div>
        </div>
      </div>

      {/* INTRO STATEMENT */}
      <section className="w-full bg-white px-6 py-16 text-justify font-sans text-neutral-900 sm:px-12 sm:py-24">
        <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full font-sans text-xl font-light tracking-wide text-neutral-700 sm:text-2xl"
          >
            We transform exceptional properties into fully realized living
            experiences, combining seamless operations with thoughtful
            presentation and personalized hospitality. From restyling and brand
            storytelling to five-star guest care, Skylife ensures your home
            stands among Italy's most distinguished stays.
          </motion.p>
        </div>
      </section>

      <OwnerVideo onApplyNow={openModal} />
      <OwnerBenefits />
      <PORules />
      <WhyPartner />
      <OwnerCTA1 />
      <OwnerWorks onStartJourney={openModal} />
      <Testimonial />
      <OwnerCTA2 onJoinToday={openModal} />

      {/* JOIN THE COLLECTION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
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
                  onClick={handleClose}
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
                      Application Received
                    </h3>
                    <p className="mx-auto mb-4 max-w-sm text-sm leading-relaxed font-light text-neutral-600">
                      Thank you, {ownerName.split(" ")[0]}. Our management team
                      will review your {propertyLocation} property and be in
                      touch to discuss next steps.
                    </p>
                    <p className="mb-8 font-mono text-xs text-neutral-500">
                      Reference: {submissionId}
                    </p>
                    <button
                      onClick={handleClose}
                      className="cursor-pointer bg-neutral-900 px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-black"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="mb-1 font-serif text-2xl font-normal text-neutral-900 italic sm:text-3xl">
                      Join the Skylife Collection
                    </h3>
                    <p className="mb-6 text-xs font-light text-neutral-500">
                      Tell us about your property and we'll arrange a private
                      review.
                    </p>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="own-name"
                          className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                        >
                          Full Name *
                        </label>
                        <input
                          id="own-name"
                          type="text"
                          required
                          value={ownerName}
                          onChange={(e) => setOwnerName(e.target.value)}
                          className="w-full border border-neutral-300 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder-neutral-400 focus:border-neutral-900 focus:outline-none"
                          placeholder="e.g. Massimo Ricci"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="own-email"
                            className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                          >
                            Email *
                          </label>
                          <input
                            id="own-email"
                            type="email"
                            required
                            value={ownerEmail}
                            onChange={(e) => setOwnerEmail(e.target.value)}
                            className="w-full border border-neutral-300 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder-neutral-400 focus:border-neutral-900 focus:outline-none"
                            placeholder="you@example.com"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="own-phone"
                            className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                          >
                            Phone
                          </label>
                          <input
                            id="own-phone"
                            type="tel"
                            value={ownerPhone}
                            onChange={(e) => setOwnerPhone(e.target.value)}
                            className="w-full border border-neutral-300 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder-neutral-400 focus:border-neutral-900 focus:outline-none"
                            placeholder="+39 ..."
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="own-location"
                            className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                          >
                            Property Location
                          </label>
                          <select
                            id="own-location"
                            value={propertyLocation}
                            onChange={(e) =>
                              setPropertyLocation(e.target.value)
                            }
                            className="w-full cursor-pointer appearance-none border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 transition-colors focus:border-neutral-900 focus:outline-none"
                          >
                            {LOCATION_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="own-bedrooms"
                            className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                          >
                            Size
                          </label>
                          <select
                            id="own-bedrooms"
                            value={bedrooms}
                            onChange={(e) => setBedrooms(e.target.value)}
                            className="w-full cursor-pointer appearance-none border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 transition-colors focus:border-neutral-900 focus:outline-none"
                          >
                            {BEDROOM_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="own-notes"
                          className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                        >
                          Tell us about the property
                        </label>
                        <textarea
                          id="own-notes"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={3}
                          className="w-full resize-none border border-neutral-300 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder-neutral-400 focus:border-neutral-900 focus:outline-none"
                          placeholder="Current rental status, management preference, timeline…"
                        />
                      </div>

                      <button
                        type="submit"
                        className="flex w-full cursor-pointer items-center justify-center gap-2 bg-neutral-900 px-6 py-4 text-xs font-semibold tracking-[0.2em] text-white uppercase shadow-md transition-all hover:bg-black"
                      >
                        <Send className="h-4 w-4" />
                        <span>Submit Application</span>
                      </button>

                      <p className="text-center text-[11px] leading-relaxed font-light text-neutral-400 italic">
                        Private review. No obligation. We respond within 2 hours
                        during business hours.
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
