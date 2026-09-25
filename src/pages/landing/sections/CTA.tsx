import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function CTA() {
  const { t } = useTranslation();

  return (
    <section
      id="partner-cta-section"
      className="w-full overflow-hidden border-t border-neutral-100 bg-white"
    >
      <div className="group relative h-[450px] w-full overflow-hidden md:h-[520px]">
        {/* Panoramic background with hover scale */}
        <img
          src="/images/cta.jpg"
          alt="Own a Property in Italy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.03]"
        />

        {/* Overlays for legibility */}
        <div className="absolute inset-0 bg-neutral-950/45 transition-colors duration-500 group-hover:bg-neutral-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/30 via-transparent to-neutral-950/10" />

        {/* Centred content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center md:px-12">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 font-sans text-sm font-medium tracking-[0.2em] text-white uppercase md:text-[15px]"
          >
            {t("landing.cta.eyebrow")}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 font-serif text-3xl leading-tight font-normal tracking-wide text-white sm:text-4xl md:text-5xl lg:text-[56px]"
          >
            {t("landing.cta.heading")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-8 max-w-[520px] font-sans text-sm leading-relaxed font-light tracking-wide text-white/90 sm:text-base"
          >
            {t("landing.cta.body")}
          </motion.p>

          {/* Calligraphic line button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="flex cursor-pointer items-center justify-center gap-3.5 rounded-none border border-white/80 bg-transparent px-8 py-3.5 font-sans text-xs font-medium tracking-[0.25em] text-white uppercase transition-all duration-300 select-none hover:border-white hover:bg-white hover:text-neutral-950 sm:text-[13px]">
              <span>{t("landing.cta.findOutMore")}</span>
              <svg
                viewBox="0 0 40 12"
                className="h-3 w-8 transition-transform duration-300 group-hover:translate-x-1.5"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0,6 L38,6" strokeWidth="1.2" strokeLinecap="round" />
                <path
                  d="M32,2 C34,4 36,5.5 38,6 C36,6.5 34,8 32,10"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
