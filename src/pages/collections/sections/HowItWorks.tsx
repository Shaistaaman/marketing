import { FileText, Map, Plane } from "lucide-react";
import type React from "react";

interface StepItem {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const STEPS: StepItem[] = [
  {
    step: 1,
    icon: <FileText className="h-6 w-6 text-neutral-900" strokeWidth={1.5} />,
    title: "Share Your Vision",
    description:
      "Complete the Skylife form and tell us what inspires you — your travel style, dreams, and the moments you wish to live in Italy.",
  },
  {
    step: 2,
    icon: <Plane className="h-6 w-6 text-neutral-900" strokeWidth={1.5} />,
    title: "Discover Your Tailored Itinerary",
    description:
      "Our team crafts your personalized Skylife Travel Plan: a curated itinerary designed exclusively around your preferences, blending experiences, stays, and hidden gems.",
  },
  {
    step: 3,
    icon: <Map className="h-6 w-6 text-neutral-900" strokeWidth={1.5} />,
    title: "Begin Your Skylife Journey",
    description:
      "Refine every detail until it feels perfect. We handle all arrangements — from bookings to logistics — so you can simply arrive and enjoy your unforgettable Italian escape.",
  },
];

export default function HowItWorks() {
  const handleStartJourney = () => {
    const searchSection =
      document.getElementById("search-widget-container") ??
      document.getElementById("property-search-section");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      id="how-it-works-section"
      className="relative w-full overflow-hidden bg-black px-4 py-20 font-sans text-white select-none sm:px-6 md:py-28 lg:px-12"
    >
      <div className="mx-auto max-w-[1240px] text-center">
        {/* Title */}
        <h2 className="mb-4 font-serif text-3xl leading-tight font-normal tracking-tight text-white italic sm:text-4xl md:text-[52px] lg:text-[56px]">
          Enter The Skylife World
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mb-16 max-w-2xl font-sans text-base font-normal tracking-wide text-neutral-200 sm:text-lg md:mb-20 md:text-[19px]">
          Don't Know Where To Begin? Start Your Skylife Journey Here
        </p>

        {/* Steps + connecting arcs */}
        <div className="relative mx-auto mb-16 max-w-5xl md:mb-20">
          {/* Desktop curved dashed connectors */}
          <div className="pointer-events-none absolute top-[18px] right-[16%] left-[16%] z-0 hidden lg:block">
            {/* Arc 1: step 1 → 2 (arches upward) */}
            <svg
              className="absolute top-[-10px] left-[4%] h-[60px] w-[42%] overflow-visible text-white/60"
              viewBox="0 0 200 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 10,42 Q 100,8 190,46"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
              />
              <path
                d="M 181,39 L 191,47 L 182,51"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Arc 2: step 2 → 3 (dips downward) */}
            <svg
              className="absolute top-[12px] right-[4%] h-[60px] w-[42%] overflow-visible text-white/60"
              viewBox="0 0 200 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 10,15 Q 100,55 190,20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
              />
              <path
                d="M 181,14 L 191,19 L 185,27"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Step cards */}
          <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-10">
            {STEPS.map((item) => (
              <div
                key={item.step}
                className="mx-auto flex max-w-sm flex-col items-center text-center lg:max-w-none"
              >
                {/* Icon badge */}
                <div className="mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-300 hover:scale-105 sm:h-18 sm:w-18">
                  {item.icon}
                </div>

                {/* Step indicator */}
                <span className="mb-3 font-sans text-sm font-semibold tracking-widest text-white uppercase sm:text-base">
                  Step {item.step}
                </span>

                {/* Title */}
                <h3 className="mb-4 flex min-h-[52px] items-center justify-center font-sans text-lg leading-snug font-semibold text-white sm:text-xl md:text-[21px]">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="max-w-xs font-sans text-xs leading-relaxed font-light text-neutral-300 sm:max-w-sm sm:text-sm md:text-[14.5px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <button
            onClick={handleStartJourney}
            className="cursor-pointer rounded-none border border-white bg-white px-8 py-4 font-sans text-xs font-medium tracking-[0.18em] text-black uppercase shadow-md transition-all duration-300 hover:bg-neutral-100 hover:text-black hover:shadow-xl active:scale-95 sm:px-10 sm:text-sm"
          >
            Start Your Skylife Journey
          </button>
        </div>
      </div>
    </section>
  );
}
