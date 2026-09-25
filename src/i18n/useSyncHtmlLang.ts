import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * Keeps <html lang="..."> in sync with the active i18next language.
 * Small accessibility/SEO win — screen readers and search engines both
 * read this attribute. Mount once near the app root.
 */
export function useSyncHtmlLang() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const applyLang = (lng: string) => {
      document.documentElement.lang = lng;
    };

    applyLang(i18n.language);
    i18n.on("languageChanged", applyLang);

    return () => {
      i18n.off("languageChanged", applyLang);
    };
  }, [i18n]);
}
