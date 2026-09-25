import { Calendar, MapPin, Search, UserPlus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { SupportedLanguage } from "../../i18n/config";
import { getFormattedDate } from "../../lib/formatDate";
import type { Guests } from "../../lib/types";
import CalendarMonthGrid from "./CalendarMonthGrid";
import FieldDivider from "./FieldDivider";
import GuestCounterRow from "./GuestCounterRow";
import SearchCapsuleField from "./SearchCapsuleField";

const DESTINATION_KEYS = [
  "como",
  "amalfi",
  "tuscany",
  "venice",
  "rome",
  "sicily",
] as const;

interface PropertySearchProps {
  location: string;
  setLocation: (loc: string) => void;
  checkIn: Date | null;
  setCheckIn: (date: Date | null) => void;
  checkOut: Date | null;
  setCheckOut: (date: Date | null) => void;
  guests: Guests;
  setGuests: React.Dispatch<React.SetStateAction<Guests>>;
  onSearch?: () => void;
}

/**
 * The capsule search widget shared by the Landing, Collections, Owner and
 * Experiences hero sections. Reads the active language and all copy from
 * i18next directly — do not pass `translation`/`language` props back in.
 */
export default function PropertySearch({
  location,
  setLocation,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guests,
  setGuests,
  onSearch,
}: PropertySearchProps) {
  const { t, i18n } = useTranslation();
  const language = i18n.language as SupportedLanguage;

  // Single "dates" popup covers both check-in and check-out selection,
  // shown as a two-month range calendar.
  const [activePopup, setActivePopup] = useState<
    "location" | "guests" | "dates" | null
  >(null);

  const today = useMemo(() => new Date(), []);
  const [monthOffset, setMonthOffset] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePopup(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMonthPrev = () => {
    setMonthOffset((prev) => Math.max(0, prev - 1));
  };

  const handleMonthNext = () => {
    setMonthOffset((prev) => Math.min(10, prev + 1));
  };

  // Unified range-select logic: first click sets check-in, second sets
  // check-out (or restarts the range if the new date is earlier).
  const handleDateClick = (clickedDate: Date) => {
    const midnightToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    if (clickedDate < midnightToday) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(clickedDate);
      setCheckOut(null);
    } else if (checkIn && !checkOut) {
      if (clickedDate.getTime() >= checkIn.getTime()) {
        setCheckOut(clickedDate);
      } else {
        setCheckIn(clickedDate);
        setCheckOut(null);
      }
    }
  };

  const getTotalGuestCount = () =>
    guests.adults + guests.children + guests.infants;

  const leftMonthDate = new Date(
    today.getFullYear(),
    today.getMonth() + monthOffset,
    1,
  );
  const rightMonthDate = new Date(
    today.getFullYear(),
    today.getMonth() + monthOffset + 1,
    1,
  );

  const destinations = DESTINATION_KEYS.map((key) => ({
    id: key,
    name: t(`search.destinations.${key}.name`),
    region: t(`search.destinations.${key}.region`),
    description: t(`search.destinations.${key}.description`),
  }));

  return (
    <div className="w-full relative">
      {/* Main Capsule Frame */}
      <div className="w-full bg-neutral-950/90 border border-white/25 rounded-[2rem] md:rounded-full p-4 md:p-2 md:pl-8 md:pr-2 flex flex-col md:flex-row md:items-center justify-between relative shadow-2xl gap-2 md:gap-0">
        <SearchCapsuleField
          icon={<MapPin className="w-4 h-4 stroke-[1.5]" />}
          label={t("search.location")}
          value={location || t("search.whereGoing")}
          onClick={() =>
            setActivePopup(activePopup === "location" ? null : "location")
          }
          truncateValue
        />

        <FieldDivider />

        <SearchCapsuleField
          icon={<Calendar className="w-4 h-4 stroke-[1.5]" />}
          label={t("search.checkIn")}
          value={getFormattedDate(checkIn, language, t("search.addDate"))}
          onClick={() =>
            setActivePopup(activePopup === "dates" ? null : "dates")
          }
        />

        <FieldDivider />

        <SearchCapsuleField
          icon={<Calendar className="w-4 h-4 stroke-[1.5]" />}
          label={t("search.checkOut")}
          value={getFormattedDate(checkOut, language, t("search.addDate"))}
          onClick={() =>
            setActivePopup(activePopup === "dates" ? null : "dates")
          }
        />

        <FieldDivider />

        <SearchCapsuleField
          icon={<UserPlus className="w-4 h-4 stroke-[1.5]" />}
          label={t("search.guests")}
          value={
            getTotalGuestCount() > 0
              ? t("search.guestsSummary", {
                  adults: guests.adults,
                  children: guests.children,
                }) +
                (guests.infants > 0
                  ? t("search.guestsSummaryInfants", {
                      infants: guests.infants,
                    })
                  : "")
              : t("search.addGuests")
          }
          onClick={() =>
            setActivePopup(activePopup === "guests" ? null : "guests")
          }
        />

        {/* Circular Action Search Button */}
        <button
          id="search-action-btn"
          onClick={onSearch}
          className="h-12 w-full md:w-12 rounded-full bg-black border border-white/30 text-white hover:bg-white hover:text-black flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 self-center md:mx-2 mt-2 md:mt-0 group shrink-0 shadow-lg active:scale-95"
          aria-label={t("common.actions.search")}
        >
          <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span className="md:hidden font-sans font-medium text-xs tracking-widest uppercase">
            {t("search.searchProperties")}
          </span>
        </button>
      </div>

      {/* BACKDROP TO DETECT CLICK OUTSIDE */}
      {activePopup && (
        <div
          className="fixed inset-0 z-40 cursor-default"
          onClick={() => setActivePopup(null)}
        />
      )}

      {/* POPOVERS CONTAINER */}
      <AnimatePresence>
        {/* A. Location Selection Popover */}
        {activePopup === "location" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 md:left-4 md:right-auto md:w-[480px] top-[105%] bg-neutral-950 border border-white/10 rounded-2xl p-6 shadow-2xl z-50 font-sans"
          >
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
              <span className="text-xs uppercase tracking-widest text-white/40 font-medium">
                {t("search.italianLuxuryDestinations")}
              </span>
              <button
                onClick={() => setActivePopup(null)}
                className="text-white/40 hover:text-white"
                aria-label={t("common.aria.close")}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
              {destinations.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => {
                    setLocation(`${dest.name}, ${dest.region}`);
                    setActivePopup("dates");
                  }}
                  className={`flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                    location.startsWith(dest.name)
                      ? "bg-white/10 border border-white/20"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <MapPin className="w-4 h-4 text-white/50 mt-1" />
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-serif italic text-white text-sm font-medium">
                        {dest.name}
                      </span>
                      <span className="text-[10px] text-white/40 tracking-wider uppercase font-sans">
                        ({dest.region})
                      </span>
                    </div>
                    <p className="text-xs text-white/60 font-light mt-0.5">
                      {dest.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/5">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t("search.customDestinationPlaceholder")}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/40 font-sans"
              />
            </div>
          </motion.div>
        )}

        {/* B. Date Range Picker Popover (two months, range styling) */}
        {activePopup === "dates" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 md:-left-10 lg:left-8 md:w-[660px] top-[105%] bg-neutral-950 border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl z-50 font-sans"
          >
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-white/50 font-medium">
                {t("search.selectDates")}
              </span>
              <button
                onClick={() => setActivePopup(null)}
                className="text-white/40 hover:text-white p-1 rounded-full hover:bg-white/10 cursor-pointer"
                aria-label={t("common.aria.close")}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* TWO MONTHS CALENDAR GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <CalendarMonthGrid
                year={leftMonthDate.getFullYear()}
                month={leftMonthDate.getMonth()}
                today={today}
                checkIn={checkIn}
                checkOut={checkOut}
                onDateClick={handleDateClick}
                showPrev
                onPrev={handleMonthPrev}
                prevDisabled={monthOffset === 0}
              />
              <CalendarMonthGrid
                year={rightMonthDate.getFullYear()}
                month={rightMonthDate.getMonth()}
                today={today}
                checkIn={checkIn}
                checkOut={checkOut}
                onDateClick={handleDateClick}
                showNext
                onNext={handleMonthNext}
                nextDisabled={monthOffset >= 10}
              />
            </div>

            {/* FOOTER BAR */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-white/70 font-light text-center sm:text-left">
                {checkIn && checkOut ? (
                  <span>
                    {t("search.selected")}:{" "}
                    <strong className="text-white font-semibold">
                      {getFormattedDate(checkIn, language, "")} –{" "}
                      {getFormattedDate(checkOut, language, "")}
                    </strong>
                  </span>
                ) : checkIn ? (
                  <span>{t("search.selectCheckOutDate")}</span>
                ) : (
                  <span>{t("search.selectCheckInCheckOutDates")}</span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {(checkIn || checkOut) && (
                  <button
                    type="button"
                    onClick={() => {
                      setCheckIn(null);
                      setCheckOut(null);
                    }}
                    className="text-white/60 hover:text-white underline text-xs font-medium cursor-pointer"
                  >
                    {t("search.clearDates")}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setActivePopup(null)}
                  className="bg-white text-black px-5 py-2 rounded-full text-xs font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  {t("common.actions.done")}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* C. Guest Counter Popover */}
        {activePopup === "guests" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 left-0 md:left-auto md:right-4 md:w-[320px] top-[105%] bg-neutral-950 border border-white/10 rounded-2xl p-6 shadow-2xl z-50 font-sans"
          >
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
              <span className="text-xs uppercase tracking-widest text-white/40 font-medium">
                {t("search.selectGuests")}
              </span>
              <button
                onClick={() => setActivePopup(null)}
                className="text-white/40 hover:text-white"
                aria-label={t("common.aria.close")}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-5">
              <GuestCounterRow
                label={t("search.adults")}
                sublabel={t("search.adultsSubtitle")}
                value={guests.adults}
                onDecrement={() =>
                  setGuests((prev) => ({
                    ...prev,
                    adults: Math.max(1, prev.adults - 1),
                  }))
                }
                onIncrement={() =>
                  setGuests((prev) => ({ ...prev, adults: prev.adults + 1 }))
                }
              />
              <GuestCounterRow
                label={t("search.children")}
                sublabel={t("search.childrenSubtitle")}
                value={guests.children}
                onDecrement={() =>
                  setGuests((prev) => ({
                    ...prev,
                    children: Math.max(0, prev.children - 1),
                  }))
                }
                onIncrement={() =>
                  setGuests((prev) => ({
                    ...prev,
                    children: prev.children + 1,
                  }))
                }
              />
              <GuestCounterRow
                label={t("search.infants")}
                sublabel={t("search.infantsSubtitle")}
                value={guests.infants}
                onDecrement={() =>
                  setGuests((prev) => ({
                    ...prev,
                    infants: Math.max(0, prev.infants - 1),
                  }))
                }
                onIncrement={() =>
                  setGuests((prev) => ({ ...prev, infants: prev.infants + 1 }))
                }
              />
            </div>

            <button
              onClick={() => setActivePopup(null)}
              className="w-full mt-6 bg-white hover:bg-neutral-200 text-black py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              {t("search.applySelection")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
