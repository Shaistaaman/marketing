import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface ManagementOption {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  intro: string;
  listHeading: string;
  items: { label: string; detail: string }[];
  idealFor: string;
}

const OPTIONS: ManagementOption[] = [
  {
    id: "full",
    badge: "Option 01",
    title: "Full Management",
    tagline: "We handle everything — from first click to final goodbye.",
    intro:
      "Designed for owners who want complete peace of mind. Skylife manages both the digital operation and the physical running of your property, so you can simply enjoy owning a home in Italy.",
    listHeading: "Everything in Digital, Plus",
    items: [
      {
        label: "Cleaning & laundry",
        detail: "coordinated to our standard before every guest arrival",
      },
      {
        label: "Check-in & check-out",
        detail: "professional, warm and handled on your behalf",
      },
      {
        label: "Quality checks",
        detail: "every arrival inspected before guests set foot in the door",
      },
      {
        label: "Maintenance & on-site support",
        detail: "issues handled quickly, before guests notice",
      },
      {
        label: "Property care & presentation",
        detail: "restyling, improvements and standards managed for you",
      },
    ],
    idealFor:
      '"I want my property looked after completely. I trust Skylife to take care of it as I would."',
  },
  {
    id: "digital",
    badge: "Option 02",
    title: "Digital Management",
    tagline:
      "You have the on-site operations under control. We coordinate operations and take care of everything digital.",
    intro:
      "Designed for owners who already have a trusted local team — cleaners, check-in staff, maintenance contacts — but want a professional to run the commercial and guest-facing side of the property.",
    listHeading: "What We Take Care Of",
    items: [
      {
        label: "Listings & channels",
        detail:
          "creation, optimisation and publication across all major booking platforms",
      },
      {
        label: "Pricing & revenue",
        detail: "dynamic pricing strategy to maximise income year-round",
      },
      {
        label: "Guest communication",
        detail: "enquiries, bookings, reviews and the full guest journey",
      },
      {
        label: "Concierge coordination",
        detail: "experiences, arrivals and special requests, handled seamlessly",
      },
      {
        label: "Team coordination",
        detail:
          "we align with your local contacts so nothing falls through the cracks",
      },
    ],
    idealFor:
      '"I have someone I trust at the property. I just need the online side done properly."',
  },
];

function OptionCard({ option }: { option: ManagementOption }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col justify-between border border-neutral-100 bg-neutral-50 p-8 transition-all duration-300 md:p-12">
      <div>
        <div className="mb-8">
          <span className="inline-block border border-neutral-900 px-3 py-1 font-sans text-[10px] font-medium tracking-[0.2em] text-neutral-900 uppercase">
            {option.badge}
          </span>
        </div>

        {/* Clickable header */}
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="group mb-4 flex w-full cursor-pointer items-center justify-between text-left focus:outline-none"
          aria-expanded={expanded}
        >
          <h3 className="font-serif text-2xl leading-tight font-normal tracking-wide text-neutral-900 transition-colors duration-300 group-hover:text-neutral-700 md:text-[38px]">
            {option.title}
          </h3>
          <motion.div
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-neutral-900 transition-transform duration-300 group-hover:translate-x-1"
          >
            <ArrowRight className="h-6 w-6 stroke-[1.25] md:h-8 md:w-8" />
          </motion.div>
        </button>

        <p className="mb-6 font-serif text-base leading-relaxed text-neutral-800 italic sm:text-lg">
          {option.tagline}
        </p>

        {/* Expanding detail drawer */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 space-y-8 border-t border-neutral-200 pt-6 text-neutral-700">
                <p className="font-sans text-sm leading-relaxed font-light sm:text-[15px]">
                  {option.intro}
                </p>

                <div className="space-y-4">
                  <h4 className="font-sans text-xs font-semibold tracking-[0.18em] text-neutral-900 uppercase">
                    {option.listHeading}
                  </h4>
                  <ul className="space-y-3.5 font-sans text-sm font-light text-neutral-600">
                    {option.items.map((item) => (
                      <li key={item.label} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                        <span>
                          <strong>{item.label}</strong> — {item.detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 pt-4">
                  <h4 className="font-sans text-xs font-semibold tracking-[0.18em] text-neutral-400 uppercase">
                    Ideal For
                  </h4>
                  <p className="font-serif text-base leading-relaxed text-neutral-800 italic sm:text-[17px]">
                    {option.idealFor}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function PORules() {
  return (
    <section
      id="po-rules-section"
      className="w-full overflow-hidden bg-white px-6 py-16 text-neutral-900 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-310">
        {/* Header grid */}
        <div className="mb-16 grid grid-cols-1 items-start gap-8 md:mb-20 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl leading-[1.4] font-normal tracking-tight text-neutral-900 sm:text-4xl md:text-[38px]">
              Own a <span className="italic">beautiful home</span> in Italy?{" "}
              <br className="hidden sm:inline" />
              <span className="italic">Let's make it</span> work for you
            </h2>
          </div>
          <div className="pt-2 font-sans text-sm leading-relaxed font-light text-neutral-600 sm:text-base">
            Whether it is a historic villa in Tuscany or a modern loft in Milan,
            Skylife manages Italian homes for owners who want more from their
            property, with exactly as much involvement as suits you.
          </div>
        </div>

        {/* Management options */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {OPTIONS.map((option) => (
            <OptionCard key={option.id} option={option} />
          ))}
        </div>

        {/* Bottom framed card */}
        <div className="grid grid-cols-1 items-center gap-8 border border-neutral-200 p-8 md:gap-12 md:p-12 lg:grid-cols-12 lg:p-16">
          <div className="space-y-4 lg:col-span-6">
            <span className="block font-sans text-[11px] font-semibold tracking-[0.2em] text-neutral-400 uppercase">
              Thinking of Buying?
            </span>
            <h3 className="font-serif text-2xl leading-tight font-normal text-neutral-900 sm:text-3xl md:text-4xl">
              We don't sell properties <br className="hidden sm:inline" />
              but{" "}
              <span className="font-normal italic">
                we know the people who do.
              </span>
            </h3>
            <p className="max-w-[480px] font-sans text-sm leading-relaxed font-light text-neutral-600">
              If you're exploring the idea of owning a home in Italy, we're happy
              to share what we know and connect you with trusted partners who can
              help you find the right opportunity.
            </p>
          </div>

          <div className="flex flex-col items-start justify-center space-y-6 text-left lg:col-span-6">
            <p className="w-full max-w-none font-serif text-2xl leading-relaxed text-neutral-900 italic sm:text-[28px] md:text-3xl">
              "We'd love to hear about your property — and what you'd like it to
              become."
            </p>

            <div className="flex w-full flex-wrap justify-end gap-4">
              <a
                href="#contact"
                className="bg-neutral-900 px-8 py-4 font-sans text-xs font-medium tracking-[0.22em] text-white uppercase transition-all duration-300 hover:bg-neutral-800"
              >
                Let's Have a Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
