import {
  ChartNoAxesCombined,
  FileText,
  Handshake,
  ReceiptEuro,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

interface OwnerWorksProps {
  onStartJourney?: () => void;
}

const STEPS = [
  {
    number: "Step 1",
    stepKey: "application",
    icon: FileText,
  },
  {
    number: "Step 2",
    stepKey: "evaluation",
    icon: ChartNoAxesCombined,
  },
  {
    number: "Step 3",
    stepKey: "onboarding",
    icon: Handshake,
  },
  {
    number: "Step 4",
    stepKey: "results",
    icon: ReceiptEuro,
  },
];

export default function OwnerWorks({ onStartJourney }: OwnerWorksProps) {
  const { t } = useTranslation();

  return (
    <section className="relative w-full overflow-hidden bg-black py-24 font-sans text-white sm:py-32">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8 lg:px-12">
        {/* HEADER */}
        <div className="mb-20 text-center sm:mb-28">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl font-normal tracking-tight text-white italic sm:text-5xl lg:text-6xl"
          >
            {t("ownerWorks.heading")}
          </motion.h2>
        </div>

        {/* STEPS */}
        <div className="relative mx-auto mb-20 max-w-5xl sm:mb-24">
          <div className="relative z-10 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="group flex flex-col items-center px-2 text-center"
                >
                  {/* Circular icon */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-xl transition-transform duration-300 group-hover:scale-105 sm:h-20 sm:w-20">
                    <Icon className="h-7 w-7 stroke-[1.6] sm:h-8 sm:w-8" />
                  </div>

                  <span className="mb-1 font-sans text-sm font-medium tracking-tight text-neutral-200">
                    {step.number}
                  </span>

                  <h3 className="mb-3 font-sans text-base font-semibold text-white sm:text-lg">
                    {t(`ownerWorks.steps.${step.stepKey}.title`)}
                  </h3>

                  <p className="max-w-[220px] font-sans text-xs leading-relaxed font-light text-neutral-300 sm:text-sm">
                    {t(`ownerWorks.steps.${step.stepKey}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="pt-6 text-center">
          <motion.button
            type="button"
            onClick={onStartJourney}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-block cursor-pointer rounded-none border border-white bg-transparent px-10 py-4 text-center font-sans text-xs font-medium tracking-[0.25em] uppercase transition-all duration-300 hover:bg-white hover:text-black sm:px-14 sm:py-5 sm:text-sm"
          >
            {t("ownerWorks.cta")}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
