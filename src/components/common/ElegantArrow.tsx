import { useTranslation } from "react-i18next";

interface ElegantArrowProps {
  direction: "left" | "right";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function ElegantArrow({
  direction,
  onClick,
  disabled = false,
  className = "",
}: ElegantArrowProps) {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 transition-all duration-300 focus:outline-none ${
        disabled
          ? "text-neutral-300 cursor-not-allowed opacity-40"
          : "text-neutral-900 hover:scale-110 hover:opacity-80 active:scale-95 cursor-pointer"
      } ${className}`}
      aria-label={
        direction === "left"
          ? t("common.aria.previousSlide")
          : t("common.aria.nextSlide")
      }
    >
      <svg
        viewBox="0 0 64 24"
        className={`w-16 h-6 transition-transform ${
          direction === "left" ? "rotate-180" : ""
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Long elegant arrow shaft */}
        <path
          d="M 2,12 L 60,12"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Calligraphic swooping curves for the luxury arrow head */}
        <path
          d="M 50,4 C 53,8 57,11 60,12 C 57,13 53,16 50,20"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </button>
  );
}
