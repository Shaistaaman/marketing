import {
  Bed,
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Grid,
  MapPin,
  Maximize2,
  Send,
  ShieldCheck,
  ShowerHead,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CTAGetPro from "../../components/sections/CTAGetPro";
// import ExperienceVideoSection from "../../components/sections/ExperienceVideoSection";
import { DEFAULT_PROPERTY, findPropertyData } from "../../data/properties";
import { isBetweenDays, isSameDay } from "../../lib/dateRangeUtils";
import Testimonial from "../landing/sections/Testimonial";

/** Calendar starts at July 2026 and can advance 10 months. */
const CAL_BASE_YEAR = 2026;
const CAL_BASE_MONTH = 6; // July
const MAX_MONTH_OFFSET = 10;
const GALLERY_SIZE = 5;

export default function PropertyDetailPage() {
  const { t } = useTranslation();
  const { propertyId } = useParams<{ propertyId: string }>();
  const property = useMemo(() => findPropertyData(propertyId), [propertyId]);

  // Scroll to top whenever the property changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [propertyId]);

  // Gallery lightbox
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Request-stay modal
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Selected range defaults to 28 Jul – 10 Aug 2026
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(2026, 6, 28),
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date(2026, 7, 10));
  const [monthOffset, setMonthOffset] = useState(0);

  const numberOfNights = useMemo(() => {
    if (!startDate || !endDate) return 1;
    const s = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
    ).getTime();
    const e = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
    ).getTime();
    const diffDays = Math.round((e - s) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [startDate, endDate]);

  // Pricing
  const nightlyRate = property.nightlyRate;
  const cleaningFee = property.cleaningFee;
  const serviceFee = property.serviceFee;
  const taxes = property.taxPct;
  const totalNightly = nightlyRate * numberOfNights;
  const totalPrice = totalNightly + cleaningFee + serviceFee + taxes;

  const handleDateClick = (clickedDate: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
      return;
    }
    if (clickedDate.getTime() >= startDate.getTime()) {
      setEndDate(clickedDate);
    } else {
      setStartDate(clickedDate);
      setEndDate(null);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) return;
    setRequestSubmitted(true);
  };

  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
    setRequestSubmitted(false);
    setGuestName("");
    setGuestEmail("");
    setGuestPhone("");
    setSpecialRequests("");
  };

  // Pad the gallery to GALLERY_SIZE using the default property's images.
  const propertyImages = useMemo(() => {
    const images = [...property.images];
    for (const fallback of DEFAULT_PROPERTY.images) {
      if (images.length >= GALLERY_SIZE) break;
      if (!images.includes(fallback)) images.push(fallback);
    }
    while (images.length < GALLERY_SIZE && DEFAULT_PROPERTY.images.length > 0) {
      const next =
        DEFAULT_PROPERTY.images[images.length % DEFAULT_PROPERTY.images.length];
      if (!next) break;
      images.push(next);
    }
    return images;
  }, [property]);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const renderMonthGrid = (mDate: Date, isLeft: boolean, isRight: boolean) => {
    const year = mDate.getFullYear();
    const month = mDate.getMonth();
    const monthName = mDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    return (
      <div className="w-full">
        <div className="mb-6 flex items-center justify-between px-1">
          {isLeft ? (
            <button
              type="button"
              onClick={() => setMonthOffset((prev) => Math.max(0, prev - 1))}
              disabled={monthOffset === 0}
              className="cursor-pointer rounded-full p-1.5 text-neutral-800 transition-colors hover:bg-neutral-200 disabled:opacity-20 disabled:hover:bg-transparent"
              aria-label={t("common.aria.previousMonth")}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          ) : (
            <div className="w-7" />
          )}

          <span className="text-sm font-semibold tracking-tight text-neutral-900 sm:text-base">
            {monthName}
          </span>

          {isRight ? (
            <button
              type="button"
              onClick={() =>
                setMonthOffset((prev) => Math.min(MAX_MONTH_OFFSET, prev + 1))
              }
              disabled={monthOffset >= MAX_MONTH_OFFSET}
              className="cursor-pointer rounded-full p-1.5 text-neutral-800 transition-colors hover:bg-neutral-200 disabled:opacity-20 disabled:hover:bg-transparent"
              aria-label={t("common.aria.nextMonth")}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <div className="w-7" />
          )}
        </div>

        {/* Weekday headers */}
        <div className="mb-3 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-neutral-400">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <span key={`${d}-${i}`}>{d}</span>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-x-0 gap-y-1.5 text-center text-xs sm:text-sm">
          {Array.from({ length: firstDayIndex }).map((_, idx) => (
            <div key={`blank-${idx}`} className="h-9 sm:h-10" />
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
            (dayNum) => {
              const dayDate = new Date(year, month, dayNum);
              const isStart = isSameDay(dayDate, startDate);
              const isEnd = isSameDay(dayDate, endDate);
              const inRange = isBetweenDays(dayDate, startDate, endDate);

              let cellStyle =
                "text-neutral-800 font-medium hover:bg-neutral-200/80 rounded-full";
              let wrapperStyle = "";

              if (isStart && isEnd) {
                cellStyle =
                  "bg-neutral-900 text-white font-bold rounded-full shadow-xs";
              } else if (isStart) {
                cellStyle =
                  "bg-neutral-900 text-white font-bold rounded-full z-10 relative shadow-xs";
                wrapperStyle = endDate ? "bg-neutral-100 rounded-l-full" : "";
              } else if (isEnd) {
                cellStyle =
                  "bg-neutral-900 text-white font-bold rounded-full z-10 relative shadow-xs";
                wrapperStyle = "bg-neutral-100 rounded-r-full";
              } else if (inRange) {
                cellStyle = "text-neutral-900 font-semibold";
                wrapperStyle = "bg-neutral-100";
              }

              return (
                <div
                  key={dayNum}
                  className={`flex h-9 items-center justify-center sm:h-10 ${wrapperStyle}`}
                >
                  <button
                    type="button"
                    onClick={() => handleDateClick(dayDate)}
                    className={`flex h-8 w-8 cursor-pointer items-center justify-center text-xs transition-all sm:h-9 sm:w-9 sm:text-sm ${cellStyle}`}
                  >
                    {dayNum}
                  </button>
                </div>
              );
            },
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white pt-24 font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white sm:pt-32">
      <main className="mx-auto max-w-[1280px] px-4 py-8 sm:px-8 sm:py-12 lg:px-12">
        {/* BREADCRUMB */}
        <div className="mb-6 font-sans text-xs font-light tracking-wide text-neutral-500 sm:text-sm">
          <span>{property.region}</span>
          <span className="mx-2 text-neutral-300">/</span>
          <span className="font-medium text-neutral-900">{property.name}</span>
        </div>

        {/* HEADER */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-baseline">
          <div>
            <h1 className="mb-2 font-serif text-3xl leading-tight font-normal tracking-tight text-neutral-900 italic sm:text-5xl lg:text-6xl">
              {property.name}
            </h1>
            <p className="font-sans text-xs font-light text-neutral-500 italic sm:text-sm">
              {t("propertyDetail.curatedBy", { region: property.region })}
            </p>
          </div>
          <div className="shrink-0 text-left md:text-right">
            <span className="font-sans text-2xl font-bold text-neutral-900 sm:text-3xl">
              €{totalPrice}
            </span>
            <span className="ml-1 text-xs font-light text-neutral-500 sm:text-sm">
              {t("propertyDetail.perNight")}
            </span>
          </div>
        </div>

        {/* INTRO */}
        <p className="mb-10 max-w-5xl text-sm leading-relaxed font-light text-neutral-600 sm:text-base lg:text-lg">
          {property.description}
        </p>

        {/* HERO GALLERY */}
        <div className="mb-16 grid h-auto grid-cols-1 gap-2.5 sm:gap-3 md:h-[480px] lg:mb-24 lg:h-[540px] lg:grid-cols-2 sm:mb-20">
          {/* Main image */}
          <div
            onClick={() => {
              setActiveImageIndex(0);
              setIsLightboxOpen(true);
            }}
            className="group relative h-[280px] cursor-pointer overflow-hidden bg-neutral-100 md:h-full"
          >
            <img
              src={propertyImages[0]}
              alt={property.name}
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>

          {/* 2x2 grid */}
          <div className="grid h-[280px] grid-cols-2 gap-2.5 sm:gap-3 md:h-full">
            {propertyImages.slice(1, 5).map((img, idx) => {
              const isLast = idx === 3;
              return (
                <div
                  key={`${img}-${idx}`}
                  onClick={() => {
                    setActiveImageIndex(idx + 1);
                    setIsLightboxOpen(true);
                  }}
                  className="group relative h-full cursor-pointer overflow-hidden bg-neutral-100"
                >
                  <img
                    src={img}
                    alt={`${property.name} preview ${idx + 1}`}
                    loading="eager"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  {isLast && (
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
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 items-start gap-12 pt-4 lg:grid-cols-12 lg:gap-16 sm:pt-6">
          {/* LEFT COLUMN */}
          <div className="space-y-16 lg:col-span-7">
            {/* SPECS */}
            <div className="grid grid-cols-2 gap-6 border-y border-neutral-200/80 py-6 sm:grid-cols-4">
              {[
                {
                  Icon: Bed,
                  value: property.bedrooms,
                  label: t("common.specs.bedrooms"),
                },
                {
                  Icon: ShowerHead,
                  value: property.bathrooms,
                  label: t("common.specs.bathrooms"),
                },
                {
                  Icon: Users,
                  value: property.guests,
                  label: t("common.specs.guests"),
                },
                {
                  Icon: Maximize2,
                  value: property.areaSqm,
                  label: t("common.specs.areaSize"),
                },
              ].map(({ Icon, value, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon className="h-6 w-6 stroke-[1.2] text-neutral-800" />
                  <div>
                    <span className="block text-base leading-tight font-bold text-neutral-900">
                      {value}
                    </span>
                    <span className="text-xs font-light text-neutral-500">
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* AVAILABILITY */}
            <div>
              <div className="mb-6">
                <h2 className="mb-1 font-serif text-3xl font-normal text-neutral-900 italic sm:text-4xl">
                  {t("propertyDetail.sections.availability")}
                </h2>
                <p className="text-xs font-light text-neutral-500 italic">
                  {t("propertyDetail.curatedBy", { region: property.region })}
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200/80 bg-white p-6 shadow-xs sm:p-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
                  {renderMonthGrid(
                    new Date(CAL_BASE_YEAR, CAL_BASE_MONTH + monthOffset, 1),
                    true,
                    false,
                  )}
                  {renderMonthGrid(
                    new Date(
                      CAL_BASE_YEAR,
                      CAL_BASE_MONTH + monthOffset + 1,
                      1,
                    ),
                    false,
                    true,
                  )}
                </div>
              </div>
            </div>

            {/* WHAT MAKES IT SPECIAL */}
            <div>
              <div className="mb-6">
                <h2 className="mb-1 font-serif text-3xl font-normal text-neutral-900 italic sm:text-4xl">
                  {t("propertyDetail.sections.whatMakesItSpecial")}
                </h2>
                <p className="text-xs font-light text-neutral-500 italic">
                  {t("propertyDetail.curatedBy", { region: property.region })}
                </p>
              </div>

              <p className="mb-10 text-sm leading-relaxed font-light text-neutral-600 sm:text-base">
                {property.description}
              </p>

              <div className="grid grid-cols-1 gap-8 pt-4 sm:grid-cols-3">
                {[
                  {
                    title: t("propertyDetail.sections.insideThePenthouse"),
                    body: property.insideDetails,
                  },
                  {
                    title: t("propertyDetail.sections.yourPrivateTerrace"),
                    body: property.terraceDetails,
                  },
                  {
                    title: t("propertyDetail.sections.theNeighborhood"),
                    body: property.neighborhoodDetails,
                  },
                ].map(({ title, body }) => (
                  <div key={title}>
                    <h3 className="mb-3 font-serif text-lg font-normal text-neutral-900 italic sm:text-xl">
                      {title}
                    </h3>
                    <p className="text-xs leading-relaxed font-light text-neutral-600 sm:text-sm">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* MAP */}
            <div>
              <h2 className="mb-6 font-serif text-3xl font-normal text-neutral-900 italic sm:text-4xl">
                {t("propertyDetail.sections.mapLocation")}
              </h2>
              <div className="group relative h-[360px] w-full overflow-hidden border border-neutral-200 bg-neutral-100">
                <div className="absolute inset-0 flex items-center justify-center bg-[#e8ecef]">
                  <svg
                    className="h-full w-full opacity-40"
                    viewBox="0 0 800 400"
                    fill="none"
                  >
                    <path
                      d="M0,100 Q200,150 400,120 T800,200"
                      stroke="#a0aec0"
                      strokeWidth="24"
                    />
                    <path
                      d="M100,0 Q180,200 250,400"
                      stroke="#cbd5e0"
                      strokeWidth="16"
                    />
                    <path
                      d="M500,0 Q520,200 650,400"
                      stroke="#cbd5e0"
                      strokeWidth="12"
                    />
                    <circle
                      cx="410"
                      cy="180"
                      r="140"
                      fill="#a3b18a"
                      opacity="0.15"
                    />
                  </svg>
                  {/* Marker */}
                  <div className="absolute flex flex-col items-center">
                    <div className="flex h-10 w-10 animate-bounce items-center justify-center rounded-full border-2 border-white bg-neutral-900 text-white shadow-2xl">
                      <MapPin className="h-5 w-5 text-amber-300" />
                    </div>
                    <span className="mt-2 border border-neutral-200 bg-white px-3 py-1 text-[11px] font-semibold tracking-wider text-neutral-900 uppercase shadow-md">
                      {property.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: STICKY PRICE CARD */}
          <div className="lg:col-span-5 lg:sticky lg:top-30">
            <div className="space-y-6 border border-neutral-200 bg-white p-8 shadow-xl sm:p-10">
              <h3 className="border-b border-neutral-200 pb-4 font-serif text-2xl font-normal text-neutral-900 italic sm:text-3xl">
                {t("propertyDetail.sections.priceBreakdown")}
              </h3>

              {/* Date summary */}
              <div className="flex items-center gap-3 rounded-lg border border-neutral-200/80 bg-neutral-50 p-3.5">
                <CalendarIcon className="h-5 w-5 shrink-0 text-neutral-700" />
                <div className="text-xs">
                  <span className="block font-semibold text-neutral-900">
                    {startDate && endDate
                      ? `${formatDate(startDate)} – ${formatDate(endDate)}`
                      : startDate
                        ? t("propertyDetail.availabilityCalendar.fromDate", {
                            date: formatDate(startDate),
                          })
                        : t(
                            "propertyDetail.availabilityCalendar.selectDatesHint",
                          )}
                  </span>
                  <span className="font-light text-neutral-500">
                    {t("propertyDetail.availabilityCalendar.nightsStay", {
                      count: numberOfNights,
                    })}
                  </span>
                </div>
              </div>

              <div className="space-y-3.5 text-sm font-light text-neutral-600">
                <div className="flex items-center justify-between">
                  <span>
                    {t("propertyDetail.priceBreakdown.nightlyRate", {
                      count: numberOfNights,
                    })}
                  </span>
                  <span className="font-medium text-neutral-900">
                    €{totalNightly}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t("propertyDetail.priceBreakdown.cleaningFee")}</span>
                  <span className="font-medium text-neutral-900">
                    €{cleaningFee}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t("propertyDetail.priceBreakdown.serviceFee")}</span>
                  <span className="font-medium text-neutral-900">
                    €{serviceFee}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t("propertyDetail.priceBreakdown.taxes")}</span>
                  <span className="font-medium text-neutral-900">€{taxes}</span>
                </div>
              </div>

              <div className="flex items-baseline justify-between border-t border-neutral-200 pt-4">
                <span className="text-lg font-bold text-neutral-900">
                  {t("propertyDetail.priceBreakdown.total")}
                </span>
                <span className="text-3xl font-bold text-neutral-900">
                  €{totalPrice}
                </span>
              </div>

              <p className="text-[11px] font-light text-neutral-500 italic">
                {t("propertyDetail.priceBreakdown.bestRateGuaranteed")}
              </p>

              <button
                onClick={() => setIsRequestModalOpen(true)}
                className="flex w-full cursor-pointer items-center justify-center gap-2 bg-neutral-900 px-6 py-4 text-xs font-semibold tracking-[0.2em] text-white uppercase shadow-md transition-all hover:bg-black"
              >
                <ShieldCheck className="h-4 w-4 text-amber-300" />
                <span>{t("propertyDetail.requestYourStay")}</span>
              </button>

              <p className="text-center text-[11px] leading-relaxed font-light text-neutral-400 italic">
                * You'll be contacted by a Skylife concierge within 24 hours to
                confirm your stay.
              </p>
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
                    title: property.name,
                    current: activeImageIndex + 1,
                    total: propertyImages.length,
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
                  src={propertyImages[activeImageIndex]}
                  alt={t("propertyDetail.lightbox.propertyGalleryEnlarged")}
                  className="max-h-[75vh] max-w-full object-contain shadow-2xl"
                />

                {propertyImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === 0 ? propertyImages.length - 1 : prev - 1,
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
                          prev === propertyImages.length - 1 ? 0 : prev + 1,
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
                {propertyImages.map((img, idx) => (
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

        {/* REQUEST STAY MODAL */}
        <AnimatePresence>
          {isRequestModalOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeRequestModal}
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
                    onClick={closeRequestModal}
                    className="absolute top-4 right-4 cursor-pointer p-1 text-neutral-400 transition-colors hover:text-neutral-900"
                    aria-label={t("common.aria.close")}
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {requestSubmitted ? (
                    /* Success state */
                    <div className="py-6 text-center">
                      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900">
                        <Check className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="mb-3 font-serif text-2xl font-normal text-neutral-900 italic sm:text-3xl">
                        {t("propertyDetail.modal.successTitle")}
                      </h3>
                      <p className="mx-auto mb-8 max-w-sm text-sm leading-relaxed font-light text-neutral-600">
                        {t("propertyDetail.modal.successBody", {
                          firstName: guestName.split(" ")[0],
                          propertyTitle: property.name,
                        })}
                      </p>
                      <button
                        onClick={closeRequestModal}
                        className="cursor-pointer bg-neutral-900 px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-white uppercase transition-colors hover:bg-black"
                      >
                        {t("requestModal.close")}
                      </button>
                    </div>
                  ) : (
                    /* Form state */
                    <>
                      <h3 className="mb-1 font-serif text-2xl font-normal text-neutral-900 italic sm:text-3xl">
                        {t("propertyDetail.modal.title")}
                      </h3>
                      <p className="mb-6 text-xs font-light text-neutral-500">
                        {property.name} · {property.location}
                      </p>

                      {/* Stay summary */}
                      <div className="mb-6 flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3.5">
                        <CalendarIcon className="h-5 w-5 shrink-0 text-neutral-700" />
                        <div className="text-xs">
                          <span className="block font-semibold text-neutral-900">
                            {startDate && endDate
                              ? `${formatDate(startDate)} – ${formatDate(endDate)}`
                              : t("propertyDetail.modal.datesTBC")}
                          </span>
                          <span className="font-light text-neutral-500">
                            {t("propertyDetail.modal.nightsTotal", {
                              count: numberOfNights,
                              total: totalPrice,
                            })}
                          </span>
                        </div>
                      </div>

                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                          <label
                            htmlFor="guest-name"
                            className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                          >
                            {t("requestModal.fullName")}
                          </label>
                          <input
                            id="guest-name"
                            type="text"
                            required
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            className="w-full border border-neutral-300 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder-neutral-400 focus:border-neutral-900 focus:outline-none"
                            placeholder={t("requestModal.fullNamePlaceholder")}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="guest-email"
                            className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                          >
                            {t("requestModal.email")}
                          </label>
                          <input
                            id="guest-email"
                            type="email"
                            required
                            value={guestEmail}
                            onChange={(e) => setGuestEmail(e.target.value)}
                            className="w-full border border-neutral-300 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder-neutral-400 focus:border-neutral-900 focus:outline-none"
                            placeholder={t("requestModal.emailPlaceholder")}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="guest-phone"
                            className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                          >
                            {t("requestModal.phone")}
                          </label>
                          <input
                            id="guest-phone"
                            type="tel"
                            value={guestPhone}
                            onChange={(e) => setGuestPhone(e.target.value)}
                            className="w-full border border-neutral-300 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder-neutral-400 focus:border-neutral-900 focus:outline-none"
                            placeholder={t("requestModal.phonePlaceholder")}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="guest-requests"
                            className="mb-1.5 block text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
                          >
                            {t("propertyDetail.modal.specialRequests")}
                          </label>
                          <textarea
                            id="guest-requests"
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            rows={3}
                            className="w-full resize-none border border-neutral-300 px-4 py-3 text-sm text-neutral-900 transition-colors placeholder-neutral-400 focus:border-neutral-900 focus:outline-none"
                            placeholder={t(
                              "propertyDetail.modal.specialRequestsPlaceholder",
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

      <CTAGetPro />
      {/* <ExperienceVideoSection /> */}
      <Testimonial />
    </div>
  );
}
