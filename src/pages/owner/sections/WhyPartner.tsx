import { LampFloor, Luggage, UsersRound } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

const PANEL_BG = "/images/somuch/final.png";

const PANELS = [
  { id: "interior", pillarKey: "interiorRestyling" },
  { id: "hospitality", pillarKey: "fullManagement" },
  { id: "terrace", pillarKey: "verifiedGuests" },
];

export default function WhyPartner() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full overflow-hidden border-t border-b border-neutral-900 bg-neutral-950 py-20 font-sans text-white sm:py-28">
      {/* 3-panel atmospheric background */}
      <div className="absolute inset-0 z-0 grid grid-cols-1 opacity-40 contrast-110 filter md:grid-cols-3">
        {PANELS.map((panel) => (
          <div
            key={panel.id}
            className="relative h-full w-full overflow-hidden"
          >
            <img
              src={PANEL_BG}
              alt={t(`whyPartner.pillars.${panel.pillarKey}.title`)}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>

      {/* Overall vignette */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-8 lg:px-12">
        {/* TITLE */}
        <div className="mb-16 text-center sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl font-normal tracking-tight text-white italic sm:text-5xl lg:text-6xl"
          >
            {t("whyPartner.heading")}
          </motion.h2>
        </div>

        {/* PILLARS */}
        <div className="relative mx-auto max-w-4xl">
          {/* Top row: two pillars */}
          <div className="relative grid grid-cols-1 items-start gap-12 pb-12 md:grid-cols-2 md:gap-16 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center px-4 text-center"
            >
              <div className="mb-6 flex h-16 items-center justify-center text-white/90">
                <LampFloor className="h-10 w-10" />
              </div>

              <h3 className="mb-3 font-serif text-xl font-normal text-white italic sm:text-2xl">
                {t("whyPartner.pillars.interiorRestyling.title")}
              </h3>

              <p className="max-w-sm font-sans text-sm leading-relaxed font-light text-neutral-300 sm:text-base">
                {t("whyPartner.pillars.interiorRestyling.description")}
              </p>
            </motion.div>

            {/* Vertical divider (desktop) */}
            <div className="absolute top-0 bottom-16 left-1/2 hidden w-[1px] -translate-x-1/2 bg-white/30 md:block" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col items-center px-4 text-center"
            >
              <div className="mb-6 flex h-16 items-center justify-center text-white/90">
                <Luggage className="h-10 w-10" />
              </div>

              <h3 className="mb-3 font-serif text-xl font-normal text-white italic sm:text-2xl">
                {t("whyPartner.pillars.fullManagement.title")}
              </h3>

              <p className="max-w-sm font-sans text-sm leading-relaxed font-light text-neutral-300 sm:text-base">
                {t("whyPartner.pillars.fullManagement.description")}
              </p>
            </motion.div>
          </div>

          {/* Horizontal divider */}
          <div className="my-2 h-[1px] w-full bg-white/30" />

          {/* Bottom row: third pillar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto flex max-w-xl flex-col items-center px-4 pt-10 text-center"
          >
            <div className="mb-6 flex h-16 items-center justify-center text-white/90">
              <UsersRound className="h-10 w-10" />
            </div>

            <h3 className="mb-3 font-serif text-xl font-normal text-white italic sm:text-2xl">
              {t("whyPartner.pillars.verifiedGuests.title")}
            </h3>

            <p className="font-sans text-sm leading-relaxed font-light text-neutral-300 sm:text-base">
              {t("whyPartner.pillars.verifiedGuests.description")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
