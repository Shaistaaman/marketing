import { CheckCircle, Mail } from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";

const BG_AERIAL_CITY = "/images/itlay.jpg";

interface OwnerCTA1Props {
  onSubscribe?: (email: string) => void;
}

export default function OwnerCTA1({ onSubscribe }: OwnerCTA1Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
    onSubscribe?.(email);
  };

  return (
    <section className="relative w-full overflow-hidden bg-neutral-950 py-20 font-sans text-white sm:py-28 lg:py-32">
      {/* Aerial cityscape background */}
      <div className="absolute inset-0 z-0">
        <img
          src={BG_AERIAL_CITY}
          alt="Italian cityscape rooftops"
          className="absolute inset-0 h-full w-full scale-105 object-cover object-center brightness-65 contrast-105 filter"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-4 font-serif text-3xl leading-tight font-normal tracking-wide text-white sm:text-4xl md:text-5xl lg:text-[56px]"
        >
          Want to see more success stories?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto mb-8 max-w-[520px] font-sans text-sm leading-relaxed font-light tracking-wide text-white/90 sm:text-base"
        >
          Subscribe to receive case studies and see how other property owners
          elevated their income — and their brand — with Skylife.
        </motion.p>

        {/* Capsule email form */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-xl"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 rounded-full border border-white/50 bg-black/80 px-8 py-4 text-white shadow-2xl backdrop-blur-md"
            >
              <CheckCircle className="h-5 w-5 shrink-0 text-emerald-400" />
              <span className="font-sans text-xs font-medium tracking-wide sm:text-sm">
                Thank you! We've sent our latest property case studies to your
                inbox.
              </span>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="relative flex w-full items-center rounded-full border border-white/40 bg-black/60 p-2 pl-6 shadow-2xl backdrop-blur-md transition-all focus-within:border-white focus-within:ring-1 focus-within:ring-white/50 sm:pl-8"
            >
              <label htmlFor="owner-subscribe-email" className="sr-only">
                Email address
              </label>
              <input
                id="owner-subscribe-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-transparent pr-4 text-sm font-light text-white placeholder-neutral-300 focus:outline-none sm:text-base"
              />

              <button
                type="submit"
                aria-label="Subscribe with email"
                className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black text-white shadow-lg transition-all hover:scale-105 hover:bg-neutral-800 active:scale-95 sm:h-12 sm:w-12"
              >
                <Mail className="h-5 w-5 stroke-[1.5]" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
