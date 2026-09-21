import { useNavigate } from "react-router-dom";
import { ROUTES } from "../lib/constants";
import type { ActiveTab } from "../lib/types";

type NavAction = ActiveTab | "PACKAGES";

interface NavLink {
  label: string;
  action: NavAction;
}

const NAV_LINKS: NavLink[] = [
  { label: "The Collection", action: "STAY" },
  { label: "Skylife Experiences", action: "EXPERIENCE" },
  { label: "Property Owners", action: "OWN" },
  { label: "Packages", action: "PACKAGES" },
];

const NAV_ROUTES: Record<NavAction, string> = {
  STAY: ROUTES.collections,
  EXPERIENCE: ROUTES.experiences,
  OWN: ROUTES.owner,
  PACKAGES: ROUTES.packages,
};

interface NavLinksProps {
  variant: "desktop" | "mobile";
  onNavigate: (action: NavAction) => void;
}

/**
 * The Collection / Experiences / Property Owners / Packages nav links.
 * One list, rendered with either desktop or mobile-drawer styling.
 */
export default function NavLinks({ variant, onNavigate }: NavLinksProps) {
  const navigate = useNavigate();

  const handleClick = (action: NavAction) => {
    onNavigate(action);
    navigate(NAV_ROUTES[action]);
  };

  if (variant === "desktop") {
    return (
      <nav className="hidden items-center gap-8 lg:flex xl:gap-12">
        {NAV_LINKS.map((link) => (
          <button
            key={link.action}
            onClick={() => handleClick(link.action)}
            className="cursor-pointer font-sans text-[13px] font-light tracking-[0.08em] text-neutral-800 uppercase transition-all hover:font-medium hover:text-black"
          >
            {link.label}
          </button>
        ))}
      </nav>
    );
  }

  return (
    <div className="space-y-5">
      {NAV_LINKS.map((link) => (
        <button
          key={link.action}
          onClick={() => handleClick(link.action)}
          className="block w-full cursor-pointer py-1.5 text-left font-sans text-[15px] font-light tracking-wider text-neutral-800 uppercase transition-all hover:font-medium hover:text-black"
        >
          {link.label}
        </button>
      ))}
    </div>
  );
}
