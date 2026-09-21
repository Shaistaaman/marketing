import { Link } from "react-router-dom";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinkGroupProps {
  title: string;
  links: FooterLink[];
}

/**
 * A single "HEADING" + list of links block, reused for each footer column.
 */
export default function FooterLinkGroup({
  title,
  links,
}: FooterLinkGroupProps) {
  return (
    <div>
      <h4 className="mb-5 font-sans text-xs font-semibold tracking-widest text-white uppercase">
        {title}
      </h4>
      <ul className="space-y-3.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.href}
              className="font-sans text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
