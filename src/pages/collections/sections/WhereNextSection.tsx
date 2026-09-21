import { useEffect, useRef, useState } from "react";
import ElegantArrow from "../../../components/common/ElegantArrow";
import { VIDEO } from "../../../lib/constants";

interface VideoItem {
  id: string;
  poster: string;
  videoUrl: string;
}

const POSTER = "/images/somuch/rome.png";

// All six currently point at the same S3 asset; swap per-item when the
// real destination videos are uploaded.
const VIDEOS: VideoItem[] = [
  { id: "coastal-amalfi", poster: POSTER, videoUrl: VIDEO.homepageHero },
  { id: "curated-residence", poster: POSTER, videoUrl: VIDEO.homepageHero },
  { id: "night-waterfront", poster: POSTER, videoUrl: VIDEO.homepageHero },
  { id: "tuscan-hills", poster: POSTER, videoUrl: VIDEO.homepageHero },
  { id: "florence-skyline", poster: POSTER, videoUrl: VIDEO.homepageHero },
  { id: "lake-como", poster: POSTER, videoUrl: VIDEO.homepageHero },
];

function VideoCard({ item }: { item: VideoItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="video-card-item group relative aspect-[0.8] w-[82vw] flex-shrink-0 cursor-pointer snap-start overflow-hidden bg-neutral-900 transition-all duration-300 select-none hover:shadow-2xl sm:w-[320px] md:w-[350px] lg:w-[380px]"
    >
      <video
        ref={videoRef}
        src={item.videoUrl}
        poster={item.poster}
        loop
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
  );
}

export default function WhereNextSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollBounds = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollBounds();
    window.addEventListener("resize", checkScrollBounds);
    return () => window.removeEventListener("resize", checkScrollBounds);
  }, []);

  const scrollByCard = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const card = container.querySelector(".video-card-item");
    const cardWidth = card ? card.getBoundingClientRect().width : 380;
    const gap = 24; // matches gap-6
    const delta = cardWidth + gap;

    container.scrollBy({
      left: direction === "left" ? -delta : delta,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full overflow-hidden bg-white px-4 py-16 font-sans text-neutral-900 select-none sm:px-6 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-[1240px] text-center">
        {/* Title */}
        <h2 className="mb-3 font-serif text-3xl leading-tight font-normal tracking-tight text-neutral-900 italic sm:text-5xl md:text-6xl">
          Where will you go next?
        </h2>

        {/* Subtitle */}
        <p className="mb-12 font-sans text-base font-medium tracking-wide text-neutral-900 sm:mb-16 sm:text-lg md:text-xl">
          Discover, Live, Revel
        </p>

        {/* Horizontal video carousel */}
        <div className="relative w-full">
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollBounds}
            className="scrollbar-none flex snap-x snap-mandatory justify-start gap-6 overflow-x-auto scroll-smooth pb-4"
          >
            {VIDEOS.map((video) => (
              <VideoCard key={video.id} item={video} />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-center gap-8 sm:mt-16">
          <ElegantArrow
            direction="left"
            onClick={() => scrollByCard("left")}
            disabled={!canScrollLeft}
          />
          <ElegantArrow
            direction="right"
            onClick={() => scrollByCard("right")}
            disabled={!canScrollRight}
          />
        </div>
      </div>
    </section>
  );
}
