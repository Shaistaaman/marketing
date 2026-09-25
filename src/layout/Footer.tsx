import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../lib/constants";
import FooterLinkGroup from "./FooterLinkGroup";

const QUICK_LINKS = [
  { labelKey: "footer.links.exploreProperties", href: ROUTES.collections },
  { labelKey: "footer.links.partnerWithUs", href: ROUTES.owner },
  { labelKey: "footer.links.experiences", href: ROUTES.experiences },
  { labelKey: "footer.links.packages", href: ROUTES.packages },
];

const ABOUT_LINKS = [
  { labelKey: "footer.links.company", href: "/company" },
  { labelKey: "footer.links.blog", href: "/blog" },
  { labelKey: "footer.links.termsOfService", href: "/terms" },
  { labelKey: "footer.links.privacyPolicy", href: "/privacy" },
];

const SOCIAL_LINKS = [
  {
    labelKey: "footer.social.facebook",
    href: "https://facebook.com/skylifemanagement",
    Icon: FaFacebook,
  },
  {
    labelKey: "footer.social.instagram",
    href: "https://instagram.com/skylifemanagement",
    Icon: FaInstagram,
  },
  {
    labelKey: "footer.social.linkedin",
    href: "https://linkedin.com/company/skylife-management/",
    Icon: FaLinkedin,
  },
];

export default function Footer() {
  const { t } = useTranslation();
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
              {t("footer.contact")}
            </h4>

            <div className="mb-6 space-y-1.5 text-sm text-white/70">
              <p>{t("footer.companyName")}</p>
              <p>{t("footer.companyAddressLine1")}</p>
              <p>{t("footer.companyAddressLine2")}</p>
            </div>

            <div className="space-y-1.5 text-sm text-white/70">
              <p>
                {t("footer.pietro")}:{" "}
                <a
                  href="tel:+393317995308"
                  className="text-white transition-colors hover:text-white/80"
                >
                  +393317995308
                </a>
              </p>
              <p>
                {t("footer.tancredi")}:{" "}
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
              <p>{t("footer.instagramHandle")}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-12">
            <FooterLinkGroup
              title={t("footer.quickLinks")}
              links={QUICK_LINKS.map((link) => ({
                label: t(link.labelKey),
                href: link.href,
              }))}
            />
          </div>

          {/* About */}
          <div className="space-y-12">
            <FooterLinkGroup
              title={t("footer.about")}
              links={ABOUT_LINKS.map((link) => ({
                label: t(link.labelKey),
                href: link.href,
              }))}
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row sm:px-10 lg:px-16">
          <p className="text-center font-sans text-sm text-white/60 sm:text-left">
            {t("footer.copyright", { year: currentYear })}
          </p>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ labelKey, href, Icon }) => (
              <a
                key={labelKey}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(labelKey)}
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
