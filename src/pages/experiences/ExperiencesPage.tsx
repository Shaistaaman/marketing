import { motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ExperienceVideoSection from "../../components/sections/ExperienceVideoSection";
import PropertySearch from "../../components/search/PropertySearch";
import { ROUTES, VIDEO } from "../../lib/constants";
import type { Guests } from "../../lib/types";
import HowItWorks from "../collections/sections/HowItWorks";
import Package from "../landing/sections/Package";
import Testimonial from "../landing/sections/Testimonial";
import AllExperiences from "./sections/AllExperiences";
import CTAImage from "./sections/CTAImage";
import ExperienceCategories from "./sections/ExperienceCategories";
import ExperienceCTA from "./sections/ExperienceCTA";

export default function ExperiencesPage() {
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

  // Which of the two hero modes is highlighted.
  const [activeTab, setActiveTab] = useState<"experiences" | "packages">(
    "experiences",
  );

  const scrollToSection = (
    tab: "experiences" | "packages",
    elementId: string,
  ) => {
    setActiveTab(tab);
    document.getElementById(elementId)?.scrollIntoView({ behavior: "smooth" });
  };

  const heroButtonClass = (isActive: boolean) =>
    `w-full flex-1 cursor-pointer border border-white px-6 py-3.5 font-sans text-xs tracking-[0.16em] whitespace-nowrap uppercase shadow-lg backdrop-blur-sm transition-all duration-300 sm:w-auto sm:px-8 sm:text-sm ${
      isActive
        ? "scale-[1.02] bg-white font-semibold text-black shadow-2xl"
        : "bg-black/40 text-white hover:border-white hover:bg-white/15"
    }`;

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-black font-sans text-white selection:bg-white selection:text-black">
      <div className="relative z-10 flex min-h-screen flex-col justify-between">
        {/* BACKGROUND VIDEO (from S3) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover opacity-100"
          >
            <source src={VIDEO.homepageHero} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black" />
        </div>

        {/* HERO */}
        <main className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-start gap-8 px-4 pt-50 pb-16 sm:px-6 md:gap-12 md:pt-58 md:pb-24">
          <div className="mx-auto w-full max-w-6xl px-2 text-center">
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5 font-serif text-[clamp(1.5rem,5vw,4.5rem)] leading-none font-normal tracking-tight text-white italic drop-shadow-md"
            >
              {t("experiencesPage.hero.title")}
            </motion.h1>

            <motion.h2
              id="hero-subtitle1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-3 font-sans text-lg font-normal tracking-wide text-white sm:text-2xl"
            >
              {t("experiencesPage.hero.subtitle1")}
            </motion.h2>

            <motion.p
              id="hero-subtitle2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mx-auto mb-10 max-w-2xl font-sans text-xs leading-relaxed font-light tracking-wide text-neutral-200 drop-shadow-sm sm:text-base md:text-lg"
            >
              {t("experiencesPage.hero.subtitle2")}
            </motion.p>
          </div>

          {/* ACTION BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-full max-w-2xl flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
          >
            <button
              onClick={() => scrollToSection("experiences", "experiences")}
              className={heroButtonClass(activeTab === "experiences")}
            >
              {t("experiencesPage.hero.experiencesButton")}
            </button>

            <div className="hidden h-8 w-[1px] flex-shrink-0 bg-white/30 sm:block" />

            <button
              onClick={() => scrollToSection("packages", "packages")}
              className={heroButtonClass(activeTab === "packages")}
            >
              {t("experiencesPage.hero.packagesButton")}
            </button>
          </motion.div>

          {/* SEARCH WIDGET */}
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

      {/* THE ITALY MOST PEOPLE MISS */}
      <section
        id="italy-most-people-miss"
        className="w-full bg-white px-6 py-16 text-center font-sans text-neutral-900 sm:px-12 sm:py-24"
      >
        <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans text-xl font-light tracking-wide text-neutral-700 sm:text-2xl"
          >
            {t("experiencesPage.italyMostPeopleMiss.eyebrow")}
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-3xl font-sans text-2xl leading-snug font-light tracking-tight text-neutral-900 sm:text-3xl md:text-4xl"
          >
            {t("experiencesPage.italyMostPeopleMiss.heading")}
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-3xl space-y-2 pt-2 font-sans text-base leading-relaxed font-light text-neutral-700 sm:text-xl"
          >
            <p>{t("experiencesPage.italyMostPeopleMiss.body")}</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto max-w-3xl pt-4 font-sans text-base font-light tracking-wide text-neutral-900 sm:text-xl"
          >
            {t("experiencesPage.italyMostPeopleMiss.reviewsLine")}
          </motion.p>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="relative z-0 w-full bg-white text-black">
        <ExperienceCategories />
        <ExperienceCTA />
        <div id="packages" />
        <Package />
      </div>

      <ExperienceVideoSection />

      <section id="experiences">
        <AllExperiences />
      </section>

      <CTAImage />
      <HowItWorks />
      <Testimonial />
    </div>
  );
}
