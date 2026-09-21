import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ElegantArrow from "../../../components/common/ElegantArrow";
import { ROUTES } from "../../../lib/constants";

interface ExperienceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "rome-golf-cart",
    title: "Roman Golf Cart Tour",
    description:
      "Explore the ancient streets, hidden piazzas, and majestic monuments of Rome from the comfort of a luxurious private golf cart with a local guide.",
    image: "/images/somuch/rome.png",
  },
  {
    id: "florence-bike",
    title: "Florentine Hills Bike Ride",
    description:
      "Ride through scenic hills, cypress-lined paths, and olive groves overlooking the renaissance skyline of Florence, culminating in a local wine tasting.",
    image: "/images/somuch/great.png",
  },
  {
    id: "pompeii-culinary",
    title: "Pompeii & Naples: A Culinary Journey",
    description:
      "Step back in time at ancient Pompeii, then plunge into Naples for an authentic Neapolitan pizza and street food odyssey with a private historian-chef.",
    image: "/images/somuch/go.png",
  },
  {
    id: "lake-como-boat",
    title: "Lake Como Boat Excursion",
    description:
      "Glide across the deep blue waters of Lake Como on an elegant classic wooden boat, viewing historic lakeside villas, gardens, and Alpine peaks.",
    image: "/images/somuch/rome.png",
  },
  {
    id: "tuscan-dining",
    title: "Tuscan Vineyard & Dining",
    description:
      "An intimate dinner set amidst historic Chianti vineyards, featuring an exquisite multi-course meal prepared by a private chef, paired with vintage Tuscan wines.",
    image: "/images/somuch/great.png",
  },
  {
    id: "milan-wellness",
    title: "Milanese Palazzo Wellness Experience",
    description:
      "Unwind with a private custom spa ritual in a historic, beautifully restored Milanese palazzo, combining classic bathing traditions with modern therapies.",
    image: "/images/somuch/go.png",
  },
];

export default function Experience() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    };

    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    checkScroll();

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const { clientWidth } = scrollContainerRef.current;
    const scrollAmount =
      direction === "left" ? -clientWidth * 0.6 : clientWidth * 0.6;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="experiences-section"
      className="w-full overflow-hidden bg-white px-6 py-16 text-neutral-900 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1240px]">
        {/* Section Header */}
        <div className="mb-12 pb-8 text-center md:mb-16">
          <h2 className="font-serif text-3xl leading-tight font-normal text-neutral-900 italic sm:text-4xl md:text-[52px]">
            Skylife Experiences
          </h2>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column — static details and CTA */}
          <div className="flex h-full flex-col justify-between space-y-8 pr-0 lg:col-span-4 lg:pr-6">
            <div className="space-y-6">
              <span className="block font-sans text-[11px] font-semibold tracking-[0.2em] text-neutral-400 uppercase">
                Individual Experiences
              </span>

              <h3 className="font-serif text-2xl leading-[1.2] font-normal text-neutral-900 sm:text-3xl md:text-[40px]">
                The moments <span className="italic">we weave</span> into every
                journey
              </h3>

              <div className="space-y-4 font-sans text-sm leading-relaxed font-light text-neutral-600 sm:text-[15px]">
                <p>
                  Every great Italian stay is made up of smaller, perfect things
                  — a market at dawn, a chef at your table, a boat with nowhere
                  to be.
                </p>
                <p>
                  These are the individual experiences we layer into your
                  package to craft something that feels entirely, unmistakably
                  yours.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigate(ROUTES.experienceCollection)}
                className="inline-block cursor-pointer border border-neutral-900 px-8 py-4 font-sans text-xs font-medium tracking-[0.22em] text-neutral-900 uppercase transition-all duration-300 hover:bg-neutral-50"
              >
                View Experiences
              </button>
            </div>
          </div>

          {/* Right Column — horizontally scrolling experiences */}
          <div className="flex w-full flex-col lg:col-span-8">
            <div className="mb-6 flex items-center justify-end">
              <div className="flex items-center gap-4">
                <ElegantArrow
                  direction="left"
                  onClick={() => handleScroll("left")}
                  disabled={!canScrollLeft}
                  className="scale-90 md:scale-100"
                />
                <ElegantArrow
                  direction="right"
                  onClick={() => handleScroll("right")}
                  disabled={!canScrollRight}
                  className="scale-90 md:scale-100"
                />
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth py-2 md:gap-8"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {EXPERIENCES.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10px" }}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => navigate(ROUTES.experienceDetail(exp.id))}
                  className="group w-[280px] shrink-0 cursor-pointer snap-start select-none sm:w-[320px] md:w-[350px]"
                >
                  {/* Image with hover zoom */}
                  <div className="relative mb-4 aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-neutral-900/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Title & description */}
                  <div className="space-y-2 pr-2">
                    <h4 className="truncate font-serif text-lg font-normal tracking-wide text-neutral-900 transition-colors duration-300 group-hover:text-neutral-700 sm:text-xl">
                      {exp.title}
                    </h4>
                    <p className="line-clamp-3 font-sans text-xs leading-relaxed font-light text-neutral-500 sm:text-sm">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
