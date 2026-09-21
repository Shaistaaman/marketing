import { ChevronLeft, ChevronRight } from "lucide-react";
import { isBetweenDays, isSameDay } from "../../lib/dateRangeUtils";
import type { Language } from "../../lib/types";

interface CalendarMonthGridProps {
  year: number;
  month: number; // 0-indexed
  language: Language;
  today: Date;
  checkIn: Date | null;
  checkOut: Date | null;
  onDateClick: (date: Date) => void;
  /** Show the "prev" arrow (only the left-most month in a multi-month view) */
  showPrev?: boolean;
  /** Show the "next" arrow (only the right-most month in a multi-month view) */
  showNext?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
}

/**
 * Renders a single month's calendar grid with range selection styling.
 */
export default function CalendarMonthGrid({
  year,
  month,
  language,
  today,
  checkIn,
  checkOut,
  onDateClick,
  showPrev = false,
  showNext = false,
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
}: CalendarMonthGridProps) {
  const mDate = new Date(year, month, 1);
  const monthName = mDate.toLocaleDateString(
    language === "en" ? "en-US" : "it-IT",
    { month: "long", year: "numeric" },
  );
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const midnightToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 px-1">
        {showPrev ? (
          <button
            type="button"
            onClick={onPrev}
            disabled={prevDisabled}
            className="p-1.5 hover:bg-white/10 text-white/80 rounded-full transition-colors cursor-pointer disabled:opacity-20 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-7" />
        )}

        <span className="font-semibold text-xs sm:text-sm text-white tracking-widest uppercase">
          {monthName}
        </span>

        {showNext ? (
          <button
            type="button"
            onClick={onNext}
            disabled={nextDisabled}
            className="p-1.5 hover:bg-white/10 text-white/80 rounded-full transition-colors cursor-pointer disabled:opacity-20 disabled:hover:bg-transparent"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-7" />
        )}
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-2">
        <span>Su</span>
        <span>Mo</span>
        <span>Tu</span>
        <span>We</span>
        <span>Th</span>
        <span>Fr</span>
        <span>Sa</span>
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-1 gap-x-0 text-center text-xs">
        {Array.from({ length: firstDayIndex }).map((_, idx) => (
          <div key={`blank-${idx}`} className="h-9" />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((dayNum) => {
          const dayDate = new Date(year, month, dayNum);
          const isBeforeToday = dayDate < midnightToday;

          const isStart = isSameDay(dayDate, checkIn);
          const isEnd = isSameDay(dayDate, checkOut);
          const inRange = isBetweenDays(dayDate, checkIn, checkOut);

          let cellStyle =
            "text-white/90 hover:bg-white/15 rounded-full font-medium";
          let wrapperStyle = "";

          if (isBeforeToday) {
            cellStyle = "text-white/20 cursor-not-allowed pointer-events-none";
          } else if (isStart && isEnd) {
            cellStyle =
              "bg-white text-black font-bold rounded-full shadow-md z-10 relative";
          } else if (isStart) {
            cellStyle =
              "bg-white text-black font-bold rounded-full shadow-md z-10 relative";
            wrapperStyle = checkOut ? "bg-white/20 rounded-l-full" : "";
          } else if (isEnd) {
            cellStyle =
              "bg-white text-black font-bold rounded-full shadow-md z-10 relative";
            wrapperStyle = "bg-white/20 rounded-r-full";
          } else if (inRange) {
            cellStyle = "text-white font-semibold";
            wrapperStyle = "bg-white/20";
          }

          return (
            <div
              key={dayNum}
              className={`h-9 flex items-center justify-center ${wrapperStyle}`}
            >
              <button
                type="button"
                onClick={() => !isBeforeToday && onDateClick(dayDate)}
                disabled={isBeforeToday}
                className={`w-8 h-8 flex items-center justify-center text-xs transition-all cursor-pointer ${cellStyle}`}
              >
                {dayNum}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
