import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import ElegantArrow from "../../../components/common/ElegantArrow";

interface TestimonialData {
  id: string;
  name: string;
  role: string;
  text: string;
  image: string;
}

const GUEST_QUOTE = `"From the moment we booked, Skylife made our stay effortless. The apartment was beautiful and exactly as described, and the team was always available whenever we needed anything. They also helped us organise restaurants, transfers and experiences around Rome, which made the whole trip feel incredibly easy and personal. We would absolutely book with Skylife again."`;

const TESTIMONIALS: TestimonialData[] = [
  {
    id: "1",
    name: "Guest",
    role: "Guest",
    text: GUEST_QUOTE,
    image: "/images/guest.png",
  },
  {
    id: "2",
    name: "Guest",
    role: "Guest",
    text: GUEST_QUOTE,
    image: "/images/guest.png",
  },
  {
    id: "3",
    name: "Guest",
    role: "Guest",
    text: GUEST_QUOTE,
    image: "/images/guest.png",
  },
];

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1,
    );
  };

  const activeTestimonial = TESTIMONIALS[activeIndex];

  return (
    <section
      id="testimonials-guests-owners-section"
      className="flex w-full flex-col items-center bg-white px-6 py-16 text-neutral-900 md:px-12 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-[800px] flex-col items-center text-center">
        {/* Editorial section title */}
        <div className="mb-6 flex flex-col items-center justify-center">
          <h2 className="font-serif text-3xl leading-tight font-normal tracking-wide text-neutral-900 italic sm:text-4xl md:text-[44px]">
            WHAT OUR GUESTS
          </h2>
          <span className="my-2 block font-serif text-3xl text-neutral-400 italic sm:text-4xl">
            &amp;
          </span>
          <h2 className="font-serif text-3xl leading-tight font-normal tracking-wide text-neutral-900 italic sm:text-4xl md:text-[44px]">
            OWNERS SAY
          </h2>
        </div>

        {/* Subtitle */}
        <p className="mb-12 font-sans text-base font-light tracking-wide text-neutral-800 sm:mb-16 sm:text-lg md:text-[19px]">
          Real experiences - from the people who stay with us to the owners who
          trust us with their homes.
        </p>

        {/* Animated quote */}
        <div className="relative mb-10 flex min-h-[220px] w-full flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {activeTestimonial && (
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex w-full flex-col items-center"
              >
                <p className="mb-8 max-w-[680px] font-sans text-sm leading-[1.75] font-light tracking-wide text-neutral-600 select-none sm:text-base">
                  {activeTestimonial.text}
                </p>

                <p className="font-sans text-sm tracking-wider text-neutral-800 md:text-[15px]">
                  <span className="font-bold text-neutral-900">
                    {activeTestimonial.name}
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Avatar selector row */}
        <div className="mb-8 flex items-center justify-center gap-4">
          {TESTIMONIALS.map((testimonial, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={testimonial.id}
                onClick={() => setActiveIndex(idx)}
                className={`relative h-12 w-12 overflow-hidden rounded-full transition-all duration-300 focus:outline-none md:h-14 md:w-14 ${
                  isActive
                    ? "scale-105 ring-2 ring-neutral-900 ring-offset-2"
                    : "opacity-50 hover:opacity-100"
                }`}
                aria-label={`Show testimonial from ${testimonial.name}`}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover select-none"
                />
              </button>
            );
          })}
        </div>

        {/* Carousel controls */}
        <div className="flex items-center justify-center gap-8 pt-2">
          <ElegantArrow
            direction="left"
            onClick={handlePrev}
            className="scale-90"
          />
          <ElegantArrow
            direction="right"
            onClick={handleNext}
            className="scale-90"
          />
        </div>
      </div>
    </section>
  );
}
