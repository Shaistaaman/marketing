import { useParams } from "react-router-dom";

/**
 * Temporary placeholder for routes not yet ported from the Next.js app.
 * Each will be replaced by its real page as we migrate section by section.
 */
export default function PagePlaceholder({ name }: { name: string }) {
  const params = useParams();
  const id = params.propertyId ?? params.experienceId ?? params.packageId;

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-[1200px] flex-col items-center justify-center gap-3 px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
        Coming soon
      </p>
      <h1 className="text-4xl text-neutral-900">{name}</h1>
      {id && (
        <p className="text-sm text-neutral-500">
          Detail id: <span className="font-mono">{id}</span>
        </p>
      )}
      <p className="max-w-md text-sm text-neutral-500">
        This page will be ported from the Next.js marketing app.
      </p>
    </section>
  );
}
