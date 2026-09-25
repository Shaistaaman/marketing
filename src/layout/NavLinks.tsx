import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../lib/constants";
import type { ActiveTab } from "../lib/types";

type NavAction = ActiveTab | "PACKAGES";

interface NavLink {
  labelKey: string;
  action: NavAction;
}

const NAV_LINKS: NavLink[] = [
  { labelKey: "nav.collection", action: "STAY" },
  { labelKey: "nav.experiences", action: "EXPERIENCE" },
  { labelKey: "nav.propertyOwners", action: "OWN" },
  { labelKey: "nav.packages", action: "PACKAGES" },
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
  const { t } = useTranslation();

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
            {t(link.labelKey)}
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
          {t(link.labelKey)}
        </button>
      ))}
    </div>
  );
}
