import { useEffect, useRef } from "react";
import { VIDEO } from "../../../lib/constants";
import { IMG } from "../../../data/imageMap";

interface OwnerVideoProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  videoUrl?: string;
  posterImage?: string;
  onApplyNow?: () => void;
}

export default function OwnerVideo({
  title = "Unlock Your Property's Full Potential",
  subtitle = "We Don't Just Manage Properties — We Re-Imagine Them",
  description = "Through a blend of creativity, craftsmanship, and strategy, we elevate every home into a high-performing, high-appeal destination.",
  buttonText = "APPLY NOW",
  videoUrl = VIDEO.homepageHero,
  posterImage = IMG.curatedInterior,
  onApplyNow,
}: OwnerVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Autoplay may be blocked by browser policy — keep the poster in that case.
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section className="w-full bg-white py-16 font-sans text-neutral-900 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8 lg:px-12">
        {/* HEADER */}
        <div className="mx-auto mb-12 max-w-4xl text-center sm:mb-16">
          <h2 className="mb-6 font-serif text-3xl leading-[1.15] font-normal tracking-tight text-neutral-900 italic sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="font-sans text-lg font-normal tracking-tight text-neutral-900 sm:text-2xl">
            {subtitle}
          </p>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* LEFT: description + CTA */}
          <div className="flex flex-col justify-between space-y-8 pr-0 lg:col-span-5 lg:pr-4">
            <p className="font-sans text-lg leading-relaxed font-light tracking-tight text-neutral-800 sm:text-xl">
              {description}
            </p>

            <div>
              <button
                type="button"
                onClick={onApplyNow}
                className="w-full min-w-[240px] cursor-pointer rounded-none bg-black px-12 py-4.5 text-center font-sans text-sm font-medium tracking-[0.2em] text-white uppercase transition-all duration-300 hover:bg-neutral-800 sm:w-auto"
              >
                {buttonText}
              </button>
            </div>
          </div>

          {/* RIGHT: looping muted video */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 shadow-sm sm:aspect-[16/10] lg:col-span-7">
            <video
              ref={videoRef}
              src={videoUrl}
              poster={posterImage}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
