import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ExperienceCTAProps {
  onBookCall?: () => void;
}

export default function ExperienceCTA({ onBookCall }: ExperienceCTAProps) {
  const { t } = useTranslation();

  return (
    <section className="border-t border-neutral-900 bg-black px-6 py-20 text-white sm:px-12 sm:py-28 lg:px-20">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-12 lg:flex-row lg:items-center lg:gap-16">
        {/* Left content */}
        <div className="max-w-2xl space-y-6 font-sans text-base leading-relaxed font-light text-neutral-200 sm:text-lg lg:text-xl">
          <p className="font-normal text-white">
            {t("experiencesPage.cta.body1")}
          </p>

          <p className="text-neutral-300">{t("experiencesPage.cta.body2")}</p>

          <p className="pt-2 text-sm text-neutral-400 sm:text-base">
            {t("experiencesPage.cta.body3")}
          </p>
        </div>

        {/* CTA */}
        <div className="w-full flex-shrink-0 sm:w-auto">
          <button
            onClick={onBookCall}
            className="group inline-flex w-full cursor-pointer items-center justify-center gap-4 border border-white px-8 py-4 font-sans text-xs tracking-[0.25em] text-white uppercase transition-all duration-300 hover:bg-white hover:text-black sm:w-auto sm:text-sm"
          >
            <span>{t("experiencesPage.cta.bookACall")}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
