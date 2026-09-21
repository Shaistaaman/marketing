import { motion } from "motion/react";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "PIETRO TOTI",
    role: "COO & CO-FOUNDER",
    description:
      "Drives operations and strategy to elevate service, performance, and brand value.",
    image: "/images/team/pietro.jpg",
  },
  {
    name: "TANCREDI DE SANCTIS",
    role: "CEO & CO-FOUNDER",
    description:
      "Leads Skylife's growth through strategic property acquisitions and client success.",
    image: "/images/team/tancrdei.jpg",
  },
  {
    name: "MARTINA MONKASCH",
    role: "TRAVEL DESIGNER & COORDINATOR",
    description:
      "Curates bespoke journeys and oversees premium guest experiences.",
    image: "/images/team/marti.jpg",
  },
  {
    name: "GIACOMO DE FRANCHIS",
    role: "HEAD OF MARKETING",
    description:
      "Oversees Skylife's communication strategy, branding and social media channels.",
    image: "/images/team/Giacomo.jpg",
  },
];

export default function DedicatedTeam() {
  return (
    <section
      id="dedicated-team-section"
      className="flex w-full flex-col items-center bg-white px-6 py-16 text-neutral-900 md:px-12 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Section heading */}
        <div className="mb-16 text-center md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl leading-tight tracking-wide text-neutral-900 italic sm:text-5xl md:text-[54px]"
          >
            Meet the Team
          </motion.h2>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: idx * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col items-center text-center"
            >
              {/* Circular portrait */}
              <div className="relative mb-8 h-52 w-52 overflow-hidden rounded-full border border-neutral-900 bg-white p-0.5 shadow-sm transition-transform duration-500 group-hover:scale-105 sm:h-48 sm:w-48 md:h-56 md:w-56">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-neutral-50">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Name */}
              <h3 className="mb-2 font-serif text-base font-bold tracking-[0.1em] text-neutral-900 uppercase sm:text-[15px] md:text-base">
                {member.name}
              </h3>

              {/* Role */}
              <h4 className="mb-4 max-w-[200px] font-sans text-xs leading-relaxed font-bold tracking-[0.08em] text-neutral-800 uppercase sm:text-[11px] md:text-xs">
                {member.role}
              </h4>

              {/* Description */}
              <p className="max-w-[240px] font-sans text-[13px] leading-relaxed font-light text-neutral-600">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
