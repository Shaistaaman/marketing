import { motion } from "motion/react";

interface InstagramPost {
  id: string;
  image: string;
  alt: string;
  url: string;
}

const INSTAGRAM_URL = "https://www.instagram.com/skylifemanagement";

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "about-skylife",
    image: "/images/somuch/rome.png",
    alt: "About Skylife",
    url: INSTAGRAM_URL,
  },
  {
    id: "kelsey-sam",
    image: "/images/somuch/go.png",
    alt: "Visiting Italy with Skylife by Kelsey and Sam",
    url: INSTAGRAM_URL,
  },
  {
    id: "seamless-booking",
    image: "/images/somuch/great.png",
    alt: "Seamless Booking",
    url: INSTAGRAM_URL,
  },
  {
    id: "tuscany-view",
    image: "/images/somuch/final.png",
    alt: "Tuscany Terrace",
    url: INSTAGRAM_URL,
  },
  {
    id: "our-properties",
    image: "/images/somuch/rome.png",
    alt: "Our Properties",
    url: INSTAGRAM_URL,
  },
  {
    id: "rome-stay",
    image: "/images/somuch/great.png",
    alt: "Where to stay in Rome",
    url: INSTAGRAM_URL,
  },
];

export default function InstagramSection() {
  return (
    <section
      id="instagram-follow-section"
      className="flex w-full flex-col items-center border-t border-neutral-100 bg-white px-6 py-16 text-neutral-900 md:px-12 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1240px]">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 w-full md:mb-14"
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-block"
          >
            <h2 className="font-serif text-3xl leading-tight font-normal tracking-wide text-neutral-900 italic transition-opacity group-hover:opacity-85 sm:text-4xl md:text-[44px]">
              Follow Us on Instagram
            </h2>
          </a>
        </motion.div>

        {/* Posts grid */}
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-6">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-none bg-neutral-100 select-none"
            >
              <img
                src={post.image}
                alt={post.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="pointer-events-none absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
