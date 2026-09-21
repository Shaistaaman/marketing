import { Link } from "react-router-dom";
import { ROUTES } from "../lib/constants";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-[1200px] flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <p className="font-sans text-xs tracking-[0.3em] text-neutral-400 uppercase">
        404
      </p>
      <h1 className="font-serif text-4xl text-neutral-900 italic">
        Page not found
      </h1>
      <p className="max-w-md font-sans text-sm font-light text-neutral-500">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link
        to={ROUTES.home}
        className="mt-4 border border-neutral-900 px-8 py-4 font-sans text-xs font-medium tracking-[0.22em] text-neutral-900 uppercase transition-all duration-300 hover:bg-neutral-900 hover:text-white"
      >
        Back to Home
      </Link>
    </section>
  );
}
