import { motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../lib/constants";
import type { ActiveTab, Guests } from "../../lib/types";
import PropertySearch from "../search/PropertySearch";

/** Map each tab to the route it navigates to. */
const TAB_ROUTES: Record<ActiveTab, string> = {
  STAY: ROUTES.collections,
  EXPERIENCE: ROUTES.experiences,
  OWN: ROUTES.owner,
};

type HeroBackground =
  | { kind: "video"; src: string }
  | { kind: "image"; src: string; alt?: string };

interface PageHeroProps {
  background: HeroBackground;
  /** Which category tab starts active. */
  initialTab?: ActiveTab;
  /**
   * Override the title/subtitle translation keys (e.g. the Collections page
   * has its own headline but reuses all the other search copy).
   */
  titleKey?: string;
  subtitleKey?: string;
}

/**
 * The full-screen hero shared by the Landing and Collections pages:
 * media background, animated headline, STAY/EXPERIENCE/OWN tabs and the
 * capsule PropertySearch widget. All copy comes from i18next.
 */
export default function PageHero({
  background,
  initialTab = "STAY",
  titleKey = "landing.hero.title",
  subtitleKey = "landing.hero.subtitle",
}: PageHeroProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState<Guests>({
    adults: 2,
    children: 0,
    infants: 0,
  });
  const [activeTab, setActiveTab] = useState<ActiveTab>(initialTab);

  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    navigate(TAB_ROUTES[tab]);
  };

  const tabs: { id: ActiveTab; label: string }[] = [
    { id: "STAY", label: t("search.stay") },
    { id: "EXPERIENCE", label: t("search.experience") },
    { id: "OWN", label: t("search.own") },
  ];

  return (
    <div className="relative z-10 flex min-h-screen flex-col justify-between">
      {/* BACKGROUND MEDIA */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {background.kind === "video" ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover opacity-100"
          >
            <source src={background.src} type="video/mp4" />
          </video>
        ) : (
          <img
            src={background.src}
            alt={background.alt ?? ""}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black" />
      </div>

      {/* MAIN BANNER */}
      <main className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-start gap-8 px-4 pt-50 pb-16 sm:px-6 md:gap-12 md:pt-58 md:pb-24">
        {/* HEADING GROUP */}
        <div className="mx-auto w-full max-w-6xl px-2 text-center">
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(1.5rem,5vw,4.5rem)] leading-[1.15] tracking-wide text-white italic"
          >
            {t(titleKey)}
          </motion.h1>

          <motion.p
            id="hero-subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 max-w-4xl text-sm leading-relaxed font-light tracking-wide text-white/90 sm:text-base md:text-lg"
          >
            {t(subtitleKey)}
          </motion.p>
        </div>

        {/* CATEGORY TABS */}
        <motion.div
          id="category-navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 mb-12 flex items-center justify-center gap-8 font-sans text-base font-normal tracking-[0.2em] text-white/90 sm:gap-16 sm:text-lg"
        >
          {tabs.map((tab, index) => (
            <div key={tab.id} className="flex items-center gap-8 sm:gap-16">
              {index > 0 && <div className="h-3 w-[1px] bg-white/20" />}
              <button
                onClick={() => handleTabClick(tab.id)}
                className={`relative cursor-pointer py-2 transition-colors duration-200 hover:text-white ${
                  activeTab === tab.id ? "text-white" : "text-white/40"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute -bottom-1 right-0 left-0 h-[1.5px] bg-white"
                  />
                )}
              </button>
            </div>
          ))}
        </motion.div>

        {/* CAPSULE SEARCH WIDGET */}
        <motion.div
          id="search-widget-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-30 w-full max-w-4xl"
        >
          <PropertySearch
            location={location}
            setLocation={setLocation}
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            guests={guests}
            setGuests={setGuests}
            onSearch={() => navigate(ROUTES.collections)}
          />
        </motion.div>
      </main>
    </div>
  );
}
