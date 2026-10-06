import {
  Bed,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ShowerHead,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ElegantArrow from "../../../components/common/ElegantArrow";
import { ROUTES } from "../../../lib/constants";

interface PropertyItem {
  id: string;
  name: string;
  region: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  areaSqm: number;
  images: string[];
}

// `id` stays a stable English string (used to filter PROPERTIES_DATA by
// region). `labelKey` controls what's displayed to the user.
const FILTER_REGIONS: { id: string; labelKey: string }[] = [
  { id: "ALL", labelKey: "filters.regions.all" },
  { id: "ROME", labelKey: "filters.regions.rome" },
  { id: "AMALFI COAST", labelKey: "filters.regions.amalfiCoast" },
  { id: "VENICE", labelKey: "filters.regions.venice" },
  { id: "ISCHIA", labelKey: "filters.regions.ischia" },
  { id: "SABAUDIA", labelKey: "filters.regions.sabaudia" },
  { id: "ARGENTARIO", labelKey: "filters.regions.argentario" },
  { id: "PUGLIA", labelKey: "filters.regions.puglia" },
  { id: "PONTINE ISLAND", labelKey: "filters.regions.pontineIsland" },
  { id: "MILAN", labelKey: "filters.regions.milan" },
  { id: "SARDINIA", labelKey: "filters.regions.sardinia" },
  { id: "TUSCANY", labelKey: "filters.regions.tuscany" },
  { id: "LAKE COMO", labelKey: "filters.regions.lakeComo" },
];

const PROPERTIES_DATA: PropertyItem[] = [
  // ROME
  {
    id: "rome-penthouse1",
    name: "Art Gallery Penthouse",
    region: "ROME",
    bedrooms: 4,
    bathrooms: 2,
    guests: 5,
    areaSqm: 400,
    images: [
      "/images/somuch/great.png",
      "/images/somuch/go.png",
      "/images/somuch/rome.png",
    ],
  },
  {
    id: "rome-penthouse",
    name: "Art Gallery Penthouse",
    region: "ROME",
    bedrooms: 4,
    bathrooms: 2,
    guests: 5,
    areaSqm: 400,
    images: [
      "/images/somuch/go.png",
      "/images/somuch/great.png",
      "/images/somuch/rome.png",
    ],
  },
  {
    id: "rome-atelier",
    name: "Trastevere Historic Atelier",
    region: "ROME",
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    areaSqm: 180,
    images: [
      "/images/somuch/rome.png",
      "/images/somuch/great.png",
      "/images/somuch/go.png",
    ],
  },
  // AMALFI COAST
  {
    id: "amalfi-bella-vista",
    name: "Villa Bella Vista",
    region: "AMALFI COAST",
    bedrooms: 5,
    bathrooms: 4,
    guests: 8,
    areaSqm: 450,
    images: [
      "/images/somuch/great.png",
      "/images/somuch/go.png",
      "/images/somuch/rome.png",
    ],
  },
  {
    id: "amalfi-cliffside",
    name: "Positano Dream Palazzo",
    region: "AMALFI COAST",
    bedrooms: 4,
    bathrooms: 3,
    guests: 6,
    areaSqm: 340,
    images: [
      "/images/somuch/go.png",
      "/images/somuch/great.png",
      "/images/somuch/rome.png",
    ],
  },
  // VENICE
  {
    id: "venice-san-marco",
    name: "Palazzo San Marco",
    region: "VENICE",
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    areaSqm: 320,
    images: [
      "/images/somuch/rome.png",
      "/images/somuch/great.png",
      "/images/somuch/go.png",
    ],
  },
  // ISCHIA
  {
    id: "ischia-pietra",
    name: "Santuario di Pietra",
    region: "ISCHIA",
    bedrooms: 3,
    bathrooms: 2,
    guests: 4,
    areaSqm: 280,
    images: [
      "/images/somuch/great.png",
      "/images/somuch/go.png",
      "/images/somuch/rome.png",
    ],
  },
  // SABAUDIA
  {
    id: "sabaudia-dune",
    name: "Dune Horizon Villa",
    region: "SABAUDIA",
    bedrooms: 4,
    bathrooms: 3,
    guests: 6,
    areaSqm: 310,
    images: [
      "/images/somuch/go.png",
      "/images/somuch/great.png",
      "/images/somuch/rome.png",
    ],
  },
  // ARGENTARIO
  {
    id: "argentario-fortezza",
    name: "Fortezza di Cala Galera",
    region: "ARGENTARIO",
    bedrooms: 6,
    bathrooms: 5,
    guests: 10,
    areaSqm: 580,
    images: [
      "/images/somuch/rome.png",
      "/images/somuch/great.png",
      "/images/somuch/go.png",
    ],
  },
  // PUGLIA
  {
    id: "puglia-masseria",
    name: "Masseria dei Trulli",
    region: "PUGLIA",
    bedrooms: 4,
    bathrooms: 4,
    guests: 8,
    areaSqm: 390,
    images: [
      "/images/somuch/great.png",
      "/images/somuch/go.png",
      "/images/somuch/rome.png",
    ],
  },
  // PONTINE ISLAND
  {
    id: "pontine-retreat",
    name: "Isola Ventotene Retreat",
    region: "PONTINE ISLAND",
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    areaSqm: 190,
    images: [
      "/images/somuch/go.png",
      "/images/somuch/great.png",
      "/images/somuch/rome.png",
    ],
  },
  // MILAN
  {
    id: "milan-duplex",
    name: "Quadrilatero Luxury Duplex",
    region: "MILAN",
    bedrooms: 3,
    bathrooms: 3,
    guests: 5,
    areaSqm: 260,
    images: [
      "/images/somuch/rome.png",
      "/images/somuch/great.png",
      "/images/somuch/go.png",
    ],
  },
  // SARDINIA
  {
    id: "sardinia-sanctuary",
    name: "Costa Smeralda Sanctuary",
    region: "SARDINIA",
    bedrooms: 5,
    bathrooms: 6,
    guests: 10,
    areaSqm: 620,
    images: [
      "/images/somuch/great.png",
      "/images/somuch/go.png",
      "/images/somuch/rome.png",
    ],
  },
  // TUSCANY
  {
    id: "tuscany-san-gimignano",
    name: "Tenuta di San Gimignano",
    region: "TUSCANY",
    bedrooms: 6,
    bathrooms: 6,
    guests: 12,
    areaSqm: 720,
    images: [
      "/images/somuch/go.png",
      "/images/somuch/great.png",
      "/images/somuch/rome.png",
    ],
  },
  {
    id: "tuscany-orcia",
    name: "Val d'Orcia Country Estate",
    region: "TUSCANY",
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    areaSqm: 350,
    images: [
      "/images/somuch/rome.png",
      "/images/somuch/great.png",
      "/images/somuch/go.png",
    ],
  },
  // LAKE COMO
  {
    id: "como-sola",
    name: "Villa Sola Cabiati Vista",
    region: "LAKE COMO",
    bedrooms: 5,
    bathrooms: 5,
    guests: 9,
    areaSqm: 650,
    images: [
      "/images/somuch/great.png",
      "/images/somuch/go.png",
      "/images/somuch/rome.png",
    ],
  },
  {
    id: "como-bellagio",
    name: "Bellagio Waterfront Villa",
    region: "LAKE COMO",
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    areaSqm: 240,
    images: [
      "/images/somuch/go.png",
      "/images/somuch/great.png",
      "/images/somuch/rome.png",
    ],
  },
];

function PropertyCard({ property }: { property: PropertyItem }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImgIndex((prev) => (prev + 1) % property.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImgIndex(
      (prev) => (prev - 1 + property.images.length) % property.images.length,
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => navigate(ROUTES.propertyDetail(property.id))}
      className="property-card group relative w-[82vw] shrink-0 cursor-pointer snap-center overflow-hidden bg-neutral-900 select-none sm:w-[80vw] md:w-[76vw] lg:w-[72vw] xl:w-[1100px]"
    >
      {/* Responsive aspect-ratio image container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[16/9] lg:aspect-[1.6]">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImgIndex}
            src={property.images[currentImgIndex]}
            alt={`${property.name} - View ${currentImgIndex + 1}`}
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

        {/* Metadata + controls bar */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-black/55 px-4 py-3 backdrop-blur-[2px] select-text sm:p-5 md:p-6 lg:p-8">
          <div className="min-w-0 flex-1 pr-3 text-white sm:pr-4">
            <h4 className="mb-1 line-clamp-1 font-serif text-base font-normal tracking-wide text-white drop-shadow-sm sm:mb-2 sm:text-lg md:mb-3 md:text-xl lg:text-2xl">
              {property.name}
            </h4>

            {/* Micro amenities row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[9px] font-light tracking-wider text-neutral-200 sm:gap-x-5 sm:text-[10px] md:gap-x-6 md:text-xs">
              <span className="flex shrink-0 items-center gap-1 sm:gap-1.5">
                <Bed
                  className="h-3 w-3 text-white/80 sm:h-[13px] sm:w-[13px]"
                  strokeWidth={1.5}
                />
                {t("collectionsPage.section.specSuffixBeds", {
                  count: property.bedrooms,
                })}
              </span>
              <span className="flex shrink-0 items-center gap-1 sm:gap-1.5">
                <ShowerHead
                  className="h-3 w-3 text-white/80 sm:h-[13px] sm:w-[13px]"
                  strokeWidth={1.5}
                />
                {property.bathrooms} {t("common.specs.baths")}
              </span>
              <span className="flex shrink-0 items-center gap-1 sm:gap-1.5">
                <Users
                  className="h-3 w-3 text-white/80 sm:h-[13px] sm:w-[13px]"
                  strokeWidth={1.5}
                />
                {property.guests} {t("common.specs.guests")}
              </span>
              <span className="flex shrink-0 items-center gap-1 sm:gap-1.5">
                <Maximize2
                  className="h-3 w-3 text-white/80 sm:h-[13px] sm:w-[13px]"
                  strokeWidth={1.5}
                />
                {property.areaSqm} m²
              </span>
            </div>
          </div>

          {/* Image swapper */}
          <div className="flex shrink-0 items-center gap-1.5 border border-white/20 bg-black/40 px-2 py-1 text-[10px] tracking-widest text-white select-none sm:gap-2.5 sm:px-2.5 sm:py-1.5 sm:text-[11px] md:gap-3 md:px-3 md:py-2 md:text-xs">
            <button
              onClick={handlePrevImage}
              className="cursor-pointer p-0.5 transition-colors hover:text-neutral-300 active:scale-90"
              aria-label={t("common.aria.previousImage")}
            >
              <ChevronLeft
                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                strokeWidth={2}
              />
            </button>
            <span className="min-w-[22px] text-center font-sans font-light tabular-nums sm:min-w-[28px]">
              {currentImgIndex + 1} / {property.images.length}
            </span>
            <button
              onClick={handleNextImage}
              className="cursor-pointer p-0.5 transition-colors hover:text-neutral-300 active:scale-90"
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

export default function Property() {
  const { t } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const filteredProperties =
    activeFilter === "ALL"
      ? PROPERTIES_DATA
      : PROPERTIES_DATA.filter((prop) => prop.region === activeFilter);

  // Keep arrow enabled/disabled state in sync with scroll position.
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    };

    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    checkScroll();

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [activeFilter]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const { clientWidth } = scrollContainerRef.current;
    const scrollAmount =
      direction === "left" ? -clientWidth * 0.6 : clientWidth * 0.6;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // Center the second card on load / filter change.
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const timeoutId = setTimeout(() => {
      const cards = container.querySelectorAll(".property-card");
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
    }, 350); // let layout and AnimatePresence settle

    return () => clearTimeout(timeoutId);
  }, [activeFilter]);

  return (
    <section
      id="property-collection-section"
      className="w-full overflow-hidden bg-white py-16 text-neutral-900 md:py-24"
    >
      {/* Header and controls (fixed max-width) */}
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl leading-tight font-normal text-neutral-900 italic sm:text-4xl md:text-[52px]">
            {t("landing.property.heading")}
          </h2>
          <p className="mx-auto max-w-[600px] font-sans text-sm font-light tracking-wide text-neutral-500 sm:text-base">
            {t("landing.property.subheading")}
          </p>
        </div>

        {/* Region filters */}
        <div className="mb-12 w-full pb-6">
          <div className="scrollbar-none flex flex-wrap items-center justify-center gap-x-4 gap-y-6 py-2 sm:gap-x-6 md:gap-x-8 lg:justify-between lg:gap-x-4 xl:gap-x-5">
            {FILTER_REGIONS.map((region) => {
              const isActive = activeFilter === region.id;
              return (
                <button
                  key={region.id}
                  onClick={() => setActiveFilter(region.id)}
                  className="group relative flex shrink-0 cursor-pointer flex-col items-center gap-2 pb-2 select-none focus:outline-none sm:gap-3"
                >
                  <span
                    className={`font-sans text-[8px] font-medium tracking-[0.12em] transition-colors duration-300 sm:text-[9px] sm:tracking-[0.16em] md:text-[10px] lg:text-[11px] ${
                      isActive
                        ? "font-semibold text-neutral-900"
                        : "text-neutral-400 group-hover:text-neutral-900"
                    }`}
                  >
                    {t(region.labelKey)}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterIndicator"
                      className="absolute bottom-0 right-0 left-0 h-[1.5px] bg-neutral-900"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel controls */}
        <div className="mb-6 flex items-center justify-end">
          <div className="flex items-center gap-4">
            <ElegantArrow
              direction="left"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className="scale-90 md:scale-100"
            />
            <ElegantArrow
              direction="right"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className="scale-90 md:scale-100"
            />
          </div>
        </div>
      </div>

      {/* Full-bleed horizontal property cards */}
      <div className="relative w-full">
        <div
          ref={scrollContainerRef}
          className="scrollbar-none carousel-edge-padding flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth py-2 md:gap-8"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="flex w-full flex-col items-center justify-center py-16 font-sans text-sm font-light text-neutral-400">
                <p>{t("landing.property.emptyState")}</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
