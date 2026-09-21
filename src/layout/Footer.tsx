import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { ROUTES } from "../lib/constants";
import FooterLinkGroup from "./FooterLinkGroup";

const QUICK_LINKS = [
  { label: "Explore Properties", href: ROUTES.collections },
  { label: "Partner With Us", href: ROUTES.owner },
  { label: "Experiences", href: ROUTES.experiences },
  { label: "Packages", href: ROUTES.packages },
];

const ABOUT_LINKS = [
  { label: "Company", href: "/company" },
  { label: "Blog", href: "/blog" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://facebook.com/skylifemanagement",
    Icon: FaFacebook,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/skylifemanagement",
    Icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/skylife-management/",
    Icon: FaLinkedin,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black font-sans">
      <div className="mx-auto max-w-[1440px] px-6 pt-20 pb-16 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-[auto_1.4fr_1fr_1fr]">
          {/* Logo */}
          <div className="flex sm:block">
            <img
              src="/images/logo-beige.png"
              alt="Skylife"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>

          {/* Company info + contact */}
          <div>
            <h4 className="mb-5 font-sans text-xs font-semibold tracking-widest text-white uppercase">
              Contact
            </h4>

            <div className="mb-6 space-y-1.5 text-sm text-white/70">
              <p>SKYLIFE MANAGEMENT</p>
              <p>Company number 15459982 - 607 Sloane Avenue,</p>
              <p>SW3 3EL, London, United Kingdom.</p>
            </div>

            <div className="space-y-1.5 text-sm text-white/70">
              <p>
                Pietro:{" "}
                <a
                  href="tel:+393317995308"
                  className="text-white transition-colors hover:text-white/80"
                >
                  +393317995308
                </a>
              </p>
              <p>
                Tancredi:{" "}
                <a
                  href="tel:+393661707510"
                  className="text-white transition-colors hover:text-white/80"
                >
                  +393661707510
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@skylifemanagement.com"
                  className="transition-colors hover:text-white"
                >
                  info@skylifemanagement.com
                </a>
              </p>
              <p>Insta: @skylifemanagement</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-12">
            <FooterLinkGroup title="Quick Links" links={QUICK_LINKS} />
          </div>

          {/* About */}
          <div className="space-y-12">
            <FooterLinkGroup title="About" links={ABOUT_LINKS} />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row sm:px-10 lg:px-16">
          <p className="text-center font-sans text-sm text-white/60 sm:text-left">
            ©{currentYear} Skylife Management. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-black"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
