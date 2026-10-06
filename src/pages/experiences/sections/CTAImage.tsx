import { useTranslation } from "react-i18next";

interface CTAImageProps {
  onCraftJourney?: () => void;
  onJourneyDetail?: () => void;
  leftImageUrl?: string;
  rightImageUrl?: string;
}

export default function CTAImage({
  onCraftJourney,
  onJourneyDetail,
  leftImageUrl = "/images/people2.jpg",
  rightImageUrl = "/images/people3.jpg",
}: CTAImageProps) {
  const { t } = useTranslation();

  return (
    <div className="grid min-h-[550px] w-full grid-cols-1 sm:min-h-[620px] md:grid-cols-12">
      {/* LEFT IMAGE */}
      <div className="relative h-64 overflow-hidden md:col-span-3 md:h-auto lg:col-span-3">
        <img
          src={leftImageUrl}
          alt="Roman Colosseum Street View"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>

      {/* CENTER CONTENT */}
      <div className="z-10 flex flex-col items-center justify-center space-y-6 bg-white px-6 py-12 text-center sm:space-y-8 sm:px-10 sm:py-16 md:col-span-6 md:px-12 md:py-20 lg:col-span-6">
        <span className="font-sans text-xs font-medium tracking-[0.25em] text-neutral-800 uppercase sm:text-sm">
          {t("experiencesPage.ctaImage.eyebrow")}
        </span>

        <h2 className="font-serif text-4xl font-normal tracking-tight text-neutral-900 italic sm:text-5xl md:text-6xl">
          {t("experiencesPage.ctaImage.heading")}
        </h2>

        <p className="max-w-md font-sans text-lg leading-snug font-medium text-neutral-900 sm:text-xl md:text-2xl">
          {t("experiencesPage.ctaImage.subtitleLine1")}
          <br />
          {t("experiencesPage.ctaImage.subtitleLine2")}
        </p>

        <div className="flex w-full max-w-xs flex-col items-center justify-center gap-4 pt-2 sm:max-w-md sm:flex-row">
          <button
            type="button"
            onClick={onCraftJourney}
            className="w-full cursor-pointer rounded-none bg-black px-8 py-4 font-sans text-xs font-medium tracking-[0.18em] whitespace-nowrap text-white uppercase transition-all duration-300 hover:bg-neutral-800 sm:w-auto sm:text-sm"
          >
            {t("experiencesPage.ctaImage.craftJourney")}
          </button>

          <button
            type="button"
            onClick={onJourneyDetail}
            className="w-full cursor-pointer rounded-none border border-black bg-white px-8 py-4 font-sans text-xs font-medium tracking-[0.18em] whitespace-nowrap text-black uppercase transition-all duration-300 hover:bg-black hover:text-white sm:w-auto sm:text-sm"
          >
            {t("experiencesPage.ctaImage.skylifeIdeas")}
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative h-64 overflow-hidden md:col-span-3 md:h-auto lg:col-span-3">
        <img
          src={rightImageUrl}
          alt="Arch of Constantine Monument"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
}
