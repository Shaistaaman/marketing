import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface PanelData {
  id: string;
  panelKey: string;
  /** Colour of the vertical strip */
  stripColor: string;
  /** Rich background colour for the expanded detail card */
  activeColor: string;
}

const PANELS: PanelData[] = [
  {
    id: "curated",
    panelKey: "curated",
    stripColor: "bg-[#2d383a]/80 hover:bg-[#2d383a]",
    activeColor: "bg-[#112124]",
  },
  {
    id: "arrival",
    panelKey: "arrival",
    stripColor: "bg-[#2a3244]/80 hover:bg-[#2a3244]",
    activeColor: "bg-[#0e1b37]",
  },
  {
    id: "designed",
    panelKey: "designed",
    stripColor: "bg-[#4c2c27]/80 hover:bg-[#4c2c27]",
    activeColor: "bg-[#3b1d19]",
  },
  {
    id: "connected",
    panelKey: "connected",
    stripColor: "bg-[#8c6c2e]/80 hover:bg-[#8c6c2e]",
    activeColor: "bg-[#8c6c2e]",
  },
];

export default function GuestsPO() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState<string | null>(null);

  // Auto-advance through the panels every 5s.
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveId((currentId) => {
        if (!currentId) return PANELS[0]?.id ?? null;
        const currentIndex = PANELS.findIndex((p) => p.id === currentId);
        const nextIndex = (currentIndex + 1) % PANELS.length;
        return PANELS[nextIndex]?.id ?? null;
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeId]);

  const activePanel = PANELS.find((p) => p.id === activeId);

  return (
    <section
      id="guests-po-section"
      className="relative flex min-h-[600px] w-full items-center justify-center overflow-hidden bg-neutral-950 px-6 py-16 md:min-h-[720px] md:px-12 md:py-24"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/guestsPO.jpg"
          alt="Florence Sunset Skyline"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Overlays for premium depth */}
        <div className="absolute inset-0 bg-neutral-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/70 via-neutral-950/40 to-neutral-950/50" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-col items-center justify-between gap-12 lg:flex-row">
        {/* Left: section heading */}
        <div className="flex w-full flex-col text-left text-white select-none lg:w-5/12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl leading-tight font-normal tracking-wide italic sm:text-4xl md:text-[42px] lg:text-[48px]"
          >
            {t("landing.guestsAndOwners.headingLine1")}
          </motion.h2>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="my-2 block font-serif text-3xl text-white/60 italic sm:text-4xl md:text-[42px] lg:text-[48px]"
          >
            {t("landing.guestsAndOwners.headingAmpersand")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl leading-tight font-normal tracking-wide italic sm:text-4xl md:text-[42px] lg:text-[48px]"
          >
            {t("landing.guestsAndOwners.headingLine2")}
          </motion.h2>
        </div>

        {/* Right: interactive strips + detail card */}
        <div className="relative flex min-h-[480px] w-full flex-col items-stretch justify-end md:min-h-[500px] md:flex-row lg:w-7/12">
          {/* Animated detail card */}
          <div className="pointer-events-none z-10 mb-4 flex flex-1 items-center pr-0 md:absolute md:inset-y-0 md:right-[260px] md:left-0 md:mb-0 md:pr-4 lg:right-[280px]">
            <AnimatePresence mode="wait">
              {activePanel && (
                <motion.div
                  key={activePanel.id}
                  initial={{ opacity: 0, x: 80, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 40, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`pointer-events-auto flex h-full w-full flex-col justify-center rounded-none border border-white/5 p-8 text-white shadow-2xl md:p-10 ${activePanel.activeColor}`}
                >
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="mb-6 font-serif text-2xl leading-snug font-normal tracking-wide sm:text-3xl"
                  >
                    {t(
                      `landing.guestsAndOwners.panels.${activePanel.panelKey}.title`,
                    )}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    className="font-sans text-sm leading-relaxed font-light tracking-wide text-white/90 sm:text-base"
                  >
                    {t(
                      `landing.guestsAndOwners.panels.${activePanel.panelKey}.description`,
                    )}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Vertical strips */}
          <div className="z-20 flex h-[360px] shrink-0 flex-row items-stretch gap-2.5 self-stretch md:h-auto md:w-[240px] lg:w-[260px]">
            {PANELS.map((panel, idx) => {
              const isActive = panel.id === activeId;
              return (
                <motion.button
                  key={panel.id}
                  onClick={() => setActiveId(isActive ? null : panel.id)}
                  animate={
                    activeId === null
                      ? {
                          boxShadow: [
                            "inset 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 0 0px rgba(255, 255, 255, 0)",
                            "inset 0 0 0 1px rgba(255, 255, 255, 0.25), 0 0 15px 2px rgba(255, 255, 255, 0.15)",
                            "inset 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 0 0px rgba(255, 255, 255, 0)",
                          ],
                        }
                      : {}
                  }
                  transition={
                    activeId === null
                      ? {
                          duration: 2.2,
                          repeat: Infinity,
                          repeatType: "mirror" as const,
                          delay: idx * 0.35,
                          ease: "easeInOut",
                        }
                      : {}
                  }
                  className={`group relative flex flex-1 cursor-pointer flex-col items-center justify-end overflow-hidden px-2 py-8 transition-all duration-500 focus:outline-none md:px-3 ${panel.stripColor} ${
                    isActive ? "ring-1 ring-white/30 shadow-lg" : ""
                  }`}
                  aria-label={t("common.aria.viewDetailsOf", {
                    label: t(
                      `landing.guestsAndOwners.panels.${panel.panelKey}.shortTitle`,
                    ),
                  })}
                >
                  {/* Vertical text */}
                  <div className="relative flex h-full items-center justify-center">
                    <span
                      className="font-sans text-sm font-light tracking-[0.18em] whitespace-nowrap text-white uppercase transition-transform duration-300 select-none group-hover:translate-y-[-2px] md:text-base"
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                      }}
                    >
                      {t(
                        `landing.guestsAndOwners.panels.${panel.panelKey}.shortTitle`,
                      )}
                    </span>
                  </div>

                  {/* Active indicator / click hint */}
                  {activeId === null ? (
                    <motion.div
                      animate={{
                        opacity: [0.35, 1, 0.35],
                        scaleY: [0.8, 1.3, 0.8],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        delay: idx * 0.35,
                        ease: "easeInOut",
                      }}
                      className="mt-4 h-3 w-[2px] bg-white shadow-[0_0_8px_#ffffff]"
                    />
                  ) : (
                    <div
                      className={`mt-4 h-3 w-[2px] bg-white transition-transform duration-500 ${
                        isActive
                          ? "scale-y-100 opacity-100"
                          : "scale-y-0 opacity-0"
                      }`}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
