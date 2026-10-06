import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CategoryFilterTabs from "../../../components/common/CategoryFilterTabs";
import ElegantArrow from "../../../components/common/ElegantArrow";
import {
  DESTINATIONS,
  EXPERIENCES_DATA,
  type ExperienceItem,
} from "../../../data/experiences";
import { ROUTES } from "../../../lib/constants";

function ExperienceCard({
  experience,
  onClick,
}: {
  experience: ExperienceItem;
  onClick: () => void;
}) {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % experience.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + experience.images.length) % experience.images.length,
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="experience-card group relative w-[82vw] shrink-0 cursor-pointer snap-center overflow-hidden rounded-none bg-neutral-900 select-none sm:w-[80vw] md:w-[76vw] lg:w-[72vw] xl:w-[1100px]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[16/9] lg:aspect-[1.6]">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={experience.images[currentImageIndex]}
            alt={`${experience.name} - View ${currentImageIndex + 1}`}
            referrerPolicy="no-referrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
          />
        </AnimatePresence>

        {/* Ambient bottom gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/20 to-transparent pt-12 pb-2" />

        {/* Top badges */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 sm:top-6 sm:left-6">
          <span className="rounded-none border border-white/20 bg-black/60 px-3 py-1 font-sans text-[10px] tracking-widest text-white uppercase backdrop-blur-md sm:px-4 sm:py-1.5 sm:text-xs">
            {experience.location}
          </span>
          <span className="hidden rounded-none border border-white/20 bg-black/60 px-3 py-1 font-sans text-[10px] tracking-widest text-amber-300 uppercase backdrop-blur-md sm:inline-block sm:px-4 sm:py-1.5 sm:text-xs">
            {experience.categories?.[0]}
          </span>
        </div>

        {/* Bottom info bar */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-black/55 px-4 py-3 backdrop-blur-[2px] select-text sm:p-5 md:p-6 lg:p-8">
          <div className="min-w-0 flex-1 pr-3 text-white sm:pr-4">
            <h3 className="line-clamp-2 font-serif text-base leading-snug font-normal tracking-wide text-white italic drop-shadow-sm sm:text-lg md:text-xl lg:text-3xl">
              {experience.name}
            </h3>
            <p className="mt-1 line-clamp-1 font-sans text-[10px] font-light tracking-wider text-neutral-300 sm:mt-1.5 sm:text-xs">
              {experience.subtitle}
            </p>
          </div>

          {/* Image swapper */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex shrink-0 items-center gap-1.5 rounded-none border border-white/20 bg-black/40 px-2 py-1 text-[10px] tracking-widest text-white select-none sm:gap-2.5 sm:px-2.5 sm:py-1.5 sm:text-[11px] md:gap-3 md:px-3 md:py-2 md:text-xs"
          >
            <button
              type="button"
              onClick={handlePrevImage}
              className="cursor-pointer p-0.5 transition-colors hover:text-amber-300 active:scale-90"
              aria-label={t("common.aria.previousImage")}
            >
              <ChevronLeft
                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                strokeWidth={2}
              />
            </button>
            <span className="min-w-[22px] text-center font-sans font-light tabular-nums sm:min-w-[28px]">
              {currentImageIndex + 1} / {experience.images.length}
            </span>
            <button
              type="button"
              onClick={handleNextImage}
              className="cursor-pointer p-0.5 transition-colors hover:text-amber-300 active:scale-90"
              aria-label={t("common.aria.nextImage")}
            >
              <ChevronRight
                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AllExperiences() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selectedDestination, setSelectedDestination] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Keep arrow state in sync with scroll position.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    checkScroll();

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [selectedDestination, selectedCategory]);

  // Centre the second card on load / filter change.
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const timeoutId = setTimeout(() => {
      const cards = container.querySelectorAll(".experience-card");
      if (cards.length > 1) {
        const card = cards[1] as HTMLElement;
        const containerCenter = container.clientWidth / 2;
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        container.scrollTo({
          left: cardCenter - containerCenter,
          behavior: "smooth",
        });
      } else {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [selectedDestination, selectedCategory]);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const filteredExperiences = EXPERIENCES_DATA.filter((exp) => {
    const matchesDestination =
      selectedDestination === "ALL" ||
      exp.location.toLowerCase() === selectedDestination.toLowerCase();
    const matchesCategory =
      selectedCategory === "All" ||
      exp.categories.some((cat) => cat === selectedCategory);
    return matchesDestination && matchesCategory;
  });

  return (
    <section className="overflow-hidden bg-white py-16 text-neutral-900 sm:py-24">
      {/* TITLE & CONTROLS */}
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12">
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="font-serif text-4xl font-normal tracking-tight text-neutral-900 italic sm:text-6xl lg:text-7xl">
            {t("experiencesPage.allExperiences.heading")}
          </h2>
          <p className="mt-4 font-sans text-lg font-light tracking-wide text-neutral-800 sm:text-xl">
            {t("experiencesPage.allExperiences.subheading")}
          </p>
        </div>

        {/* Controls bar */}
        <div className="mb-8 flex w-full flex-col items-stretch justify-between gap-4 pb-6 lg:flex-row lg:items-center lg:gap-6">
          {/* Destination dropdown */}
          <div className="relative w-full flex-shrink-0 lg:w-48 xl:w-52">
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              aria-label={t("common.aria.filterByDestination")}
              className="w-full cursor-pointer appearance-none rounded-none border border-neutral-300 bg-white px-3.5 py-3 pr-9 font-sans text-xs font-medium tracking-[0.18em] text-neutral-900 uppercase focus:border-neutral-900 focus:outline-none"
            >
              {DESTINATIONS.map((dest) => (
                <option key={dest} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-neutral-600" />
          </div>

          <CategoryFilterTabs
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            layoutId="activeCategoryIndicator"
          />
        </div>

        {/* Scroll arrows */}
        <div className="mb-6 flex items-center justify-end gap-3">
          <ElegantArrow
            direction="left"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
          />
          <ElegantArrow
            direction="right"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
          />
        </div>
      </div>

      {/* FULL-BLEED CAROUSEL */}
      <div className="relative w-full">
        {filteredExperiences.length > 0 ? (
          <div
            ref={scrollRef}
            className="scrollbar-none carousel-edge-padding flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth py-4 sm:gap-8"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {filteredExperiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                onClick={() => navigate(ROUTES.experienceDetail(exp.id))}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center font-sans text-sm text-neutral-500">
            {t("experiencesPage.allExperiences.emptyState")}
          </div>
        )}
      </div>

      {/* BOTTOM CTA */}
      <div className="mx-auto mt-12 max-w-[1240px] px-6 text-center md:px-12">
        <button
          onClick={() => navigate(ROUTES.experienceCollection)}
          className="inline-block cursor-pointer border border-neutral-900 px-8 py-4 font-sans text-xs font-medium tracking-[0.22em] text-neutral-900 uppercase transition-all duration-300 hover:bg-neutral-50"
        >
          {t("experiencesPage.allExperiences.allExperiencesButton")}
        </button>
      </div>
    </section>
  );
}
