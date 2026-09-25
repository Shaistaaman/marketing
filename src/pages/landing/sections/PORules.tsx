import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ManagementOption {
  id: string;
  optionKey: string;
  itemKeys: string[];
}

const OPTIONS: ManagementOption[] = [
  {
    id: "full",
    optionKey: "full",
    itemKeys: [
      "cleaning",
      "checkInOut",
      "qualityChecks",
      "maintenance",
      "presentation",
    ],
  },
  {
    id: "digital",
    optionKey: "digital",
    itemKeys: ["listings", "pricing", "communication", "concierge", "team"],
  },
];

function OptionCard({ option }: { option: ManagementOption }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const base = `landing.poRules.options.${option.optionKey}`;

  return (
    <div className="flex flex-col justify-between border border-neutral-100 bg-neutral-50 p-8 transition-all duration-300 md:p-12">
      <div>
        <div className="mb-8">
          <span className="inline-block border border-neutral-900 px-3 py-1 font-sans text-[10px] font-medium tracking-[0.2em] text-neutral-900 uppercase">
            {t(`${base}.badge`)}
          </span>
        </div>

        {/* Clickable header */}
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="group mb-4 flex w-full cursor-pointer items-center justify-between text-left focus:outline-none"
          aria-expanded={expanded}
        >
          <h3 className="font-serif text-2xl leading-tight font-normal tracking-wide text-neutral-900 transition-colors duration-300 group-hover:text-neutral-700 md:text-[38px]">
            {t(`${base}.title`)}
          </h3>
          <motion.div
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-neutral-900 transition-transform duration-300 group-hover:translate-x-1"
          >
            <ArrowRight className="h-6 w-6 stroke-[1.25] md:h-8 md:w-8" />
          </motion.div>
        </button>

        <p className="mb-6 font-serif text-base leading-relaxed text-neutral-800 italic sm:text-lg">
          {t(`${base}.tagline`)}
        </p>

        {/* Expanding detail drawer */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 space-y-8 border-t border-neutral-200 pt-6 text-neutral-700">
                <p className="font-sans text-sm leading-relaxed font-light sm:text-[15px]">
                  {t(`${base}.intro`)}
                </p>

                <div className="space-y-4">
                  <h4 className="font-sans text-xs font-semibold tracking-[0.18em] text-neutral-900 uppercase">
                    {t(`${base}.listHeading`)}
                  </h4>
                  <ul className="space-y-3.5 font-sans text-sm font-light text-neutral-600">
                    {option.itemKeys.map((itemKey) => (
                      <li key={itemKey} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                        <span>
                          <strong>{t(`${base}.items.${itemKey}.label`)}</strong>{" "}
                          — {t(`${base}.items.${itemKey}.detail`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 pt-4">
                  <h4 className="font-sans text-xs font-semibold tracking-[0.18em] text-neutral-400 uppercase">
                    {t("landing.poRules.idealForLabel")}
                  </h4>
                  <p className="font-serif text-base leading-relaxed text-neutral-800 italic sm:text-[17px]">
                    {t(`${base}.idealFor`)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function PORules() {
  const { t } = useTranslation();

  return (
    <section
      id="po-rules-section"
      className="w-full overflow-hidden bg-white px-6 py-16 text-neutral-900 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-310">
        {/* Header grid */}
        <div className="mb-16 grid grid-cols-1 items-start gap-8 md:mb-20 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl leading-[1.4] font-normal tracking-tight text-neutral-900 sm:text-4xl md:text-[38px]">
              {t("landing.poRules.headingPrefix")}{" "}
              <span className="italic">
                {t("landing.poRules.headingEmphasis1")}
              </span>{" "}
              {t("landing.poRules.headingMiddle")}{" "}
              <br className="hidden sm:inline" />
              <span className="italic">
                {t("landing.poRules.headingEmphasis2")}
              </span>{" "}
              {t("landing.poRules.headingSuffix")}
            </h2>
          </div>
          <div className="pt-2 font-sans text-sm leading-relaxed font-light text-neutral-600 sm:text-base">
            {t("landing.poRules.intro")}
          </div>
        </div>

        {/* Management options */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {OPTIONS.map((option) => (
            <OptionCard key={option.id} option={option} />
          ))}
        </div>

        {/* Bottom framed card */}
        <div className="grid grid-cols-1 items-center gap-8 border border-neutral-200 p-8 md:gap-12 md:p-12 lg:grid-cols-12 lg:p-16">
          <div className="space-y-4 lg:col-span-6">
            <span className="block font-sans text-[11px] font-semibold tracking-[0.2em] text-neutral-400 uppercase">
              {t("landing.poRules.thinkingOfBuying")}
            </span>
            <h3 className="font-serif text-2xl leading-tight font-normal text-neutral-900 sm:text-3xl md:text-4xl">
              {t("landing.poRules.dontSellHeading1")}{" "}
              <br className="hidden sm:inline" />
              but{" "}
              <span className="font-normal italic">
                {t("landing.poRules.dontSellHeading2")}
              </span>
            </h3>
            <p className="max-w-[480px] font-sans text-sm leading-relaxed font-light text-neutral-600">
              {t("landing.poRules.dontSellBody")}
            </p>
          </div>

          <div className="flex flex-col items-start justify-center space-y-6 text-left lg:col-span-6">
            <p className="w-full max-w-none font-serif text-2xl leading-relaxed text-neutral-900 italic sm:text-[28px] md:text-3xl">
              {t("landing.poRules.quote")}
            </p>

            <div className="flex w-full flex-wrap justify-end gap-4">
              <a
                href="#contact"
                className="bg-neutral-900 px-8 py-4 font-sans text-xs font-medium tracking-[0.22em] text-white uppercase transition-all duration-300 hover:bg-neutral-800"
              >
                {t("landing.poRules.letsChat")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
