import { Calendar, ChevronRight, Moon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ElegantArrow from "../../../components/common/ElegantArrow";
import { ROUTES } from "../../../lib/constants";

interface PackageItem {
  id: string;
  duration: string;
  title: string;
  season: string;
  image: string;
  items: string[];
}

const PACKAGES_DATA: PackageItem[] = [
  {
    id: "roman-edit",
    duration: "4 NIGHTS",
    title: "The Roman Edit",
    season: "JANUARY - MARCH",
    image: "/images/somuch/great.png",
    items: [
      "Rooftop terrace apartment",
      "Private city orientation",
      "Ancient Rome access",
      "Concierge throughout",
    ],
  },
  {
    id: "grande-bellezza",
    duration: "9 NIGHTS",
    title: "La Grande Bellezza",
    season: "MARCH - SEPTEMBER",
    image: "/images/somuch/go.png",
    items: [
      "Night tour of the Valley of Temples",
      "Florence",
      "Venice",
      "Private transfers",
    ],
  },
  {
    id: "islands-light",
    duration: "8 NIGHTS",
    title: "Islands of Light",
    season: "APRIL - OCTOBER",
    image: "/images/somuch/final.png",
    items: ["Sardinia", "Sicily", "Coastal villas", "Island boat days"],
  },
  {
    id: "amalfi-dream",
    duration: "7 NIGHTS",
    title: "Coastal Masterpiece",
    season: "MAY - SEPTEMBER",
    image: "/images/somuch/rome.png",
    items: [
      "Cliffside boutique hotel",
      "Path of the Gods hike",
      "Private yacht charter",
      "Michelin dining access",
    ],
  },
];

export default function Package() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const { clientWidth } = scrollContainerRef.current;
    const scrollAmount =
      direction === "left" ? -clientWidth * 0.4 : clientWidth * 0.4;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="custom-packages-section"
      className="w-full overflow-hidden bg-white py-16 text-neutral-900 md:py-24"
    >
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        {/* Header Grid: Title and Intro side-by-side */}
        <div className="mb-12 grid grid-cols-1 items-start gap-8 sm:mb-16 md:grid-cols-2 md:gap-16">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl leading-[1.1] font-normal text-neutral-900 sm:text-4xl md:text-[51px]">
              {t("landing.package.headingLine1")}
              <br />
              <span className="italic">
                {t("landing.package.headingLine2")}
              </span>
            </h2>
          </div>

          <div className="space-y-6 md:pt-2">
            <p className="font-sans text-sm leading-relaxed font-light text-neutral-600 sm:text-base">
              {t("landing.package.intro1")}
            </p>
            <p className="font-sans text-sm leading-relaxed font-light text-neutral-600 sm:text-base">
              {t("landing.package.intro2")}
            </p>
            <p className="font-sans text-xs font-light tracking-wide text-neutral-500 italic sm:text-sm">
              {t("landing.package.intro3")}
            </p>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="mb-8 flex items-center justify-end">
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

        {/* Horizontally scrolling package cards */}
        <div className="relative mb-16 w-full">
          <div
            ref={scrollContainerRef}
            className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth py-4 md:gap-8"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {PACKAGES_DATA.map((pkg) => (
              <div
                key={pkg.id}
                className="group flex w-[280px] shrink-0 snap-start flex-col justify-between border border-neutral-100/40 bg-neutral-50 p-5 transition-all duration-500 hover:shadow-lg hover:shadow-neutral-100 sm:w-[320px] md:w-[360px] md:p-6"
              >
                <div>
                  {/* Package Image */}
                  <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden bg-neutral-200">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      loading="eager"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                    />
                  </div>

                  {/* Duration label */}
                  <div className="mb-2 flex items-center gap-1.5 font-sans text-[10px] font-semibold tracking-[0.2em] text-neutral-800 uppercase md:text-[11px]">
                    <Moon size={11} className="text-neutral-400" />
                    {pkg.duration}
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 font-serif text-xl font-normal tracking-wide text-neutral-900 italic transition-colors duration-300 group-hover:text-neutral-700 sm:text-2xl md:text-[28px]">
                    {pkg.title}
                  </h3>

                  {/* Season / Period label */}
                  <div className="mb-6 flex items-center gap-1.5 border-b border-neutral-100 pb-4 font-sans text-[9px] font-light tracking-[0.15em] text-neutral-400 uppercase md:text-[10px]">
                    <Calendar size={11} className="text-neutral-300" />
                    {pkg.season}
                  </div>

                  {/* Inclusions list */}
                  <ul className="mb-8 space-y-3">
                    {pkg.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="border-b border-dashed border-neutral-200/60 pb-3 font-sans text-xs font-light text-neutral-600 select-text last:border-none sm:text-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* More Details Action Link */}
                <div className="border-t border-neutral-100 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.packageDetail(pkg.id))}
                    className="inline-flex cursor-pointer items-center gap-2 font-sans text-[10px] font-semibold tracking-[0.18em] text-neutral-900 uppercase transition-colors duration-300 hover:text-neutral-500 md:text-[11px]"
                  >
                    {t("landing.package.moreDetails")}
                    <ChevronRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* "None of these quite right?" bottom card */}
        <div className="relative w-full overflow-hidden border border-neutral-200/80 bg-white p-8 shadow-sm transition-shadow duration-500 hover:shadow-md md:p-12 lg:p-16">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-8">
              <h3 className="font-serif text-2xl leading-tight font-normal text-neutral-900 sm:text-3xl md:text-[38px]">
                {t("landing.package.notQuiteRightHeading1")}
                <br />
                <span className="font-normal italic">
                  {t("landing.package.notQuiteRightHeading2")}
                </span>
              </h3>
              <p className="max-w-[680px] font-sans text-sm leading-relaxed font-light text-neutral-600 sm:text-base">
                {t("landing.package.notQuiteRightBody")}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 lg:col-span-4 lg:items-end">
              <a
                href="https://skylifemanagement.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full cursor-pointer border border-neutral-900 px-8 py-4 text-center font-sans text-xs font-medium tracking-[0.2em] text-neutral-900 uppercase transition-all duration-300 hover:bg-neutral-900 hover:text-white active:scale-95 sm:w-auto sm:text-sm"
              >
                {t("landing.package.bookFreeCall")}
              </a>
              <p className="text-center font-sans text-[10px] font-light tracking-wider text-neutral-400 uppercase lg:text-right sm:text-xs">
                {t("landing.package.bookFreeCallCaption")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
