import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import HowItWorks from "../collections/sections/HowItWorks";
import WhereNextSection from "../collections/sections/WhereNextSection";
import ExperienceCollectionList from "./sections/ExperienceCollectionList";

export default function ExperienceCollectionPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* HERO */}
      <div className="relative flex h-screen max-h-[1050px] min-h-[680px] w-full flex-col justify-between overflow-hidden bg-black text-white">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/experiencebanner.jpg"
            alt="Craft Your Skylife Experience"
            className="absolute inset-0 h-full w-full scale-102 transform object-cover object-center transition-transform duration-1000"
          />
          {/* Vignette + overlay for typography legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/75" />
          <div className="absolute inset-0 bg-black/25 backdrop-brightness-95" />
        </div>

        {/* Centre content */}
        <div className="relative z-10 mx-auto my-auto flex max-w-5xl flex-1 flex-col items-center justify-center px-6 py-12 text-center sm:px-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 font-serif text-4xl leading-[1.08] font-normal tracking-tight text-white italic drop-shadow-lg sm:text-6xl md:text-7xl lg:text-[82px]"
          >
            {t("experiencesPage.collection.heading")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto max-w-3xl font-sans text-base leading-relaxed font-light tracking-wide text-neutral-100 drop-shadow-md sm:text-xl md:text-2xl"
          >
            {t("experiencesPage.collection.body")}
          </motion.p>
        </div>

        <div className="relative z-10 pb-10" />
      </div>

      <ExperienceCollectionList />
      <HowItWorks />
      <WhereNextSection />
    </div>
  );
}
