import { ArrowRight } from "lucide-react";

interface ExperienceCTAProps {
  onBookCall?: () => void;
}

export default function ExperienceCTA({ onBookCall }: ExperienceCTAProps) {
  return (
    <section className="border-t border-neutral-900 bg-black px-6 py-20 text-white sm:px-12 sm:py-28 lg:px-20">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-12 lg:flex-row lg:items-center lg:gap-16">
        {/* Left content */}
        <div className="max-w-2xl space-y-6 font-sans text-base leading-relaxed font-light text-neutral-200 sm:text-lg lg:text-xl">
          <p className="font-normal text-white">
            You know the kind of trip you want. You just need someone who knows
            how to make it happen.
          </p>

          <p className="text-neutral-300">
            We sit down with you, learn how you travel, and build the whole
            thing from scratch — every restaurant, every guide, every transfer,
            every surprise. Nothing generic, nothing off-the-shelf.
          </p>

          <p className="pt-2 text-sm text-neutral-400 sm:text-base">
            The best trips we've ever planned started with a single conversation.
          </p>
        </div>

        {/* CTA */}
        <div className="w-full flex-shrink-0 sm:w-auto">
          <button
            onClick={onBookCall}
            className="group inline-flex w-full cursor-pointer items-center justify-center gap-4 border border-white px-8 py-4 font-sans text-xs tracking-[0.25em] text-white uppercase transition-all duration-300 hover:bg-white hover:text-black sm:w-auto sm:text-sm"
          >
            <span>Book a call</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
