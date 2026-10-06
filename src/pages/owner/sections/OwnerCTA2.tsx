import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

const BG_NIGHT_WATERFRONT = "/images/bgowner.jpg";

interface OwnerCTA2Props {
  onJoinToday?: () => void;
}

export default function OwnerCTA2({ onJoinToday }: OwnerCTA2Props) {
  const { t } = useTranslation();

  return (
    <section className="relative w-full overflow-hidden bg-neutral-950 py-24 font-sans text-white sm:py-32 lg:py-36">
      {/* Night waterfront background */}
      <div className="absolute inset-0 z-0">
        <img
          src={BG_NIGHT_WATERFRONT}
          alt="Illuminated Italian waterfront at night"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full scale-105 object-cover object-center brightness-70 contrast-110 filter"
        />
        {/* Warm golden night gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-amber-950/30 to-black/85" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-4 font-serif text-3xl leading-tight font-normal tracking-wide text-white sm:text-4xl md:text-5xl lg:text-[56px]"
        >
          {t("ownerCta2.heading")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto mb-8 max-w-[520px] font-sans text-sm leading-relaxed font-light tracking-wide text-white/90 sm:text-base"
        >
          {t("ownerCta2.body")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <button
            type="button"
            onClick={onJoinToday}
            className="inline-block cursor-pointer rounded-none border border-white bg-black/40 px-10 py-4 text-center font-sans text-xs font-medium tracking-[0.25em] uppercase backdrop-blur-xs transition-all duration-300 hover:bg-white hover:text-black sm:px-14 sm:py-4.5 sm:text-sm"
          >
            {t("ownerCta2.joinToday")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
