import {
  Compass,
  HandPlatter,
  Heart,
  House,
  Landmark,
  Navigation,
  Users,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ElegantArrow from "../../../components/common/ElegantArrow";

interface CategoryItem {
  id: string;
  title: string;
  image: string;
  icon: React.ReactNode;
  /** Retained from the source data; not currently shown on the card. */
  subtitle: string;
}

const ICON_CLASS = "w-12 h-12 text-white stroke-[1.25]";

const CATEGORIES: CategoryItem[] = [
  {
    id: "history-culture",
    title: "History & Culture",
    subtitle: "Private ancient ruins & museum access",
    image: "/images/somuch/go.png",
    icon: <Landmark className={ICON_CLASS} />,
  },
  {
    id: "culinary-adventures",
    title: "Culinary Adventures",
    subtitle: "Michelin chefs & private wine estates",
    image: "/images/somuch/great.png",
    icon: <HandPlatter className={ICON_CLASS} />,
  },
  {
    id: "outdoor-tours",
    title: "Outdoor Tours",
    subtitle: "Coastal yachting & Tuscan drives",
    image: "/images/somuch/rome.png",
    icon: <Compass className={ICON_CLASS} />,
  },
  {
    id: "closed-to-public",
    title: "Closed to the Public",
    subtitle: "Exclusive secret palazzos & sanctuaries",
    image: "/images/somuch/final.png",
    icon: <Users className={ICON_CLASS} />,
  },
  {
    id: "family",
    title: "Family",
    subtitle: "Tailored experiences for all generations",
    image: "/images/somuch/go.png",
    icon: <Heart className={ICON_CLASS} />,
  },
  {
    id: "at-home",
    title: "At Home",
    subtitle: "Private in-residence chefs & spa rituals",
    image: "/images/somuch/great.png",
    icon: <House className={ICON_CLASS} />,
  },
  {
    id: "one-day-city-escape",
    title: "One Day City Escape",
    subtitle: "Helicopter transfers & private day trips",
    image: "/images/somuch/rome.png",
    icon: <Navigation className={ICON_CLASS} />,
  },
];

interface ExperienceCategoriesProps {
  onCategoryClick?: (categoryTitle: string) => void;
}

export default function ExperienceCategories({
  onCategoryClick,
}: ExperienceCategoriesProps) {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
  }, []);

  const scrollBy = (delta: number) => {
    scrollRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="overflow-hidden bg-white px-4 py-16 text-neutral-900 sm:px-8 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        {/* TITLE */}
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="font-serif text-3xl font-normal tracking-tight text-neutral-900 italic sm:text-5xl lg:text-6xl">
            {t("experiencesPage.categories.heading")}
          </h2>
        </div>

        {/* LEFT TEXT + RIGHT SCROLLING CARDS */}
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-12">
          {/* LEFT: fixed text */}
          <div className="w-full flex-shrink-0 text-left lg:w-1/3">
            <p className="max-w-md font-sans text-lg leading-relaxed font-light text-neutral-800 sm:text-xl lg:text-2xl">
              {t("experiencesPage.categories.intro")}
            </p>
          </div>

          {/* RIGHT: category carousel */}
          <div className="flex w-full flex-col lg:w-2/3">
            <div className="mb-6 flex items-center justify-end">
              <div className="flex items-center gap-4">
                <ElegantArrow
                  direction="left"
                  onClick={() => scrollBy(-360)}
                  disabled={!canScrollLeft}
                  className="scale-90 md:scale-100"
                />
                <ElegantArrow
                  direction="right"
                  onClick={() => scrollBy(360)}
                  disabled={!canScrollRight}
                  className="scale-90 md:scale-100"
                />
              </div>
            </div>

            <div
              ref={scrollRef}
              className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 py-2 sm:gap-6"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {CATEGORIES.map((category) => (
                <div
                  key={category.id}
                  onClick={
                    onCategoryClick
                      ? () => onCategoryClick(category.title)
                      : undefined
                  }
                  className={`group/card relative h-[380px] w-[260px] flex-shrink-0 snap-start overflow-hidden rounded-none border border-neutral-200/50 transition-all duration-500 hover:shadow-2xl sm:h-[450px] sm:w-[310px] md:w-[340px] ${
                    onCategoryClick ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  {/* Background image */}
                  <img
                    src={category.image}
                    alt={category.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-108"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 transition-colors duration-500 group-hover/card:from-black/90 group-hover/card:via-black/50" />

                  {/* Icon + title */}
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
                    <div className="mb-6 transform drop-shadow-lg transition-transform duration-500 group-hover/card:scale-110">
                      {category.icon}
                    </div>

                    <h3 className="font-sans text-xl font-medium tracking-wide text-white drop-shadow-md sm:text-2xl">
                      {category.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
