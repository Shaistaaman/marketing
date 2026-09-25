import {
  BarChart3,
  ConciergeBell,
  Globe,
  HeartHandshake,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useTranslation } from "react-i18next";

interface SuccessFactor {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  factorKey: string;
}

const FACTORS: SuccessFactor[] = [
  { id: 1, icon: TrendingUp, factorKey: "revenue" },
  { id: 2, icon: ConciergeBell, factorKey: "endToEnd" },
  { id: 3, icon: Globe, factorKey: "exposure" },
  { id: 4, icon: ShieldCheck, factorKey: "quality" },
  { id: 5, icon: BarChart3, factorKey: "reporting" },
  { id: 6, icon: HeartHandshake, factorKey: "support" },
];

export default function ProvenSuccess() {
  const { t } = useTranslation();

  return (
    <section
      id="proven-success-section"
      className="relative flex min-h-[680px] w-full flex-col items-center justify-center overflow-hidden px-6 py-20 text-white md:px-12 md:py-28"
    >
      {/* Panoramic background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/scenic-view.jpg"
          alt="Proven Recipe for Success Background"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-neutral-950/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-transparent to-neutral-950/70" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center font-serif text-3xl font-normal tracking-wide text-white italic sm:text-4xl md:mb-20 md:text-[46px]"
        >
          {t("landing.provenSuccess.heading")}
        </motion.h2>

        {/* 3x2 grid on desktop */}
        <div className="grid w-full grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          {FACTORS.map((factor, idx) => {
            const IconComponent = factor.icon;
            return (
              <motion.div
                key={factor.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col items-start text-left"
              >
                <div className="mb-5 text-white/90 transition-colors duration-300 group-hover:text-white">
                  <IconComponent className="h-8 w-8 stroke-[1.25]" />
                </div>

                <h3 className="mb-3 font-serif text-xl font-normal tracking-wide text-white md:text-2xl">
                  {t(`landing.provenSuccess.factors.${factor.factorKey}.title`)}
                </h3>

                <p className="font-sans text-sm leading-relaxed font-light tracking-wide text-white/80 md:text-[15px]">
                  {t(
                    `landing.provenSuccess.factors.${factor.factorKey}.description`,
                  )}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
