import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ElegantArrow from "../../../components/common/ElegantArrow";

interface DiscoverCard {
  id: string;
  title: string;
  image: string;
}

const DISCOVER_CARDS: DiscoverCard[] = [
  {
    id: "flavors-of-italy",
    title:
      "Flavors Of Italy: Unveiling The Best Local Dishes In Each Skylife Destination",
    image: "/images/somuch/go.png",
  },
  {
    id: "exciting-rome",
    title: "The Most Exciting And Up-And-Coming Areas In Rome",
    image: "/images/somuch/rome.png",
  },
  {
    id: "inside-skylife-designer",
    title: "Inside Skylife: A Designer's Vision For Curating Unique Space",
    image: "/images/somuch/great.png",
  },
  {
    id: "designer-vision-unique-space",
    title: "A Designer's Vision For Curating Unique Space",
    image: "/images/somuch/final.png",
  },
  {
    id: "florence-suite",
    title: "Florentine Mornings: Historic Elegance In The Heart of Tuscany",
    image: "/images/somuch/go.png",
  },
  {
    id: "tuscan-dining",
    title:
      "Under The Tuscan Sun: Curating Unforgettable Al Fresco Culinary Gatherings",
    image: "/images/somuch/great.png",
  },
  {
    id: "lake-como",
    title:
      "Lake Como Retrospective: The Art of Lakeside Living and Serene Landscapes",
    image: "/images/somuch/rome.png",
  },
  {
    id: "palazzo-bath",
    title:
      "Sanctuaries of Solitude: Historic Palazzo Baths & Restorative Wellness",
    image: "/images/somuch/final.png",
  },
];

export default function SoMuch() {
  const { t } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const updateScrollButtons = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    };

    container.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    updateScrollButtons();

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth =
      container.clientWidth / (window.innerWidth < 768 ? 1.2 : 4);
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

    container.scrollTo({
      left: container.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="so-much-discover-section"
      className="flex w-full flex-col items-center bg-white px-6 py-16 text-neutral-900 md:px-12 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1240px]">
        {/* Header + navigation */}
        <div className="relative mb-10 flex w-full flex-col items-center justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 text-center font-serif text-4xl leading-tight tracking-wide text-neutral-900 italic sm:text-5xl md:mb-10 md:text-[54px]"
          >
            {t("landing.soMuch.heading")}
          </motion.h2>

          <div className="mt-2 flex w-full items-center justify-end gap-4">
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

        {/* Carousel */}
        <div className="relative w-full overflow-visible">
          <div
            ref={scrollContainerRef}
            className="scrollbar-none flex w-full snap-x gap-6 overflow-x-auto scroll-smooth py-2 select-none md:gap-8"
          >
            {DISCOVER_CARDS.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.35,
                  delay: idx * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex w-[80%] flex-shrink-0 cursor-pointer snap-start flex-col sm:w-[45%] md:w-[31%] lg:w-[23%]"
              >
                {/* Square image with hover zoom */}
                <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-none bg-neutral-100 transition-transform duration-500">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* Editorial title */}
                <h3 className="font-serif text-lg leading-[1.35] font-medium tracking-normal text-neutral-800 transition-colors duration-300 group-hover:text-black md:text-[19px]">
                  {card.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
