import { useTranslation } from "react-i18next";

interface CTAGetProProps {
  onAddProperty?: () => void;
}

/**
 * Black band with the Skylife monogram, an editorial paragraph and an
 * "ADD PROPERTY" call to action.
 */
export default function CTAGetPro({ onAddProperty }: CTAGetProProps) {
  const { t } = useTranslation();
  return (
    <section
      id="cta-get-pro-section"
      className="w-full border-t border-neutral-900 bg-black py-12 font-sans text-white md:py-16"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-8 px-6 sm:px-8 lg:flex-row lg:gap-12 lg:px-12">
        {/* Monogram */}
        <div className="flex shrink-0 items-center justify-center">
          <div className="relative flex h-[90px] w-[180px] items-center justify-center">
            <img
              src="/images/logo-beige.png"
              alt="Skylife"
              width={80}
              height={28}
              className="object-contain transition-opacity duration-300 hover:opacity-80"
            />
          </div>
        </div>

        {/* Editorial paragraph */}
        <div className="max-w-[680px] flex-1 text-center lg:text-left">
          <p className="font-sans text-sm leading-relaxed font-light tracking-normal text-neutral-300 sm:text-base">
            {t("collectionsPage.ctaGetPro")}
          </p>
        </div>

        {/* CTA */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={onAddProperty}
            className="cursor-pointer rounded-none border border-white bg-transparent px-8 py-3.5 font-sans text-xs font-medium tracking-[0.2em] whitespace-nowrap uppercase transition-colors duration-300 select-none hover:bg-white hover:text-black"
          >
            {t("collectionsPage.addProperty")}
          </button>
        </div>
      </div>
    </section>
  );
}
