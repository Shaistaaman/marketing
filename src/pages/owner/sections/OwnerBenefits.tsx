import {
  BarChart3,
  Bath,
  Bed,
  Check,
  Quote,
  Send,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";

const BG_PALAZZO = "/images/propty.jpg";
const OWNER_AVATAR = "/images/team/avatarowner.png";
const TERRACE_IMAGE = "/images/penthouse.jpg";

const CITY_OPTIONS = [
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

const BULLETS = [
  {
    Icon: BarChart3,
    label: "MARKET ANALYSIS",
    body: "Occupancy rates and local demand metrics.",
  },
  {
    Icon: TrendingUp,
    label: "REVENUE PROJECTION",
    body: "Annual earnings based on verified benchmark data.",
  },
  {
    Icon: ShieldCheck,
    label: "MANAGEMENT MODEL",
    body: "Tailored strategy fitting your property and lifestyle.",
  },
];

interface OwnerBenefitsProps {
  onRequestValuation?: () => void;
}

export default function OwnerBenefits({
  onRequestValuation,
}: OwnerBenefitsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [propertyCity, setPropertyCity] = useState(CITY_OPTIONS[0] ?? "Rome");
  const [submitted, setSubmitted] = useState(false);
  const [valuationId, setValuationId] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName || !ownerEmail) return;
    const code = Math.floor(100000 + Math.random() * 900000);
    setValuationId(`SKYLIFE-VAL-${code}`);
    setSubmitted(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSubmitted(false);
    setOwnerName("");
    setOwnerEmail("");
  };

  const triggerValuation = () => {
    if (onRequestValuation) {
      onRequestValuation();
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <section className="relative w-full overflow-hidden border-t border-b border-neutral-900 bg-neutral-950 font-sans text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img
          src={BG_PALAZZO}
          alt="Italian palazzo property valuation"
          className="absolute inset-0 h-full w-full object-cover object-center brightness-50 contrast-110 filter"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1360px] px-6 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT: editorial content */}
          <div className="flex flex-col justify-between space-y-8 lg:col-span-6">
            <div>
              <h2 className="mb-6 font-serif text-3xl leading-[1.12] font-normal tracking-tight text-white italic sm:text-5xl lg:text-6xl">
                Curious what your Italian property could earn?
              </h2>

              <p className="mb-4 font-sans text-base leading-relaxed font-light text-neutral-200 sm:text-lg">
                Before any commitment, we provide a detailed, honest picture of
                what your Italian home could generate with the right management.
              </p>

              <p className="font-sans text-sm leading-relaxed font-light text-neutral-300 sm:text-base">
                Our free, no-obligation valuation includes: Market analysis of
                occupancy rates and local demand; Revenue projections based on
                real benchmark data; and a tailored management recommendation
                for your lifestyle.
              </p>
            </div>

            {/* Feature bullets */}
            <div className="space-y-5 pt-2">
              {BULLETS.map(({ Icon, label, body }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="mt-0.5 shrink-0 rounded-none border border-white/20 bg-white/10 p-2 text-white">
                    <Icon className="h-4 w-4 stroke-[1.5]" />
                  </div>
                  <div>
                    <span className="mb-0.5 block font-mono text-[10px] font-bold tracking-[0.2em] text-neutral-300 uppercase">
                      {label}
                    </span>
                    <p className="text-sm font-light text-neutral-100">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="space-y-3 pt-4">
              <button
                type="button"
                onClick={triggerValuation}
                className="w-full cursor-pointer rounded-none border border-white/90 bg-black/30 px-8 py-4 font-sans text-xs font-medium tracking-[0.2em] uppercase backdrop-blur-xs transition-all duration-300 select-none hover:bg-white hover:text-black sm:w-auto sm:text-sm"
              >
                REQUEST YOUR FREE VALUATION
              </button>

              <p className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase">
                DELIVERED WITHIN 48 HOURS. DISCRETE AND NO OBLIGATION
              </p>
            </div>
          </div>

          {/* RIGHT: stats, testimonial, property preview */}
          <div className="relative flex min-h-[500px] flex-col justify-center gap-6 lg:col-span-6">
            {/* Testimonial card */}
            <div className="relative w-full max-w-sm self-end rounded-none bg-white p-5 text-neutral-900 shadow-2xl">
              <div className="mb-3 flex items-center gap-3">
                <img
                  src={OWNER_AVATAR}
                  alt="Massimo — property owner"
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full border border-neutral-200 object-cover"
                />
                <div>
                  <h4 className="font-sans text-sm leading-tight font-semibold text-neutral-900">
                    Massimo
                  </h4>
                  <p className="text-xs font-light text-neutral-500">
                    Property Owner, Rome IT
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-neutral-50 p-3 text-xs leading-relaxed font-light text-neutral-700">
                <div className="mt-0.5 shrink-0 rounded bg-black p-1 text-white">
                  <Quote className="h-3 w-3 fill-white" />
                </div>
                <p>
                  I was initially hesitant to hand over management to another
                  company, but Skylife's remarkable.
                </p>
              </div>
            </div>

            {/* Stat boxes */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="border border-white/40 bg-black/40 p-4 text-white backdrop-blur-md">
                <span className="mb-1 block font-mono text-[10px] font-medium tracking-[0.2em] text-neutral-300 uppercase">
                  YEARLY OCCUPANCY
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-sans text-3xl font-light italic">
                    92%
                  </span>
                  <span className="font-mono text-xs text-neutral-400">~</span>
                </div>
              </div>

              <div className="relative border border-white/40 bg-black/40 p-4 text-white backdrop-blur-md">
                <span className="mb-1 block font-mono text-[10px] font-medium tracking-[0.2em] text-neutral-300 uppercase">
                  AVERAGE DAILY RATE (ADR)
                </span>
                <div className="mb-2 flex items-baseline gap-2">
                  <span className="font-sans text-3xl font-light italic">
                    782€
                  </span>
                  <span className="font-mono text-xs text-neutral-400">~</span>
                </div>
                <div className="h-1 w-full overflow-hidden bg-white/20">
                  <div className="h-full w-[78%] bg-white" />
                </div>
              </div>
            </div>

            {/* Trustpilot + featured property */}
            <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2">
              <div className="flex h-full flex-col justify-center border border-white/40 bg-black/40 p-5 text-white backdrop-blur-md">
                <div className="mb-1 flex items-center gap-1.5 text-emerald-400">
                  <Star className="h-7 w-7 fill-emerald-400" />
                  <span className="text-2xl font-bold tracking-wide text-white">
                    Trustpilot
                  </span>
                </div>

                <div className="mb-2 font-sans text-2xl font-semibold text-white">
                  Excellent
                </div>

                <div className="mb-2 flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="font-sans text-[11px] text-neutral-300">
                  600+ Five-Star Reviews
                </p>
              </div>

              <div className="overflow-hidden rounded-none border border-white/20 bg-white text-neutral-900 shadow-2xl">
                <div className="relative h-28 w-full overflow-hidden">
                  <img
                    src={TERRACE_IMAGE}
                    alt="Art Gallery Penthouse"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h5 className="mb-0.5 truncate font-sans text-xs font-bold text-neutral-900">
                    Art Gallery Penthouse
                  </h5>
                  <p className="mb-3 text-[11px] text-neutral-500">
                    Rome, Italy
                  </p>

                  <div className="flex items-center gap-4 border-t border-neutral-100 pt-2 font-mono text-[11px] text-neutral-600">
                    <span className="flex items-center gap-1">
                      <Bed className="h-3 w-3 text-neutral-400" /> 3
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="h-3 w-3 text-neutral-400" /> 3
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-neutral-400" /> 6
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FREE VALUATION MODAL */}
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
                      Valuation Requested
                    </h3>
                    <p className="mx-auto mb-4 max-w-sm text-sm leading-relaxed font-light text-neutral-600">
                      Thank you, {ownerName.split(" ")[0]}. We'll prepare your{" "}
                      {propertyCity} market analysis and send it within 48 hours.
                    </p>
                    <p className="mb-8 font-mono text-xs text-neutral-500">
                      Reference: {valuationId}
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
                      Request Your Free Valuation
                    </h3>
                    <p className="mb-6 text-xs font-light text-neutral-500">
                      No obligation. Delivered within 48 hours.
                    </p>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="val-name"
                          className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                        >
                          Full Name *
                        </label>
                        <input
                          id="val-name"
                          type="text"
                          required
                          value={ownerName}
                          onChange={(e) => setOwnerName(e.target.value)}
                          className="w-full border border-neutral-300 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder-neutral-400 focus:border-neutral-900 focus:outline-none"
                          placeholder="e.g. Massimo Ricci"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="val-email"
                          className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                        >
                          Email *
                        </label>
                        <input
                          id="val-email"
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
                          htmlFor="val-city"
                          className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                        >
                          Where is the property?
                        </label>
                        <select
                          id="val-city"
                          value={propertyCity}
                          onChange={(e) => setPropertyCity(e.target.value)}
                          className="w-full cursor-pointer appearance-none border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 transition-colors focus:border-neutral-900 focus:outline-none"
                        >
                          {CITY_OPTIONS.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="flex w-full cursor-pointer items-center justify-center gap-2 bg-neutral-900 px-6 py-4 text-xs font-semibold tracking-[0.2em] text-white uppercase shadow-md transition-all hover:bg-black"
                      >
                        <Send className="h-4 w-4" />
                        <span>Request Valuation</span>
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
