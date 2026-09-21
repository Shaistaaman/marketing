import { useEffect, useRef } from "react";
import { VIDEO } from "../../lib/constants";

interface ExperienceVideoSectionProps {
  videoUrl?: string;
  posterImage?: string;
  title?: string;
  subtitle?: string;
}

/**
 * Full-bleed cinematic video band. Shared by the Experiences page and the
 * property/experience detail pages.
 */
export default function ExperienceVideoSection({
  videoUrl = VIDEO.homepageHero,
  posterImage = "/images/scenic-view.jpg",
  title,
  subtitle,
}: ExperienceVideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Autoplay can be rejected by browser policy — ignore and keep the poster.
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section className="relative w-full overflow-hidden border-t border-b border-neutral-900 bg-black">
      <div className="relative aspect-[16/9] max-h-[85vh] min-h-[300px] w-full sm:min-h-[450px]">
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterImage}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />

        {/* Cinematic gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        {/* Optional title overlay */}
        {(title || subtitle) && (
          <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end p-8 sm:p-12 lg:p-16">
            <div className="max-w-3xl space-y-2">
              {subtitle && (
                <span className="block font-sans text-xs tracking-[0.3em] text-neutral-300 uppercase drop-shadow-md sm:text-sm">
                  {subtitle}
                </span>
              )}
              {title && (
                <h3 className="font-serif text-2xl font-normal text-white italic drop-shadow-lg sm:text-4xl lg:text-5xl">
                  {title}
                </h3>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
