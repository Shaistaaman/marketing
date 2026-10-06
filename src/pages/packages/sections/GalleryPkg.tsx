import { motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ElegantArrow from "../../../components/common/ElegantArrow";

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  caption: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    url: "/images/exp/1.jpg",
    title: "Gondola Serenade in Venice",
    caption: "Private Venetian Canal Tours",
  },
  {
    id: 2,
    url: "/images/exp/2.jpg",
    title: "Amalfi Coast Terraces",
    caption: "Positano Sea View Escapes",
  },
  {
    id: 3,
    url: "/images/exp/3.jpg",
    title: "Florence Sunset Panorama",
    caption: "Duomo & Tuscan Horizons",
  },
  {
    id: 4,
    url: "/images/exp/4.jpg",
    title: "Rome Shopping & Lifestyle",
    caption: "Spanish Steps & Via Condotti",
  },
  {
    id: 5,
    url: "/images/exp/5.jpg",
    title: "Saint Peter Rooftop Terrace",
    caption: "Private Vatican Sunset Aperitivo",
  },
  {
    id: 6,
    url: "/images/exp/6.jpg",
    title: "Lake Como Boat Excursions",
    caption: "Bellagio & Villa Balbianello",
  },
  {
    id: 7,
    url: "/images/exp/7.jpg",
    title: "Tuscan Vineyard Dining",
    caption: "Chianti Al Fresco Gastronomy",
  },
  {
    id: 8,
    url: "/images/exp/8.jpg",
    title: "Rolling Hills of Val d'Orcia",
    caption: "Cypress Roads & Historic Estates",
  },
  {
    id: 9,
    url: "/images/exp/9.jpg",
    title: "Illuminated Italian Waterway",
    caption: "Evening Luxury Harbor Experience",
  },
];

/** How many cards are visible either side of the centred one. */
const VISIBLE_RANGE = 3;

export default function GalleryPkg() {
  const { t } = useTranslation();
  // Start centred on image 5.
  const [currentIndex, setCurrentIndex] = useState(4);

  const total = GALLERY_IMAGES.length;
  const active = GALLERY_IMAGES[currentIndex];

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % total);

  /** Circular relative offset from the centred card. */
  const getOffset = (index: number) => {
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section className="relative w-full overflow-hidden border-t border-b border-neutral-100 bg-white py-20 font-sans text-neutral-900 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        {/* CAROUSEL STAGE */}
        <div className="relative flex h-[480px] items-center justify-center overflow-hidden sm:h-[580px] lg:h-[660px]">
          {GALLERY_IMAGES.map((item, index) => {
            const offset = getOffset(index);
            if (Math.abs(offset) > VISIBLE_RANGE) return null;

            const absOffset = Math.abs(offset);
            const scale = 1 - absOffset * 0.13;
            const zIndex = 40 - absOffset * 10;
            const translateX = offset * 35; // percent
            const opacity = 1 - absOffset * 0.12;
            const isCentre = offset === 0;

            return (
              <motion.div
                key={item.id}
                onClick={() => setCurrentIndex(index)}
                initial={false}
                animate={{ x: `${translateX}%`, scale, zIndex, opacity }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="absolute cursor-pointer transition-shadow duration-300 select-none"
                style={{
                  width: "clamp(260px, 32vw, 430px)",
                  aspectRatio: "3 / 4",
                }}
              >
                <div
                  className={`h-full w-full overflow-hidden rounded-none transition-all duration-500 ${
                    isCentre
                      ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-black/10"
                      : "brightness-95 shadow-lg"
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    loading="eager"
                    decoding="async"
                    className="pointer-events-none h-full w-full object-cover object-center"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CAPTION */}
        <div className="mt-12 space-y-2 text-center sm:mt-16">
          <p className="font-serif text-2xl font-normal tracking-normal text-neutral-800 italic sm:text-3xl">
            {t("packagesPage.gallery.caption")}
          </p>
          {active && (
            <p className="font-mono text-xs tracking-[0.25em] text-neutral-400 uppercase">
              {active.title} — {active.caption}
            </p>
          )}
        </div>

        {/* CONTROLS */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <ElegantArrow direction="left" onClick={handlePrev} />
          <ElegantArrow direction="right" onClick={handleNext} />
        </div>
      </div>
    </section>
  );
}
