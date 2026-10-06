import { ArrowLeft, Clock, Sun, Tag, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { findPackageData } from "../../data/packages";
import { ROUTES } from "../../lib/constants";
import HowItWorks from "../collections/sections/HowItWorks";
import Testimonial from "../landing/sections/Testimonial";

/** The hero CTA scrolls here. */
const INQUIRY_SECTION_ID = "package-inquiry-section";

export default function PackageDetailPage() {
  const { t } = useTranslation();
  const { packageId } = useParams<{ packageId: string }>();
  const navigate = useNavigate();
  const pkg = useMemo(() => findPackageData(packageId), [packageId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [packageId]);

  const handleStartDreaming = () => {
    document
      .getElementById(INQUIRY_SECTION_ID)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const collage = pkg.galleryImages.slice(0, 6);

  const stats = [
    {
      Icon: Clock,
      label: t("packageDetail.stats.duration"),
      value: pkg.duration,
    },
    { Icon: Tag, label: t("packageDetail.stats.price"), value: pkg.basePrice },
    {
      Icon: Users,
      label: t("packageDetail.stats.guests"),
      value: pkg.guestCapacity,
    },
    {
      Icon: Sun,
      label: t("packageDetail.stats.season"),
      value: pkg.bestSeason,
    },
  ];

  return (
    <div className="relative min-h-screen bg-neutral-950 font-sans text-white selection:bg-amber-300 selection:text-black">
      {/* HERO */}
      <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={pkg.image}
            alt={pkg.name}
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full scale-105 object-cover object-center brightness-70 contrast-110 filter"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate(ROUTES.packages)}
          className="absolute top-6 left-6 z-30 flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 font-mono text-xs tracking-wider text-white/90 uppercase backdrop-blur-md transition-all duration-300 hover:bg-black/80 hover:text-white sm:top-8 sm:left-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t("packageDetail.backToPackages")}</span>
        </button>

        {/* Hero content */}
        <div className="relative z-10 mx-auto my-auto flex max-w-5xl flex-col items-center justify-center px-6 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 font-serif text-4xl leading-tight font-normal tracking-tight text-white italic drop-shadow-lg sm:text-6xl lg:text-7xl"
          >
            {pkg.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <button
              type="button"
              onClick={handleStartDreaming}
              className="cursor-pointer border border-white/80 bg-black/40 px-8 py-3.5 text-center font-sans text-xs font-medium tracking-[0.25em] text-white uppercase backdrop-blur-xs transition-all duration-300 hover:bg-white hover:text-black sm:px-12 sm:py-4 sm:text-sm"
            >
              {t("packageDetail.startDreaming")}
            </button>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10 w-full border-t border-neutral-800 bg-black/90 backdrop-blur-md">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 divide-y divide-neutral-800/80 md:grid-cols-4 md:divide-x md:divide-y-0">
            {stats.map(({ Icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center p-6 text-center"
              >
                <Icon className="mb-3 h-6 w-6 stroke-[1.2] text-white" />
                <span className="mb-1 font-sans text-sm font-semibold tracking-wide text-white sm:text-base">
                  {label}
                </span>
                <span className="text-xs font-light text-neutral-300">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AT A GLANCE */}
      <section
        id={INQUIRY_SECTION_ID}
        className="relative w-full bg-white px-6 py-20 text-neutral-900 sm:px-8 sm:py-28 lg:px-12"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
            <h2 className="mb-6 font-serif text-4xl font-normal text-neutral-900 italic sm:text-5xl lg:text-6xl">
              {t("packageDetail.atAGlance")}
            </h2>
            <p className="text-sm leading-relaxed font-light text-neutral-600 sm:text-base md:text-lg">
              {pkg.description}
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Highlights */}
            <div className="flex flex-col justify-center border border-neutral-200/60 bg-[#f5f5f5] p-8 shadow-xs sm:p-10 md:p-12 lg:col-span-5">
              <span className="mb-8 block font-sans text-xs font-bold tracking-[0.2em] text-neutral-900 uppercase sm:text-sm">
                {t("packageDetail.highlights")}
              </span>

              <ul className="space-y-6">
                {pkg.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#8c6d32]" />
                    <span className="text-sm leading-snug font-normal text-neutral-800 sm:text-base">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 6-image collage */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:col-span-7">
              {collage.map((imgUrl, idx) => (
                <div
                  key={`${imgUrl}-${idx}`}
                  className="relative aspect-[3/4] overflow-hidden rounded-xs bg-neutral-100 shadow-xs"
                >
                  <img
                    src={imgUrl}
                    alt={`${pkg.name} highlight ${idx + 1}`}
                    loading="eager"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="relative w-full bg-white px-6 py-20 text-neutral-900 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-normal text-neutral-900 italic sm:text-4xl md:text-5xl">
              {t("packageDetail.whatYouGet")}
            </h2>
            <div className="mx-auto mt-5 h-[2px] w-20 bg-neutral-800" />
          </div>

          <div className="space-y-12 sm:space-y-16">
            {pkg.inclusions.map((feature, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={feature.heading}
                  className="grid grid-cols-1 overflow-hidden border border-neutral-200/70 bg-white shadow-sm md:grid-cols-2"
                >
                  {/* Image — left on even, right on odd */}
                  <div
                    className={`relative h-64 overflow-hidden bg-neutral-100 sm:h-80 md:h-auto md:min-h-[320px] ${
                      isEven ? "order-1" : "order-1 md:order-2"
                    }`}
                  >
                    <img
                      src={feature.image}
                      alt={feature.heading}
                      loading="eager"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  {/* Text */}
                  <div
                    className={`flex flex-col justify-center bg-white p-8 sm:p-10 lg:p-14 ${
                      isEven ? "order-2" : "order-2 md:order-1"
                    }`}
                  >
                    <span className="mb-3 block font-sans text-[11px] font-semibold tracking-[0.22em] text-neutral-400 uppercase">
                      {feature.category}
                    </span>
                    <h3 className="mb-5 font-serif text-2xl leading-tight font-normal text-neutral-900 italic sm:text-3xl lg:text-4xl">
                      {feature.heading}
                    </h3>
                    <p className="text-xs leading-relaxed font-light text-neutral-600 sm:text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Testimonial />
      <HowItWorks />
    </div>
  );
}
